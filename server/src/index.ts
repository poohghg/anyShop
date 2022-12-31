import { verifyAccessToken } from "./jwt";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import resolvers from "./resolvers";
import cookieParser from "cookie-parser";
import cors from "cors";
import { uuidv4 } from "@firebase/util";

(async () => {
  const port = 8000;
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers: resolvers,
    context: async ({ req, res }) => {
      let user = {};
      console.log("cookie", req.headers.cookie);
      await res.cookie(uuidv4(), "1", {
        maxAge: 1000 * 600,
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });
      return { req, res };
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
