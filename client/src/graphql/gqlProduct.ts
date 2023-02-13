import { gql } from "graphql-tag";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { useToLogin } from "../hoc";
import { authFetcher, getClient, QueryKeys } from "../queryClient";

export interface Product {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt: number;
  category?: string;
  rate?: number;
  hit?: number;
  likes?: number;
  isLike?: boolean;
}

export type MutableProduct = Omit<Product, "id" | "createdAt">; // 지정한 타입을 뺀 나머지 타입.

export type Products = {
  products: Product[];
};

const GET_PRODUCTS = `
  query GET_PRODUCTS($cursor: ID, $showDeleted: Boolean) {
    products(cursor: $cursor, showDeleted: $showDeleted) {
      id
      imageUrl
      price
      title
      description
      createdAt
      category
      rate
      hit
      likes
      isLike
    }
  }
`;

export const GET_PRODUCT = gql`
  query GET_PRODUCT($id: ID!) {
    product(id: $id) {
      id
      imageUrl
      price
      title
      description
      createdAt
      category
      rate
      hit
      like
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation ADD_PRODUCT(
    $imageUrl: String!
    $price: Int!
    $title: String!
    $description: String!
    $category: String!
  ) {
    addProduct(
      imageUrl: $imageUrl
      price: $price
      title: $title
      description: $description
      category: $category
    ) {
      id
      imageUrl
      price
      title
      description
      createdAt
      category
      rate
      hit
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UPDATE_PRODUCT(
    $id: ID!
    $imageUrl: String
    $price: Int
    $title: String
    $description: String
  ) {
    updateProduct(
      id: $id
      imageUrl: $imageUrl
      price: $price
      title: $title
      description: $description
    ) {
      id
      imageUrl
      price
      title
      description
      createdAt
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DELETE_PRODUCT($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const LIKE_PRODUCT = `
  mutation LIKE_PRODUCT($productId: ID!) {
    likeProduct(productId: $productId) 
  }
`;

export default GET_PRODUCTS;

// API
const client = getClient();

export const useLikeProduct = () => {
  const isToLoginPage = useToLogin();
  return useMutation(
    (productId: string) => authFetcher(LIKE_PRODUCT, { productId }),
    {
      onSuccess: (
        { likeProduct }: { likeProduct: boolean },
        variables,
        context,
      ) => {
        client.invalidateQueries(QueryKeys.PRODUCTS);
        const msg = likeProduct
          ? "관심상품에 삭제되었습니다."
          : "관심상품에 추가되었습니다.";
        toast(msg, {
          type: "info",
        });
      },
      onError: (error, variables, context) => {
        isToLoginPage();
      },
    },
  );
};
