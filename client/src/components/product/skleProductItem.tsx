import styled from "styled-components";
import Skeleton from "../skeleton";

const SkleProductItem = () => {
  return (
    <Item>
      <ImgWrap>
        <Skeleton width="100%" height="100%" />
      </ImgWrap>
      <Title>
        <Skeleton count={225} />
      </Title>
      <Price>
        <Skeleton height="1.5rem" width="32px" rounded={true} />
      </Price>
      <span>
        <Skeleton height="16px" width="62px" rounded={true} />{" "}
      </span>
      <FlexBox>
        <Skeleton height="40px" width="50%" rounded={true} />{" "}
        <Skeleton height="40px" width="50%" rounded={true} />{" "}
      </FlexBox>
    </Item>
  );
};

export default SkleProductItem;

const Item = styled.li``;
const Category = styled.h4`
  color: ${({ theme }) => theme.colors.mainColor};
  font-size: 1.15rem;
  font-weight: 500;
  padding-bottom: 0.25rem;
  /* background-color: ; */
`;
const Title = styled.p`
  padding-top: 0.3rem;
  color: ${({ theme }) => theme.colors.mainColor};
  font-weight: 300;
  min-height: 5.7rem;
  display: -webkit-inline-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  overflow: hidden;
  white-space: normal;
`;

const ImgWrap = styled.div`
  position: relative;
  height: 20vh;
  border-radius: 12px;
  border: 2px solid rgb(248, 249, 250);
  overflow: hidden;
  padding: 0.3rem;
  && img {
    /* padding: 1rem 0; */
    width: 100%;
    height: 100%;
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
  z-index: 1;
`;

const Price = styled.h4`
  padding-top: 0.2rem;
  padding-bottom: 0.15rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.mainColor};
`;

const FlexBox = styled.div`
  margin-top: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid #bcbcbc; */
  > button {
    width: 50%;
    padding: 0.5rem 0;
    cursor: pointer;
  }
  button:nth-child(1) {
    border-right: 1px solid #bcbcbc;
  }
`;
