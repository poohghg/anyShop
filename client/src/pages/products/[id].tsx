import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProductDetail from "../../components/product/productDetail";
import { GET_PRODUCT, Product } from "../../graphql/gqlProduct";
import { QueryKeys, authFetcher } from "../../queryClient";

const ProductsDetailPage = () => {
  const { id } = useParams();
  const [isHitUpdate, setIsHitUpdate] = useState<boolean>(false);
  const { data, status } = useQuery<{ product: Product }>(
    [QueryKeys.PRODUCTS, id],
    () => authFetcher(GET_PRODUCT, { id, isHitUpdate }),
    {
      refetchOnMount: true,
      staleTime: 0,
    },
  );

  useEffect(() => {
    if (status === "success" && !isHitUpdate) setIsHitUpdate(true);
  }, [status]);

  if (status !== "success") return null;
  return (
    <>
      <ProductDetail product={data.product} />
    </>
  );
};

export default ProductsDetailPage;
