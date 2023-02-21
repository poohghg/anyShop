// 'https://fakestoreapi.com/products'
import { QueryKeys } from "../../queryClient";
import styled from "styled-components";

import GET_PRODUCTS, { Products } from "../../graphql/gqlProduct";
import useInfiniteQ from "../../hoc/useInfiniteQ";
import PageTitle from "../../components/pageTitle";
import ProductList from "../../components/product/productList";

const ProductPage = () => {
  const { data, RefDom, status, isSuccess } = useInfiniteQ<Products>({
    qKey: [QueryKeys.PRODUCTS, "products"],
    query: GET_PRODUCTS,
  });
  return (
    <>
      <PageTitle label="상품목록" />
      <Wrap>
        <ProductList data={data} isSuccess={isSuccess} />
        <RefDom />
      </Wrap>
    </>
  );
};
export default ProductPage;

const Wrap = styled.div`
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  margin-top: 2rem;
  padding: 0 1rem;
`;
