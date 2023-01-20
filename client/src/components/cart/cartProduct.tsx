import styled from "styled-components";
import { Product } from "../../graphql/gqlProduct";

interface CartProductProps extends Product {}

const CartProduct = ({ price, title, imageUrl }: CartProductProps) => {
  return (
    <Item>
      <div>
        <h4>{title}</h4>
        <p>가격: {price}</p>
      </div>
      <div>
        <Image src={imageUrl} alt="image" />
      </div>
    </Item>
  );
};
export default CartProduct;

const Item = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 1rem;
  font-weight: 300;

  div:nth-child(1) {
    width: 70%;
    * {
      font-size: 1rem;
      font-weight: 350;
    }
    p {
      margin-top: 0.3rem;
      font-size: 1.05rem;
      font-weight: 500;
    }
  }
  div:nth-child(2) {
    width: 30%;
    display: flex;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 95px;
  object-fit: contain;
`;
