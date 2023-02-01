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
