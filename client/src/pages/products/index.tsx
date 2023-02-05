// 'https://fakestoreapi.com/products'
import { QueryKeys, authFetcher } from "../../queryClient";
import styled from "styled-components";

import GET_PRODUCTS, { Product, Products } from "../../graphql/gqlProduct";
import { Fragment, useCallback, useRef } from "react";
import { useAddCart } from "../../graphql/gqlCart";
import { useSelector } from "react-redux";

import { RootState } from "../../redux";
import useToLogin from "../../hoc/useToLogin";
import useInfiniteQ from "../../hoc/useInfiniteQ";
import ProductItem from "../../components/productItem";

const ProductList = () => {
  const isToLoginPage = useToLogin();
  const userId = useSelector((state: RootState) => state.userReducer.userId);

  const { data, RefDom, status } = useInfiniteQ<Products>({
    qKey: [QueryKeys.PRODUCTS, "products"],
    query: GET_PRODUCTS,
  });

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
          {data?.pages.map((page, idx) => (
            <Fragment key={idx}>
              {page.products.map((product) => (
                <ProductItem
                  key={product.id}
                  {...product}
                  addCartListener={addCartListener}
                />
              ))}
            </Fragment>
          ))}
        </List>
      )}
      <RefDom />
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
