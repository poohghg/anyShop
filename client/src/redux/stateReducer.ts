import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType } from "../graphql/gqlCart";

// https://kyounghwan01.github.io/blog/React/redux/redux-toolkit/#%E1%84%89%E1%85%A1%E1%84%8B%E1%85%AD%E1%86%BC%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB-%E1%84%8B%E1%85%B5%E1%84%8B%E1%85%B2
interface StateType {
  num: number;
  text: String;
  payItems: CartType[];
  // recnetPrduct: Product[];
}

const initialState: StateType = {
  num: 0,
  text: "",
  payItems: [],
  // recnetPrduct: [],
};

const slice = createSlice({
  name: "test",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<{ id: number; text: string }>) => {
      state.num = state.num + action.payload.id;
      state.text += action.payload.text;
    },
    setPayItems: (state, action: PayloadAction<CartType[]>) => {
      state.payItems = action.payload;
    },
  },
});

export const { increment, setPayItems } = slice.actions;

const stateReducer = slice.reducer;
export default stateReducer;
