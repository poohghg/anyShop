import { verifyAccessToken } from "./jwt";
import express from "express";
import { ApolloServer } from "apollo-server-express";
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
      const token = req.headers?.authorization?.substring(7) ?? "";
      let user = {};
      if (!token) {
        return { req, res, user };
      }
      console.log("token:", token);
      console.log("token>>>", verifyAccessToken(token));
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
