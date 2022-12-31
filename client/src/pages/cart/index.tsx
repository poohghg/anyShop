import { useQuery } from "react-query";
import CartList from "../../components/cart/cartList";
import { Carts, GET_CART } from "../../graphql/gqlCart";
import { graphqlFetcher, QueryKeys } from "../../queryClient";

const Cart = () => {
  const { data, status } = useQuery<Carts>(
    QueryKeys.CART,
    () => graphqlFetcher(GET_CART),
    {
      // staleTime: 1000 * 60 * 10,
      // cacheTime: 1000 * 60 * 10,
      // refetchOnMount 전역설정되어 있음.
      refetchOnMount: true,
    },
  );
  return <div>{status === "success" && <CartList cart={data?.cart} />}</div>;
};
export default Cart;
