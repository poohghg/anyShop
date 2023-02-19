import React from "react";
import GlobalLayout from "./pages/_layout";

import DynamicIndex from "./pages/index";
// const DynamicIndex = React.lazy(() => import("./pages/index"));
const DynamicCartIndex = React.lazy(() => import("./pages/cart/index"));
const DynamicProductsIndex = React.lazy(() => import("./pages/products/index"));
const DynamicProductsId = React.lazy(() => import("./pages/products/[id]"));
const DynamicPayment = React.lazy(() => import("./pages/payment/index"));
const DynamicLogin = React.lazy(() => import("./pages/login/index"));
const DynamicSingUp = React.lazy(() => import("./pages/singUp/index"));
const DynamicAdmin = React.lazy(() => import("./pages/admin/index"));

export const routes = [
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      { path: "/", element: <DynamicIndex />, index: true },
      { path: "/cart", element: <DynamicCartIndex />, index: true },
      { path: "/products", element: <DynamicProductsIndex />, index: true },
      { path: "/products/:id", element: <DynamicProductsId /> },
      { path: "/payment", element: <DynamicPayment /> },
      { path: "/login", element: <DynamicLogin /> },
      { path: "/singUp", element: <DynamicSingUp /> },
      { path: "/admin", element: <DynamicAdmin /> },
    ],
  },
];

export const pages = [
  { route: "/" },
  { route: "/cart" },
  { route: "/products" },
  { route: "/products/:id" },
];
