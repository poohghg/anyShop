import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/pageTitle";
import ProductDetail from "../../components/product/productDetail";
import { GET_PRODUCT, Product } from "../../graphql/gqlProduct";
import { QueryKeys, authFetcher } from "../../queryClient";

const ProductsDetailPage = () => {
  const { id } = useParams();
  const { data, status } = useQuery<{ product: Product }>(
    [QueryKeys.PRODUCTS, id],
    () => authFetcher(GET_PRODUCT, { id }),
    {
      refetchOnMount: true,
      staleTime: 0,
    },
  );
  console.log("ProductsDetail", data);
  if (status !== "success") return null;
  return (
    <>
      <ProductDetail product={data.product} />
    </>
  );
};

export default ProductsDetailPage;
