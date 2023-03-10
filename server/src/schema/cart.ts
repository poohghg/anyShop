import { gql } from "apollo-server-express";

const cartSchema = gql`
  type CartItem {
    id: ID!
    amount: Int!
    product: Product!
    createdAt: Int
  }
  extend type Query {
    cart: [CartItem!]
  }
  extend type Mutation {
    addCart(productId: ID!, amount: Int!): CartItem!
    updateCart(cartId: ID!, amount: Int!): CartItem!
    deleteCart(cartId: ID!): ID!
    executePay(
      ids: [ID!]
      checkAddress: Boolean!
      address: String!
      recipient: String!
      detailedAddress: String!
      isInstant: Boolean
    ): Boolean!
  }
`;

export default cartSchema;
