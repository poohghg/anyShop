import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authFetcher, QueryKeys } from "./../queryClient";
import { useMutation, useQuery } from "react-query";
import { gql } from "graphql-tag";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import useUser from "../hoc/useUser";

// interface authTo

export interface Addresses {
  address: string;
  recipient: string;
  detailedAddress: string;
}

export interface User {
  email: string;
  nickName: string;
  userId: string;
  userTy: number;
  token?: string;
  addresses?: Addresses[];
}

export type Users = User[];

export const CHECK_EMAIL = gql`
  query CHECK_EMAIL($email: String!) {
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
      addresses {
        detailedAddress
        recipient
        address
      }
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
      addresses {
        detailedAddress
        recipient
        address
      }
    }
  }
`;

export const LOGOUT = `  
  mutation {
    logout 
  }
`;

export const ADD_USER = `
  mutation ADD_USER($email: String!, $passWord: String!, $nickName: String!, $userTy:Int!) {
    addUser(email: $email, passWord: $passWord, nickName: $nickName, userTy: $userTy) {
      email
      nickName
      token
    }
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
      userTy,
    }: {
      email: string;
      passWord: string;
      nickName: string;
      userTy: number;
    }) => authFetcher(ADD_USER, { email, nickName, passWord, userTy }),
    {
      onMutate: () => {},
      onSettled: () => location.replace("/"),
    },
  );
};

export const useLoginMutation = () => {
  // const dispatch = useDispatch();
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
        console.log("error", error);
        toast("이메일을 확인해주세요.", {
          type: "error",
          closeOnClick: false,
        });
      },
      onSettled: () => {},
    },
  );
};
