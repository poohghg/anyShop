import styled from "styled-components";
import LazyImg from "../lazyImg";
import Skeleton from "../skeleton";

const SkleSwiperItem = () => {
  return (
    <Card>
      <CardImg>
        <Skeleton height="15vh" width="100%" />
      </CardImg>
      <ProductTitle>
        <Skeleton count={120} />
      </ProductTitle>
      <ViewBox>
        <Price>
          <Skeleton width="3vw" />
        </Price>
        <div>
          <span>
            <Skeleton width="2vw" />
          </span>
          <span>
            <Skeleton width="2vw" />
          </span>
        </div>
      </ViewBox>
    </Card>
  );
};

export default SkleSwiperItem;

export const Card = styled.div`
  width: 100%;
  overflow: hidden;
  border-radius: 12px;
  /* box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25); */
  padding: 0.5rem 0;
`;

export const CardImg = styled.div`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid rgb(248, 249, 250);
  display: flex;
  justify-content: center;
  padding: 0.3rem;
  /* background: radial-gradient(#fff 1px, rgb(248, 249, 250) 50%); */
  cursor: pointer;
  > img {
    height: 15vh;
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

export const ProductTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 300;
  margin-top: 0.5rem;
  display: -webkit-inline-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
`;

export const Price = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

export const ViewBox = styled.div`
  margin-top: 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    > span {
      margin-left: 0.3rem;
      font-size: 0.9rem;
      font-weight: 400;
    }
  }
`;
