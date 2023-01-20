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
    const main = document.getElementById("main") as HTMLDivElement;
    main.scrollTo(0, 0);
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
  margin-top: 8vh;
  height: 92vh;
  overflow: auto;
  padding-bottom: 3rem;
`;

export default Layout;
