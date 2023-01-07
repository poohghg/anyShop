import React, { Suspense, useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Gnb from "../components/gnb";
import GET_USER from "../graphql/gqlUser";
import { authFetcher, QueryKeys } from "../queryClient";

const Layout: React.FC = () => {
  useQuery([QueryKeys.USER, "AUTH"], () => authFetcher(GET_USER), {
    // onSuccess: () => {},
  });
  // getUserINfo
  // useEffect(() => {
  //   console.log("Layout");
  // }, []);
  console.log("Layout");
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
