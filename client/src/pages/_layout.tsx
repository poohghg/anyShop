import React, { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Gnb from "../components/gnb";
import GET_USER, { User } from "../graphql/gqlUser";
import useUser from "../hoc/useUser";
import { auth, authFetcher, QueryKeys } from "../queryClient";

const Layout: React.FC = () => {
  const { onLogin } = useUser();
  useQuery([QueryKeys.USER, "AUTH"], () => authFetcher(GET_USER), {
    onSuccess: ({ user }: { user: User }) => {
      onLogin(user);
    },
  });

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
`;

export default Layout;
