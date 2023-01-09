import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../graphql/gqlCart";
import { User } from "../graphql/gqlUser";

// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2
interface UserType {
  email: string;
  nickName: string;
  userId: string;
  userTy: number;
}

const initialState: UserType = {
  email: "",
  nickName: "",
  userId: "",
  userTy: 0,
};

const slice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => ({
      ...state,
      ...action.payload,
    }),
    initUser: (state) => ({ ...initialState }),
  },
});

export const { setUser, initUser } = slice.actions;

const userReducer = slice.reducer;
export default userReducer;
