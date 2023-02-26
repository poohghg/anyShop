import { authFetcher, getClient, QueryKeys } from "./../queryClient";
import { useMutation } from "react-query";
import { Product } from "./gqlProduct";
import useToLogin from "../hoc/useToLogin";
import { toast } from "react-toastify";

export type CartType = {
  id: string;
  amount: number;
  product: Product;
};

export type Carts = { cart: CartType[] };

export const GET_CART = `
  query GET_CART {
    cart{
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const ADD_CART = `
  mutation ADD_CART($id: ID!,$amount:Int!) {
    addCart(productId: $id, amount:$amount) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const UPDATE_CART = `
  mutation UPDATE_CART($id: ID!, $amount: Int!) {
    updateCart(cartId: $id, amount: $amount) {
      id
      amount
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
    }
  }
`;

export const DELETE_CART = `
  mutation DELETE_CART($id: ID!) {
    deleteCart(cartId: $id)
  }
`;

// API
const client = getClient();

export const useUpdateMutation = () =>
  useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      authFetcher(UPDATE_CART, { id, amount }),
    {
      onMutate: ({ id, amount }) => {
        client.cancelQueries(QueryKeys.CART);
        const { cart: prev } = client.getQueryData<Carts>(QueryKeys.CART) || {
          cart: [],
        };
        if (!prev.length) return null;

        const newItmes = prev.slice();
        prev.forEach((item, idx) => {
          if (item.id === id) {
            newItmes.splice(idx, 1, {
              ...prev[idx],
              amount: amount,
            });
            return false;
          }
        });

        client.setQueryData(QueryKeys.CART, { cart: newItmes });
        return { prev };
      },

      onSettled: () => {
        client.invalidateQueries(QueryKeys.CART);
      },

      onError: (error, variables, context) => {
        client.setQueryData(QueryKeys.CART, context!.prev);
      },
    },
  );

export const useDeleteMutation = () =>
  useMutation(({ id }: { id: string }) => authFetcher(DELETE_CART, { id }), {
    onMutate: () => {},
    onSuccess: (data, variables, context) => {
      client.invalidateQueries(QueryKeys.CART);
    },
    onError: (error) => {
      if (error) console.log(error);
    },
  });

export const useAddCart = () => {
  const isToLoginPage = useToLogin();
  return useMutation(
    ({ id, amount }: { id: string; amount: number }) =>
      authFetcher(ADD_CART, { id, amount }),
    {
      onSuccess: (data, variables, context) => {
        client.invalidateQueries(QueryKeys.CART);
        toast("장바구니에 추가되었습니다!", {
          type: "info",
        });
      },
      onError: (error, variables, context) => {
        isToLoginPage();
      },
    },
  );
};
