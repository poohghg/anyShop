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
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  div:nth-child(1) {
    width: 60%;
  }
  div:nth-child(2) {
    width: 40%;
  }
`;

const Image = styled.img`
  object-fit: contain;
  width: 100%;
  height: 55px;
`;
