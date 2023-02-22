import { log } from "console";
import { randomUUID } from "crypto";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { Product, Resolver } from "./types";

const cartResolver: Resolver = {
  Query: {
    cart: async (parent, args, { userId }) => {
      if (!userId) throw Error("userId not exist");
      const cart = collection(db, "cart");
      const cartSnap = await getDocs(
        query(
          cart,
          where("userId", "==", userId),
          orderBy("createdAt", "desc"),
        ),
      );
      const data: DocumentData[] = [];
      cartSnap.forEach((doc) => {
        const d = doc.data();
        data.push({
          id: doc.id,
          ...d,
        });
      });
      return data;
    },
  },
  Mutation: {
    addCart: async (parent, { productId, amount }, { userId }) => {
      if (!userId) throw Error("userId not exist");
      if (!productId) throw Error("상품id가 없다!");

      const productRef = doc(db, "products", productId);
      const cartCollection = collection(db, "cart");
      const exist = (
        await getDocs(
          query(
            cartCollection,
            where("product", "==", productRef),
            where("userId", "==", userId),
          ),
        )
      ).docs[0];

      let cartRef;
      if (exist) {
        cartRef = doc(db, "cart", exist.id);
        await updateDoc(cartRef, {
          amount: increment(amount),
        });
      } else {
        cartRef = await addDoc(cartCollection, {
          userId,
          amount: amount ?? 1,
          product: productRef,
          createdAt: serverTimestamp(),
        });
      }
      const cartSnapshot = await getDoc(cartRef);
      return {
        ...cartSnapshot.data(),
        product: productRef,
        id: cartSnapshot.id,
      };
    },

    updateCart: async (parent, { cartId, amount }, { userId }) => {
      if (!userId) throw Error("userId not exist");
      if (amount < 1) throw Error("1 이하로 바꿀 수 없습니다.");
      const cartRef = doc(db, "cart", cartId);
      if (!cartRef) throw Error("장바구니 정보가 없다");

      await updateDoc(cartRef, {
        amount,
      });

      const cartSnapshot = await getDoc(cartRef);
      return {
        ...cartSnapshot.data(),
        id: cartSnapshot.id,
      };
    },

    deleteCart: async (parent, { cartId }) => {
      const cartRef = doc(db, "cart", cartId);
      // if (!cartRef) throw Error("장바구니 정보가 없다");
      await deleteDoc(cartRef);
      return cartId;
    },

    executePay: async (
      parent,
      { ids, checkAddress, address, recipient, detailedAddress, isInstant },
      { userId },
    ) => {
      // const dd =
      if (!userId) throw new Error("userCd error");
      if (checkAddress) {
        const userRef = doc(db, "user", userId);
        const userSnapshot = await getDoc(userRef);
        const userData = userSnapshot.data();
        const addresses = [
          {
            address,
            recipient,
            detailedAddress,
          },
        ];
        if (userData?.addresses) {
          addresses.push(...userData.addresses);
          if (addresses.length > 5) addresses.shift();
        }
        updateDoc(userRef, {
          addresses,
        });
      }

      const payId = new Date().getTime().toString() + randomUUID();
      const payCollection = collection(db, "payment");

      // 즉시결제 처리
      if (isInstant) {
        const productRef = doc(db, "products", ids[0]);
        await addDoc(payCollection, {
          address,
          recipient,
          detailedAddress,
          userId,
          payId,
          executeAt: serverTimestamp(),
          product: productRef,
        });
      } else
        for await (const id of ids) {
          const cartRef = doc(db, "cart", id);
          const cartSnapshot = await getDoc(cartRef);
          const cartData = cartSnapshot.data();
          const productRef = doc(db, "products", cartData?.product?.id);
          await deleteDoc(cartRef);
          await addDoc(payCollection, {
            address,
            recipient,
            detailedAddress,
            userId,
            payId,
            executeAt: serverTimestamp(),
            product: productRef,
          });
        }
      return true;
      // return deleted;
    },
  },
  CartItem: {
    product: async (cartItem, args) => {
      const product = await getDoc(cartItem.product);
      const data = product.data() as any;
      return {
        ...data,
        id: product.id,
      };
    },
  },
};

export default cartResolver;
