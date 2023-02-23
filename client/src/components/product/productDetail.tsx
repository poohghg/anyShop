import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../graphql/gqlProduct";
import { useToLogin } from "../../hoc";
import useRecentProducts from "../../hoc/useRecentProducts";
import { RootState } from "../../redux";
import AddCart from "./addCart";
import AddLike from "./addLike";
import ProductAmount from "./productAmount";
interface ProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { id, description, imageUrl, isLike, price, title, hit, likes } =
    product;
  const userId = useSelector((state: RootState) => state.userReducer.userId);
  const isToLoginPage = useToLogin();

  const [amount, setAmount] = useState(1);
  const { setItems } = useRecentProducts();
  const navigate = useNavigate();

  const toWillPay = () => {
    if (!userId) return isToLoginPage();
    navigate("/payment", {
      state: {
        payItem: [
          {
            id: id,
            amount: amount,
            product,
            isInstant: true,
          },
        ],
      },
    });
  };

  const handleAmount = useCallback((amount: number) => setAmount(amount), []);
  useEffect(() => setItems(product), []);

  return (
    <Main>
      <MainImg src={imageUrl} />
      <InfoBox>
        <ProductTitle>{title}</ProductTitle>
        <ProductDesc>{description}</ProductDesc>
        <FlexBox>
          <Price>${price}</Price>
          <ProductAmount amount={amount} handleAmount={handleAmount} />
        </FlexBox>

        <BtnBox>
          <AddCart productId={id} amount={amount} />
          <AddLike productId={id} isLike={isLike} />
        </BtnBox>
        <ViewBox>
          <ViewContent>조회수 {hit}</ViewContent>
          <ViewContent>좋아요 {likes}</ViewContent>
        </ViewBox>
      </InfoBox>
      <BuyNow onClick={toWillPay}>바로구매하기</BuyNow>
    </Main>
  );
};

export default ProductDetail;

const Main = styled.div`
  position: relative;
  max-width: 720px;
  /* min-height: calc(92vh - 3rem); */
  margin: 0 auto;
  padding-top: 2rem;
`;

const MainImg = styled.img`
  width: 100%;
  height: 320px;
  object-fit: contain;
`;

const InfoBox = styled.div`
  /* width:100 ; */
  padding: 1rem 1.5vw;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 300;
`;

const ProductDesc = styled.p`
  font-size: 0.95rem;
  font-weight: 250;
  margin-top: 0.5rem;
  word-break: keep-all;
  white-space: pre-line;
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Price = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  margin-top: 0.5rem;
`;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 0.5rem;
  border: 1px solid #bcbcbc;
  > button {
    width: 50%;
    padding: 0.5rem 0;
    cursor: pointer;
  }
  button:nth-child(1) {
    border-right: 1px solid #bcbcbc;
  }
`;

const ViewBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;

const ViewContent = styled.span`
  font-size: 0.8rem;
  font-weight: 350;
  & + & {
    margin-left: 0.5rem;
  }
`;

const BuyNow = styled.button`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 2rem;
  width: calc(100% - 3vw);
  max-width: 720px;
  margin: 0 auto;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 0;
  border-radius: 12px;
  border: 1px solid #bcbcbc;
  background-color: rgb(103, 40, 255);
  color: #fff;
`;
