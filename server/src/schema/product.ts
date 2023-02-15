import { gql } from "apollo-server-express";

const productSchema = gql`
  type Product {
    id: ID!
    imageUrl: String
    price: Int
    title: String
    description: String
    createdAt: Float
    category: String
    rate: Int
    hit: Int
    likes: Int
    isLike: Boolean
    cnt: Int
  }
  type OrderItem {
    id: ID!
    cnt: Int!
    product: Product
  }
  extend type Query {
    products(cursor: ID, showDeleted: Boolean): [Product!]
    product(id: ID!, isHitUpdate: Boolean!): Product!
    orderLikes: [OrderItem]
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
