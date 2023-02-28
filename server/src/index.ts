import { verifyToken } from "./jwt";
import express from "express";
import { ApolloServer, CorsOptions } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";
import cookieParser from "cookie-parser";
import cors from "cors";

(async () => {
  const port = 8000;
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: async ({ req, res }) => {
      // console.log("req.hostname", req.);
      const token = req.headers.authorization?.substring(7) ?? "";
      let userId = "";

      if (token) {
        const payload: any = verifyToken(token);
        if (payload?.userId) return { req, res, userId: payload.userId };
      }

      const refreshToken = req.cookies?.refreshToken;
      if (!refreshToken) return { req, res, userId };

      const payload: any = verifyToken(refreshToken);
      if (payload instanceof Object)
        if (payload?.userId) return { req, res, userId: payload.userId };
      return { req, res, userId };
    },
  });
  const app = express();

  // Access-Control-Allow-Origin: https://studio.apollographql.com
  // Access-Control-Allow-Credentials: true
  // 를 cors가 해줌
  const corsOptions: CorsOptions = {
    // origin: ["http://localhost:3000", "https://studio.apollographql.com", "*"],
    origin: [
      "http://localhost:3000",
      "https://studio.apollographql.com",
      "https://any-shop-client.vercel.app",
    ],
    credentials: true,
  };

  app.use(cookieParser());
  app.use(cors(corsOptions));
  await server.start();
  server.applyMiddleware({
    app,
    path: "/graphql",
    cors: corsOptions,
  });
  await app.listen({ port });
  console.log(`server listening on ${port}...`);
})();
