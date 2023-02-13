import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { User } from "../resolvers/types";

export const getUserInfo = async (userId: string): Promise<User> => {
  const snapshot = await getDoc(doc(db, "user", userId));
  const data = snapshot.data();
  return {
    userId,
    ...data,
    // nickName: data?.nickName,
    // userTy: data?.userTy,
    // email: data?.email,
  };
};

export const getLikeCnt = async (productId: string) => {
  const likeCollection = collection(db, "likeProduct");
  const productRef = doc(db, "products", productId);
  const size = (
    await getDocs(query(likeCollection, where("product", "==", productRef)))
  ).size;
  return size;
};

export const getIsLike = async (userId: string, productId: string) => {
  if (!userId) return "";
  const likeCollection = collection(db, "likeProduct");
  const productRef = doc(db, "products", productId);
  const exist = (
    await getDocs(
      query(
        likeCollection,
        where("product", "==", productRef),
        where("userId", "==", userId),
      ),
    )
  ).docs[0];
  return exist?.id;
};
