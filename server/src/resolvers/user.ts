import {
  generateAccessToken,
  setRefreshTokenInCookie,
  verifyAccessToken,
} from "./../jwt";
import { hash, compare } from "bcrypt";
import {
  addDoc,
  collection,
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
import { Product, Resolver } from "./types";

const userResolver: Resolver = {
  Query: {
    checkEmail: async (parent, { email }, context) => {
      const q = query(collection(db, "user"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.size) return true;
      return false;
    },
  },

  Mutation: {
    login: async (parent, { email, passWord }, context) => {
      const q = query(collection(db, "user"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.size) throw new Error("email");

      let token;
      let nickName;
      const res: DocumentData[] = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        res.push({
          id: doc.id,
          ...d,
        });
      });

      for (const d of res) {
        if (await compare(passWord, d.passWord)) {
          token = generateAccessToken({ id: d.id, nickName: d.nickName });
          nickName = d.nickName;
          // setRefreshTokenInCookie(context.res);
        }
      }
      if (!token) throw new Error("passWord");

      return { token, nickName, email };
    },

    addUser: async (parent, { email, passWord, nickName }, context) => {
      try {
        const newUser = {
          email,
          passWord: await hash(passWord, 5),
          nickName,
          userTy: 1,
          createdAt: serverTimestamp(),
        };
        const result = await addDoc(collection(db, "user"), newUser);

        // make token
        setRefreshTokenInCookie(context.res);
        const token = generateAccessToken({
          id: result.id,
          nickName,
        });
        return { token, nickName, email };
      } catch (error) {
        console.log(error);
        throw new Error("ee");
      }
    },
  },
};

export default userResolver;

//
