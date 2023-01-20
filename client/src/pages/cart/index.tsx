import { useEffect } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CartList from "../../components/cart/cartList";
import { Carts, GET_CART } from "../../graphql/gqlCart";
import { useToLogin, useUser } from "../../hoc";
import { authFetcher, QueryKeys } from "../../queryClient";
import { RootState } from "../../redux";

const Cart = () => {
  // QueryKeys.USER_AUTH;
  const { pathname } = useLocation();
  const isToLoginPage = useToLogin();
  const { isAuthFetching } = useUser();
  const userId = useSelector((state: RootState) => state.userReducer.userId);

  const { data, status } = useQuery<Carts>(
    QueryKeys.CART,
    () => authFetcher(GET_CART),
    {
      // staleTime: 1000 * 60 * 10,
      // cacheTime: 1000 * 60 * 10,
      // refetchOnMount 전역설정되어 있음.
      enabled: !!userId,
      refetchOnMount: true,
    },
  );

  useEffect(() => {
    if (pathname === "/cart" && !userId && !isAuthFetching)
      return isToLoginPage(true);
  }, [userId, isAuthFetching, pathname]);

  // if (!userId && !isAuthFetching) return isToLoginPage(true);
  return <div>{status === "success" && <CartList cart={data?.cart} />}</div>;
};
export default Cart;
