// 'https://fakestoreapi.com/products'
import { QueryKeys, graphqlFetcher, getClient } from "../../queryClient";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import ProductItem from "../../components/productItem";
import GET_PRODUCTS, { ADD_PRODUCT, Products } from "../../graphql/gqlProduct";
import { useCallback, useEffect } from "react";
import { ADD_CART, useAddCart } from "../../graphql/gqlCart";
import { useSelector } from "react-redux";
import { Root } from "react-dom/client";
import { RootState } from "../../redux";
import useToLogin from "../../hoc/useToLogin";

const ProductList = () => {
  const queryClient = useQueryClient();
  const isToLoginPage = useToLogin();
  const userId = useSelector((state: RootState) => state.userReducer.userId);

  const { data, status } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher(GET_PRODUCTS),
  );

  const { mutate: addCart } = useAddCart();

  const addCartListener = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
      e.preventDefault();
      if (!userId) return isToLoginPage();
      addCart(id);
    },
    [status, userId],
  );

  return (
    <>
      <Title>상품목록입니다.</Title>
      {status === "success" && (
        <List>
          {data?.products.map((product) => (
            <ProductItem
              key={product.id}
              {...product}
              addCartListener={addCartListener}
            />
          ))}
        </List>
      )}
    </>
  );
};
export default ProductList;

const Title = styled.h2`
  padding: 0 2rem;
`;

const List = styled.ul`
  padding: 1rem 2rem;
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5vh 1vw;

  @media ${(props) => props.theme.media.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`;
