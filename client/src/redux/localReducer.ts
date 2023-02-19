import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../graphql/gqlCart";
import { Product } from "../graphql/gqlProduct";

// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2
interface StateType {
  recentProducts: Product[];
}

const initialState: StateType = {
  recentProducts: [],
};

const slice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setRecentProducts: (state, action: PayloadAction<Product[]>) => {
      state.recentProducts = action.payload;
    },
  },
});

export const { setRecentProducts } = slice.actions;

const localReducer = slice.reducer;
export default localReducer;
