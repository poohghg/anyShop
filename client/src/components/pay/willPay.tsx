import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { RootState } from "../../redux";

interface ToTalInfoType {
  totalPrice: number;
  numOfItem: number;
}

const WillPay = () => {
  const navigate = useNavigate();
  const payItems = useSelector(
    (state: RootState) => state.stateReducer.payItems,
  );

  const PayInfo = payItems.reduce<ToTalInfoType>(
    (acc, cur) => {
      acc.totalPrice += cur.amount * cur.product.price;
      acc.numOfItem++;
      return acc;
    },
    {
      totalPrice: 0,
      numOfItem: 0,
    },
  );

  const handlePay = useCallback(() => {
    if (payItems.length) navigate("/payment");
    else alert("선택된 상품이 없습니다.");
  }, []);

  return (
    <Main>
      {/* <ImgList>
        {payItems.map(({ product }) => (
          <li key={product.id}>
            <img src={product.imageUrl} alt="상품" />
          </li>
        ))}
      </ImgList> */}
      <div>
        <span>총 결제금액</span>
        <span>{PayInfo.totalPrice}원</span>
        <span>{PayInfo.numOfItem}개</span>
      </div>
      <button onClick={handlePay}>결제하기</button>
    </Main>
  );
};
export default memo(WillPay);

const Main = styled.div`
  margin-top: 5vh;
  border-top: 1px solid;
`;

const ImgList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: auto;

  img {
    width: 30vw;
    height: 30vh;
  }
`;
