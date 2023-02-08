import { useNavigate } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT, User } from "../graphql/gqlUser";
import { auth, authFetcher, getClient, QueryKeys } from "../queryClient";
import { initUser, setUser } from "../redux/userReducer";

interface TEST {
  id: string;
}

const useUser = () => {
  const client = getClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = useCallback((user: User) => {
    auth.defaults.headers.common["authorization"] = `Bearer ${user.token}`;
    delete user.token;
    dispatch(setUser(user));
  }, []);

  const onLogOut = useCallback(async () => {
    const isConfirm = confirm("로그아웃 하시겠습니까?");
    if (!isConfirm) return;
    const res = await authFetcher(LOGOUT);
    if (res.logout) {
      auth.defaults.headers.common["authorization"] = "";
      client.clear();
      dispatch(initUser());
      return navigate("/", { replace: true });
    }
  }, []);

  const isAuthFetching = client.isFetching({
    queryKey: QueryKeys.USER_AUTH,
  });

  return { onLogin, onLogOut, isAuthFetching };
};

export default useUser;
