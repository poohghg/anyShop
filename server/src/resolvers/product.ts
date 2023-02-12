import { Resolver } from "./types";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  limit,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const PAGE_SIZE = 15;

const productResolver: Resolver = {
  Query: {
    products: async (parent, { cursor = "", showDeleted = false }) => {
      const products = collection(db, "products");
      const queryOptions = [orderBy("createdAt", "desc")];
      if (cursor) {
        const snapshot = await getDoc(doc(db, "products", cursor));
        // 특정 아이디 이후에 데이터를 가졍옴
        queryOptions.push(startAfter(snapshot));
      }
      // if (!showDeleted) queryOptions.unshift(where("createdAt", "!=", null));

      // 기본 쿼리
      const q = query(products, ...queryOptions, limit(PAGE_SIZE));
      // 서버에서 최시정보를 가져온다
      const snapshot = await getDocs(q);
      const data: DocumentData[] = [];
      snapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          ...doc.data(),
        }),
      );
      return data;
    },

    product: async (parent, { id }) => {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        hit: increment(1),
      });
      const snapshot = await getDoc(doc(db, "products", id));
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },
  },
  Mutation: {
    addProduct: async (
      parent,
      { imageUrl, price, title, description, category },
    ) => {
      const newProduct = {
        imageUrl,
        price,
        title,
        description,
        category,
        rate: 0,
        hit: 0,
        createdAt: serverTimestamp(),
      };
      const result = await addDoc(collection(db, "products"), newProduct);
      const snapshot = await getDoc(result);
      return {
        ...snapshot.data(),
        id: snapshot.id,
      };
    },

    updateProduct: async (parent, { id, ...data }) => {
      const productRef = doc(db, "products", id);
      if (!productRef) throw new Error("상품이 없습니다.");
      await updateDoc(productRef, {
        ...data,
        createdAt: serverTimestamp(),
      });
      const snap = await getDoc(productRef);
      return {
        ...snap.data(),
        id: snap.id,
      };
    },

    deleteProduct: async (parent, { id }) => {
      // 실제 db에서 delete를 하는 대신, createdAt을 지워준다.
      const productRef = doc(db, "products", id);
      if (!productRef) throw new Error("상품이 없습니다.");
      await updateDoc(productRef, { createdAt: null });
      return id;
    },

    likeProduct: async (parent, { productId }, { userId }) => {
      if (!userId) throw Error("userId not exist");
      // const likeCollection = doc(db, "likeProduct", userId);
      // // const stateQuery = query(likeCollection, where("state", "==", "CA"));
      // console.log("likeCollection", likeCollection.);
      // const exist = (
      //   await getDocs(
      //     query(likeCollection, where("productId", "==", productId)),
      //   )
      // ).docs[0];
      // if (exist) {
      // } else {
      //   console.log("???");
      //   await setDoc(doc(likeCollection), {
      //     productId,
      //     createdAt: serverTimestamp(),
      //   });
      // }
      return true;
    },
  },
};

export default productResolver;
