import { ForwardedRef, forwardRef, memo, useEffect } from "react";
import styled from "styled-components";
import { MinusIcon, PlusIcon } from "../../style/icons/icons";
import { CartType } from "../../graphql/gqlCart";
import CartProduct from "./cartProduct";
import { CheckBoxInput, CheckBoxLabel } from "../../style/styledComponents";

interface CartProps extends CartType {
  handleUpdateAmount: (e: React.MouseEvent, amount: number, id: string) => void;
  handleDeleteCart: (e: React.MouseEvent, id: string) => void;
}

// ref는 일반적인 props가 아니다.
const CartItem = (
  { amount, id, product, handleUpdateAmount, handleDeleteCart }: CartProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <CartItemBox>
      <ButtonWrap>
        <div>
          <CheckBoxInput
            id={id}
            type="checkbox"
            name="select-item"
            data-id={id}
            ref={ref}
            defaultChecked={true}
          />
          <CheckBoxLabel htmlFor={id} />
        </div>
        <DeleteButton type="button" onClick={(e) => handleDeleteCart(e, id)}>
          삭제
        </DeleteButton>
      </ButtonWrap>
      <CartProduct {...product} />
      <PriceWrap>
        <ControlAmount>
          <button
            type="button"
            onClick={(e) => handleUpdateAmount(e, amount - 1, id)}
          >
            <MinusIcon />
          </button>
          <div>{amount}</div>
          <button
            type="button"
            onClick={(e) => handleUpdateAmount(e, amount + 1, id)}
          >
            <PlusIcon />
          </button>
        </ControlAmount>
        <Price>{product.price * amount}원</Price>
      </PriceWrap>
    </CartItemBox>
  );
};
export default memo(forwardRef(CartItem));

const CartItemBox = styled.li`
  width: 100%;
  padding: 1rem 0.5rem;
  border-top: 1px solid #bcbcbc;
  /* & + & {
    border-top: 1px solid #bcbcbc;
  } */
  /* display: flex; */
  /* align-items: baseline; */
`;

const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  /* border-bottom: 1px solid #bcbcbc; */
`;

const DeleteButton = styled.button`
  padding: 0.2rem 1.2rem;
  border-radius: 6px;
  background-color: #d6586d;
  color: #fff;
  opacity: 0.8;
  height: 22px;
`;

const PriceWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ControlAmount = styled.div`
  margin-top: 0.5rem;
  width: fit-content;
  display: flex;
  align-items: center;
  border: 1px solid #bcbcbc;
  border-radius: 8px;
  width: ;

  > div {
    text-align: center;
    height: 100%;
    width: 36px;
    border-left: 1px solid #bcbcbc;
    border-right: 1px solid #bcbcbc;
    font-size: 1.2rem;
  }
  > button {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 0.5rem;
  }
`;

const Price = styled.p`
  font-size: 1.4rem;
  font-weight: 500;
  margin-top: 0.5rem;
`;
