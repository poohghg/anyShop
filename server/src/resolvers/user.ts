import { getUserInfo } from "./../util/service";
import {
  generateAccessToken,
  setRefreshTokenInCookie,
  verifyToken,
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
import { Product, Resolver, User } from "./types";
import { GraphQLError } from "graphql";

const userResolver: Resolver = {
  Query: {
    user: async (parent, args, ctx) => {
      if (!ctx.userId) throw new Error("userId not exist");
      const token = generateAccessToken(ctx.userId);
      const userInfo = await getUserInfo(ctx.userId);
      // console.log("userInfo", userInfo);
      return { token, ...userInfo };
    },

    checkEmail: async (parent, { email }, ctx) => {
      const q = query(collection(db, "user"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.size) return true;
      return false;
    },
  },

  Mutation: {
    /**
     * @returns
     * 최소한의 프론트에서 유지해야할 정보들?
     * userId -> 키값
     * token -> 에섹스 토큰
     * email?
     * nickName?
     */
    login: async (parent, { email, passWord }, ctx) => {
      const q = query(collection(db, "user"), where("email", "==", email));
      const snapshot = await getDocs(q);
      if (!snapshot.size) throw new GraphQLError("email");

      const res: DocumentData[] = [];
      snapshot.forEach((doc) => {
        const d = doc.data();
        res.push({
          id: doc.id,
          ...d,
        });
      });

      const user = {} as User;
      let token: string = "";
      for (const d of res) {
        if (await compare(passWord, d.passWord)) {
          token = generateAccessToken(d.id);
          setRefreshTokenInCookie(ctx.res, d.id);
          user.userId = d.id;
          user.email = d.email;
          user.nickName = d.nickName;
          user.userTy = d.userTy;
        }
      }

      // https://velog.io/@yzkim9501/nodejs-refresh-token%EC%9D%84-%EC%9D%B4%EC%9A%A9%ED%95%B4%EC%84%9C-access-token-%EB%A7%8C%EB%A3%8C-%EC%9D%B4%ED%9B%84%EC%97%90%EB%8F%84-%EC%9E%90%EB%8F%99-%EC%9E%AC%EB%B0%9C%EA%B8%89-%ED%95%B4%EC%A3%BC%EA%B8%B0
      if (!token) throw new Error("passWord");
      return { token, ...user };
    },

    logout: (parent, args, ctx) => {
      ctx.res.clearCookie("refreshToken");
      ctx.res.cookie("refreshToken", "");
      console.log(ctx.res.cookie);
      return true;
    },

    addUser: async (parent, { email, passWord, nickName, userTy }, ctx) => {
      const newUser = {
        email,
        passWord: await hash(passWord, 5),
        nickName,
        userTy,
        createdAt: serverTimestamp(),
      };
      const result = await addDoc(collection(db, "user"), newUser);
      // make token
      const token = generateAccessToken(result.id);
      setRefreshTokenInCookie(ctx.res, result.id);
      return { userId: result.id, token, nickName, email, userTy };
    },
  },
};

export default userResolver;

//
