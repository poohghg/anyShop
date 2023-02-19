import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Product } from "../graphql/gqlProduct";
import { RootState } from "../redux";
import { setRecentProducts } from "../redux/localReducer";

// 아이템으 최대 30개까지 보관

const useSetRecentProducts = () => {
  const recentProducts = useSelector(
    (state: RootState) => state.localReducer.recentProducts,
  );
  const dispatch = useDispatch();
  const setItems = useCallback(
    (newItem: Product) => {
      const filletedItem = recentProducts.filter(
        (item) => item.id !== newItem.id,
      );
      filletedItem.push(newItem);
      if (filletedItem.length > 30) filletedItem.shift();
      dispatch(setRecentProducts(filletedItem));
    },
    [recentProducts],
  );
  return { recentProducts, setItems };
};

export default useSetRecentProducts;
