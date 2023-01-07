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
import { GraphQLError } from "graphql";

const userResolver: Resolver = {
  Query: {
    user: (parent, args, ctx) => {
      if (!ctx.user.token) {
        ctx.user.email = "";
        ctx.user.nickName = "";
        ctx.user.token = "";
      }
      return ctx.user;
    },

    checkEmail: async (parent, { email }, ctx) => {
      const q = query(collection(db, "user"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.size) return true;
      return false;
    },
  },

  Mutation: {
    login: async (parent, { email, passWord }, ctx) => {
      const q = query(collection(db, "user"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.size) throw new GraphQLError("email");

      let token;
      let nickName;
      let refreshToken;
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
          refreshToken = setRefreshTokenInCookie(ctx.res, d.id);
        }
      }
      // https://velog.io/@yzkim9501/nodejs-refresh-token%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-access-token-%EB%A7%8C%EB%A3%8C-%EC%9D%B4%ED%9B%84%EC%97%90%EB%8F%84-%EC%9E%90%EB%8F%99-%EC%9E%AC%EB%B0%9C%EA%B8%89-%ED%95%B4%EC%A3%BC%EA%B8%B0
      if (!token) throw new Error("passWord");
      return { token, nickName, email };
    },

    addUser: async (parent, { email, passWord, nickName }, ctx) => {
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
        // setRefreshTokenInCookie(ctx.res);
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
