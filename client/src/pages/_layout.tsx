import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Gnb from "../components/gnb";

const Layout: React.FC = () => {
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
