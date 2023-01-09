import { useNavigate } from "react-router-dom";
import { createSelector } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { LOGOUT, User } from "../graphql/gqlUser";
import { auth, authFetcher } from "../queryClient";
import { initUser, setUser } from "../redux/userReducer";

interface TEST {
  id: string;
}

const useUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = useCallback((user: User) => {
    auth.defaults.headers.common["authorization"] = `Bearer ${user.token}`;
    // auth.defaults.headers.
    delete user.token;
    dispatch(setUser(user));
  }, []);

  const onLogOut = useCallback(async () => {
    const res = await authFetcher(LOGOUT);
    if (res.logout) {
      auth.defaults.headers.common["authorization"] = "";
      dispatch(initUser());
      navigate("/");
    }
  }, []);

  return { onLogin, onLogOut };
};

export default useUser;
