import { getUserInfo } from "./util/service";
import { verifyAccessToken } from "./jwt";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";
import cookieParser from "cookie-parser";
import cors from "cors";

interface UserPayload {
  id: string;
}

(async () => {
  const port = 8000;
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,

    context: async ({ req, res }) => {
      const token = req.headers.authorization?.substring(7) ?? "";
      let user = {};
      if (!token) {
        const refreshToken = req.cookies?.refreshToken;
        console.log("refreshToken", refreshToken);
        //  프론트에서 로그인으로 이동
        if (!refreshToken) return { req, res, user };
        // console.log();
        const payLoad: any = verifyAccessToken(refreshToken);
        if (payLoad instanceof Object) {
          payLoad?.id;
        }
        // payLoad.
        console.log("userpayLoadId", payLoad);
        // getUserInfo(payLoad!.userId);
        return { req, res, user };
      }

      const payUser = verifyAccessToken(token);
      return { req, res, user: payUser };
    },
  });
  const app = express();

  // Access-Control-Allow-Origin: https://studio.apollographql.com
  // Access-Control-Allow-Credentials: true
  // 를 cors가 해줌
  const corsOptions = {
    origin: ["http://localhost:3000", "https://studio.apollographql.com"],
    credentials: true,
  };

  // app.use(cors(corsOptions));
  app.use(cookieParser());
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: corsOptions,
  });
  await app.listen({ port });
  console.log(`server listening on ${port}...`);
})();
