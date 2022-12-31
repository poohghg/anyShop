import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GET_PRODUCT, Product } from "../../graphql/gqlProduct";
import { restFetcher, QueryKeys, graphqlFetcher } from "../../queryClient";

const ProductsDetail = () => {
  const { id } = useParams();
  const { data } = useQuery<Product>([QueryKeys.PRODUCTS, id], () =>
    graphqlFetcher(GET_PRODUCT, { id }),
  );
  // console.log(data);
  return <div>상세 {id} 페이지입니다.</div>;
};

export default ProductsDetail;
