import { memo } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

interface Path {
  to: string;
  pathName: string;
}
const paths: Path[] = [
  { to: "", pathName: "홈" },
  { to: "products", pathName: "상품" },
  { to: "cart", pathName: "장바구니" },
  { to: "login", pathName: "로그인" },
  { to: "singUp", pathName: "회원가입" },
];

const Gnb = () => {
  // console.log(useLocation());
  const { pathname } = useLocation();
  return (
    <Navbar>
      <div>Logo</div>
      <MenuUl>
        {paths.map((path) => (
          <PathItem key={path.to} isActive={`/${path.to}` === pathname}>
            <Link to={path.to}>{path.pathName}</Link>
          </PathItem>
        ))}
      </MenuUl>
    </Navbar>
  );
};

export default memo(Gnb);

const Navbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(28, 39, 51, 255);
  padding: 0 2rem;
  /* * {
    color: #fff;
    font-size: 1.3rem;
    font-weight: 300;
  } */
  /* font-size: ${({ theme }) => theme.fonts.size.sm}; */
`;

const MenuUl = styled.ul`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  :hover {
    color: #fff;
  }
`;

const PathItem = styled.li<{ isActive: boolean }>`
  a {
    color: rgb(156 163 175);
    font-size: 1.2rem;
    font-weight: 300;
    color: ${({ isActive }) => (isActive ? "#fff" : "rgb(156 163 175)")};
  }
`;
