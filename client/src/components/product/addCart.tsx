import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useAddCart } from "../../graphql/gqlCart";
import { useToLogin } from "../../hoc";
import { RootState } from "../../redux";
import { CartIcon } from "../../style/icons/icons";

const AddCart = ({ productId }: { productId: string }) => {
  const isToLoginPage = useToLogin();
  const { mutate: addCart } = useAddCart();
  const userId = useSelector((state: RootState) => state.userReducer.userId);

  const addCartListener = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!userId) return isToLoginPage();
      addCart(productId);
    },
    [userId, productId],
  );

  return (
    <button onClick={addCartListener}>
      <CartIcon />
    </button>
  );
};

export default memo(AddCart);
