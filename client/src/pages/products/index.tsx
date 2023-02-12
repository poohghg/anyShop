// 'https://fakestoreapi.com/products'
import { QueryKeys } from "../../queryClient";
import styled from "styled-components";

import GET_PRODUCTS, { Products } from "../../graphql/gqlProduct";
import useInfiniteQ from "../../hoc/useInfiniteQ";
import PageTitle from "../../components/pageTitle";
import ProductList from "../../components/product/productList";

const ProductPage = () => {
  const { data, RefDom, status } = useInfiniteQ<Products>({
    qKey: [QueryKeys.PRODUCTS, "products"],
    query: GET_PRODUCTS,
  });
  return (
    <>
      <PageTitle label="상품목록" />
      {status === "success" && <ProductList data={data} />}
      <RefDom />
    </>
  );
};
export default ProductPage;

const Title = styled.h2`
  padding: 0 2rem;
`;
