import styled from "styled-components";
import { Product } from "../../graphql/gqlProduct";

interface SwiperItemPorps extends Product {}

const SwiperItem = ({ id, imageUrl, price, title, cnt }: SwiperItemPorps) => {
  return (
    <Card>
      <CardImg>
        <img src={imageUrl} alt="img" />
        <Blur />
      </CardImg>
      <ProductTitie>{title}</ProductTitie>
      <Price>${price}</Price>
      <ViewBox>
        <span>좋아요</span>
        <span>{cnt}</span>
      </ViewBox>
    </Card>
  );
};

export default SwiperItem;

const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  /* box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25); */
  padding: 0.5rem 0;
`;

const CardImg = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.03);
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  background-color: #fff;
  > img {
    height: 20vw;
    max-height: 180px;
    max-width: 100%;
    object-fit: contain;
  }
  :hover {
    > div {
      display: block;
    }
  }
`;

const Blur = styled.div`
  position: absolute;
  display: none;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const ProductTitie = styled.h3`
  font-size: 1.1rem;
  font-weight: 300;
  margin-top: 0.5rem;
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

const Price = styled.p`
  font-size: 1rem;
  font-weight: 400;
  margin-top: 0.5rem;
`;

// const Cnt = styled.span``;
const ViewBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 0.9rem;
  font-weight: 400;
  > span {
    margin-left: 0.5rem;
  }
`;
