import { memo, useMemo } from "react";
import styled from "styled-components";
import { CartType } from "../../graphql/gqlCart";

interface TotalPayInfoProps {
  payItems: CartType[];
  buttonListener?: () => void;
  isLoading?: boolean;
}

const TotalPayInfo = ({
  payItems,
  buttonListener,
  isLoading,
}: TotalPayInfoProps) => {
  const totalPrice = useMemo(
    () =>
      payItems.reduce(
        (acc, { id, amount, product }) => (acc += amount * product.price),
        0,
      ),
    [payItems],
  );

  return (
    <TotalCartInfo>
      <div>
        <span>총</span>
        <span>{payItems.length}개</span>
      </div>
      <div>
        <span>결제금액</span>
        <span>${totalPrice}</span>
      </div>
      <ToPayButton disabled={isLoading} onClick={buttonListener}>
        결제하기
      </ToPayButton>
    </TotalCartInfo>
  );
};

export default memo(TotalPayInfo);

const TotalCartInfo = styled.div`
  border-top: 3px solid #bcbcbc;
  width: 100%;
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 0.5rem;
    > span {
      font-size: 1.4rem;
      font-weight: 500;
    }
  }
`;

const ToPayButton = styled.button`
  background-color: rgba(28, 39, 51, 255);
  color: #fff;
  height: 4rem;
  width: 100%;
  padding: 1rem;
  font-weight: 600;
  font-size: 1.8rem;
  margin-top: 1rem;
  cursor: pointer;
`;
