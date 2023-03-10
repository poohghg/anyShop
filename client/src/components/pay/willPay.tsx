import { memo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CartType } from "../../graphql/gqlCart";
import TotalPayInfo from "../cart/TotalPayInfo";

interface WillPayProps {
  payItems: CartType[];
  handlePay: () => void;
  isLoading: boolean;
}

const WillPay = ({ payItems, handlePay, isLoading }: WillPayProps) => {
  return (
    <Main>
      <Label>주문상품 정보 / 총{payItems.length}개</Label>
      <List>
        {payItems.map(({ product, amount }) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            style={{ width: "100%" }}
          >
            <Item>
              <ImgWrap>
                <img src={product.imageUrl} alt="상품" />
              </ImgWrap>
              <ItemDetail>
                <p>{product.title}</p>
              </ItemDetail>
            </Item>
            <PriceInfo>
              ${product.price} / 수량 : {amount}개
            </PriceInfo>
          </Link>
        ))}
      </List>
      <TotalPayInfo
        payItems={payItems}
        buttonListener={handlePay}
        isLoading={isLoading}
      />
    </Main>
  );
};
export default memo(WillPay);

const Main = styled.div`
  margin: 0 auto;
  max-width: 720px;
  padding: 1rem;
  border: 1px solid black;
  border-radius: 12px;
`;

const Label = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  padding-bottom: 1rem;
  border-bottom: 2px solid black;
`;

const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Item = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1rem 0;
  border-top: 1px solid black;
  & + & {
    border-top: 1px solid black;
  }
`;

const ImgWrap = styled.div`
  width: 60%;
  vertical-align: middle;
  > img {
    width: 100%;
    max-height: 15vh;
    object-fit: contain;
  }
`;

const ItemDetail = styled.div`
  width: 40%;
  font-size: 0.9rem;
  font-weight: 400;
  padding-left: 0.5rem;
  > :nth-child(1) {
    font-size: 1.1rem;
    font-weight: 500;
    padding-bottom: 0.3rem;
  }
`;

const PriceInfo = styled.div`
  height: 3vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1rem;
  font-weight: 300;
  background-color: #666;
  border-radius: 4px;
  margin-bottom: 1vh;
  /* padding: 1rem; */
`;
