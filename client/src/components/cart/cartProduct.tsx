import { Link } from "react-router-dom";
import styled from "styled-components";
import { Product } from "../../graphql/gqlProduct";

interface CartProductProps extends Product {}

const CartProduct = ({ id, price, title, imageUrl }: CartProductProps) => {
  return (
    <Item>
      <div>
        <h4>{title}</h4>
        <p>가격: {price}</p>
      </div>
      <Link to={`/product/${id}`}>
        <Image src={imageUrl} alt="image" />
      </Link>
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
  a:nth-child(2) {
    width: 30%;
    display: flex;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 95px;
  object-fit: contain;
`;
