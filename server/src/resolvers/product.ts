import { Resolver } from "./types";
import {
  addDoc,
  collection,
  collectionGroup,
  deleteDoc,
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
import { getIsLike, getLikeCnt } from "../util/service";

const PAGE_SIZE = 15;

const productResolver: Resolver = {
  Query: {
    products: async (
      parent,
      { cursor = "", showDeleted = false },
      { userId },
    ) => {
      const products = collection(db, "products");
      const queryOptions = [orderBy("createdAt", "desc")];
      if (cursor) {
        const snapshot = await getDoc(doc(db, "products", cursor));
        // 특정 아이디 이후에 데이터를 가져옴
        queryOptions.push(startAfter(snapshot));
      }
      // if (!showDeleted) queryOptions.unshift(where("createdAt", "!=", null));

      // 기본 쿼리
      const q = query(products, ...queryOptions, limit(PAGE_SIZE));
      // 서버에서 최신정보를 가져온다
      const snapshot = await getDocs(q);
      const items: DocumentData[] = [];

      for (let i = 0; i < snapshot.docs.length; i++) {
        const currDoc = snapshot.docs[i];
        const output = await Promise.all([
          getLikeCnt(currDoc.id),
          getIsLike(userId || "", currDoc.id),
        ]);
        const [likes, isLike] = output;
        items.push({
          id: currDoc.id,
          likes,
          isLike: !!isLike,
          ...currDoc.data(),
        });
      }
      return items;
    },

    product: async (parent, { id, isHitUpdate }, { userId }) => {
      if (isHitUpdate) {
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, {
          hit: increment(1),
        });
      }

      const snapshot = await getDoc(doc(db, "products", id));
      const output = await Promise.all([
        getLikeCnt(id),
        getIsLike(userId || "", id),
      ]);
      const [likes, isLike] = output;
      return {
        ...snapshot.data(),
        id: snapshot.id,
        likes,
        isLike: !!isLike,
      };
    },

    orderLikes: async () => {
      const payment = collection(db, "payment");
      const snapshot = await getDocs(payment);
      const rankObj: { [key: string]: number } = {};

      snapshot.forEach((doc) => {
        const d = doc.data();
        const { product } = d;
        rankObj[product.id] ? rankObj[product.id]++ : (rankObj[product.id] = 1);
      });

      const items = [];
      const rankedArr = Object.entries(rankObj)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

      for (let i = 0; i < rankedArr.length; i++) {
        const [productId, cnt] = rankedArr[i];
        const pData = await getDoc(doc(db, "products", productId));
        items.push({
          id: productId,
          cnt,
          product: { id: productId, ...pData.data() },
        });
      }
      return items;
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
      const likeCollection = collection(db, "likeProduct");
      const existId = await getIsLike(userId, productId);
      if (existId) {
        await deleteDoc(doc(db, "likeProduct", existId));
      } else {
        const productRef = doc(db, "products", productId);
        await addDoc(likeCollection, {
          userId,
          product: productRef,
          createdAt: serverTimestamp(),
        });
      }
      return !!existId;
    },
  },
};

export default productResolver;
