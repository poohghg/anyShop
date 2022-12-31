// 'https://fakestoreapi.com/products'
import { QueryKeys, graphqlFetcher, getClient } from "../../queryClient";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import ProductItem from "../../components/productItem";
import GET_PRODUCTS, { ADD_PRODUCT, Products } from "../../graphql/gqlProduct";
import { useCallback, useEffect } from "react";
import { ADD_CART } from "../../graphql/gqlCart";

const ProductList = () => {
  // const  getClient();
  const queryClient = useQueryClient();
  const { data, status } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
    graphqlFetcher(GET_PRODUCTS),
  );

  const { mutate: addCart, status: mutateStatus } = useMutation(
    (id: string) => graphqlFetcher(ADD_CART, { id }),
    {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(QueryKeys.CART);
      },
    },
  );

  const addCartListener = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
      e.preventDefault();
      addCart(id);
    },
    [status],
  );

  console.log("status", status, "mutateStatus", mutateStatus);
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
