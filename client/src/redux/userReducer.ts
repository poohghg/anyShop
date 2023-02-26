import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Addresses, User } from "../graphql/gqlUser";
import { PURGE } from "redux-persist";
``;
// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2
interface UserType {
  userId: string;
  userTy: number;
  email: string;
  nickName: string;
  addresses?: Addresses[];
}

const initialState: UserType = {
  userId: "",
  userTy: 0,
  email: "",
  nickName: "",
  addresses: [],
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { setUser } = slice.actions;

const userReducer = slice.reducer;
export default userReducer;
