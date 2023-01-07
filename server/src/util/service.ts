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

export const getUserInfo = async (userId: string) => {
  const snapshot = await getDoc(doc(db, "user", userId));
  console.log("snp", snapshot.data());
  return {
    id: snapshot.id,
  };
};
