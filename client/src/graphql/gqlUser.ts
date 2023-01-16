import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authFetcher, graphqlFetcher, QueryKeys } from "./../queryClient";
import { useMutation, useQuery } from "react-query";
import { gql } from "graphql-tag";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import useUser from "../hoc/useUser";

// interface authTo

export interface User {
  email: string;
  nickName: string;
  userId: string;
  userTy: number;
  token?: string;
}

export type Users = User[];

export const CHECK_EMAIL = gql`
  query GET_PRODUCTS($email: String!) {
    checkEmail(email: $email)
  }
`;

export const GET_USER = `
  query GET_USER {
    user {
      userId
      token
      email
      nickName
      userTy
    }  
  }
`;

export const LOGIN = `
  mutation LOGIN($email: String!, $passWord: String!) {
    login(email: $email, passWord: $passWord) {
      userId
      token
      email
      nickName
      userTy
    }
  }
`;

export const LOGOUT = `  
  mutation {
    logout 
  }
`;

export const ADD_USER = gql`
  mutation ADD_USER($email: String!, $passWord: String!, $nickName: String!) {
    addUser(email: $email, passWord: $passWord, nickName: $nickName) {
      email
      nickName
      token
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

export default GET_USER;

// API
// export const useGetToken = () => {
//   const navi = useNavigate();
//   return useQuery<AxiosResponse<{ token: string }>, Error>(
//     [QueryKeys.USER, "token"],
//     () => authFetcher(GET_TOKEN),
//     {
//       refetchOnMount: true,
//       onSuccess: ({ data }) => {
//         if (data.token)
//           auth.defaults.headers.common[
//             "Authorization"
//           ] = `Bearer ${data.token}`;
//       },
//     },
//   );
// };

export const singUpMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation(
    ({
      email,
      passWord,
      nickName,
    }: {
      email: string;
      passWord: string;
      nickName: string;
    }) => graphqlFetcher(ADD_USER, { email, nickName, passWord }),
    {
      onMutate: () => {},
      onSuccess: ({ addUser }: { addUser: User }) => {
        // dispatch(loginUser({ ...addUser }));
      },
      onError: (error) => {
        if (error) console.log(error);
      },
      onSettled: () => navigate("/"),
    },
  );
};

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { onLogin } = useUser();
  return useMutation(
    ({ email, passWord }: { email: string; passWord: string }) =>
      authFetcher(LOGIN, { email, passWord }),
    {
      onSuccess: ({ login }: { login: User }) => {
        if (login.token) onLogin(login);
        navigate(-1);
      },
      onError: (error: AxiosError) => {
        toast("이메일을 확인해주세요.", {
          type: "error",
          closeOnClick: false,
        });
      },
      onSettled: () => {},
    },
  );
};
