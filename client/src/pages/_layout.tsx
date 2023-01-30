import React, { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Gnb from "../components/gnb";
import GET_USER, { User } from "../graphql/gqlUser";
import useUser from "../hoc/useUser";
import { authFetcher, QueryKeys } from "../queryClient";

const Layout: React.FC = () => {
  const { pathname } = useLocation();
  const { onLogin } = useUser();

  useQuery(QueryKeys.USER_AUTH, () => authFetcher(GET_USER), {
    onSuccess: ({ user }: { user: User }) => {
      onLogin(user);
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Gnb />
      <MainLayout id="main">
        <Suspense fallback={"loading..."}>
          <Outlet />
        </Suspense>
      </MainLayout>
    </>
  );
};

const MainLayout = styled.div`
  height: auto;
  padding-top: 8vh;
  padding-bottom: 3rem;
`;

export default Layout;
