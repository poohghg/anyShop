import { gql } from "apollo-server-express";

const productSchema = gql`
  type Product {
    id: ID!
    imageUrl: String!
    price: Int!
    title: String!
    description: String!
    createdAt: Float
    category: String
    rate: Int
    hit: Int
    likes: Int
    isLike: Boolean
    cnt: Int
  }

  extend type Query {
    products(cursor: ID, showDeleted: Boolean): [Product!]
    product(id: ID!, isHitUpdate: Boolean!): Product!
    orderPayItems: [Product!]
    orderLikes: [Product!]
  }
  extend type Mutation {
    addProduct(
      imageUrl: String!
      price: Int!
      title: String!
      description: String!
      category: String!
    ): Product!
    updateProduct(
      id: ID!
      imageUrl: String
      price: Int
      title: String
      description: String
    ): Product!
    deleteProduct(id: ID!): ID!
    likeProduct(productId: ID!): Boolean!
  }
`;

export default productSchema;
