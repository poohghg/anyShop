import { gql } from "apollo-server-express";

const userSchema = gql`
  type User {
    token: String!
    email: String!
    nickName: String!
  }
  extend type Query {
    checkEmail(email: String!): Boolean!
  }
  extend type Mutation {
    addUser(email: String!, passWord: String!, nickName: String!): User!
    login(email: String!, passWord: String!): User!
  }
`;

export default userSchema;
