import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useAddCart } from "../../graphql/gqlCart";
import { useToLogin } from "../../hoc";
import { RootState } from "../../redux";
import { CartIcon } from "../../style/icons/icons";

const AddCart = ({
  productId,
  amount,
}: {
  productId: string;
  amount?: number;
}) => {
  const isToLoginPage = useToLogin();
  const { mutate: addCart } = useAddCart();
  const userId = useSelector((state: RootState) => state.userReducer.userId);

  const addCartListener = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!userId) return isToLoginPage();
      console.log("amount", amount);
      addCart({ id: productId, amount: amount ?? 1 });
    },
    [amount],
  );

  return (
    <Button onClick={addCartListener}>
      <CartIcon />
      <Label>장바구니</Label>
    </Button>
  );
};

export default memo(AddCart);

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Label = styled.span`
  margin-left: 4px;
  font-weight: 350;
  font-size: 0.8rem;
  transform: translateY(10%);
`;
