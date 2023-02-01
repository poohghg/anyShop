import { gql } from "apollo-server-express";

const userSchema = gql`
  type User {
    userId: ID!
    token: String!
    email: String!
    nickName: String!
    userTy: Int!
    addresses: [Ads!]
  }
  type Ads {
    address: String
    recipient: String
    detailedAddress: String
  }
  extend type Query {
    user: User!
    checkEmail(email: String!): Boolean!
  }
  extend type Mutation {
    addUser(email: String!, passWord: String!, nickName: String!): User!
    login(email: String!, passWord: String!): User!
    logout: Boolean
  }
`;

export default userSchema;
