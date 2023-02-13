import { Fragment, memo, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import useUser from "../hoc/useUser";
import { RootState } from "../redux";
import Mgnb from "./mGnb";

export interface Path {
  to: string;
  pathName: string;
  iconSrc?: string;
}

const paths: Path[] = [
  { to: "", pathName: "홈" },
  { to: "products", pathName: "상품" },
];

// "
const Icons: Path[] = [
  { to: "cart", pathName: "장바구니" },
  { to: "singUp", pathName: "회원가입" },
];

const Gnb = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const { pathname } = useLocation();
  const { onLogOut } = useUser();
  const { userId, userTy } = useSelector(
    (state: RootState) => state.userReducer,
  );
  return (
    <Navbar>
      <MenuWrap openM={openMobileMenu}>
        <MenuUl>
          {paths.map((path) => (
            <PathItem key={path.to} isActive={`/${path.to}` === pathname}>
              <Link to={path.to}>{path.pathName}</Link>
            </PathItem>
          ))}
        </MenuUl>
        <MenuUl>
          {Icons.map(({ pathName, to }) => (
            <PathItem key={to} isActive={`/${to}` === pathname}>
              <Link to={to}>
                <PathName>{pathName}</PathName>
                <PathIcon src={`/images/${to}.png`} alt="" />
              </Link>
            </PathItem>
          ))}
          <PathItem>
            {!userId ? (
              <Link to={"/login"}>
                <PathName>로그인</PathName>
                <PathIcon src={`/images/login.png`} alt="" />
              </Link>
            ) : (
              <LogoutBtn onClick={onLogOut}>
                <PathName>로그아웃</PathName>
                <PathIcon src={`/images/login.png`} alt="" />
              </LogoutBtn>
            )}
          </PathItem>
        </MenuUl>
        <MobileMenu>
          {openMobileMenu ? (
            <Mgnb
              paths={[...paths, ...Icons]}
              closeMenu={() => setOpenMobileMenu(false)}
            />
          ) : (
            <button onClick={() => setOpenMobileMenu(() => true)}>
              <MenuIcon src={`/images/${"menu"}.svg`} alt="" />
            </button>
          )}
        </MobileMenu>
      </MenuWrap>
    </Navbar>
  );
};

export default memo(Gnb);

// const flexBox = st;

const Navbar = styled.nav`
  position: fixed;
  height: 8vh;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: rgba(28, 39, 51, 255);
  z-index: 10;
  display: flex;
  align-items: center;
`;

const MenuWrap = styled.div<{ openM: boolean }>`
  width: 100%;
  height: 8vh;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ul:nth-child(2) {
    justify-content: flex-end;
  }
  @media screen and (max-width: 720px) {
    justify-content: baseline;
    > ul {
      display: none;
    }
    > div {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
  }
`;

const MenuUl = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
  :hover {
    color: #fff;
  }
`;

const PathItem = styled.li<{ isActive?: boolean }>`
  a {
    color: rgb(156 163 175);
    font-size: 1.2rem;
    font-weight: 300;
    color: ${({ isActive }) => (isActive ? "#fff" : "rgb(156 163 175)")};
    display: flex;
    align-items: center;
  }
`;

const PathName = styled.span`
  color: #fff;
  font-size: 0.8rem;
  font-weight: 300;
`;

const MobileMenu = styled.div`
  display: none;
  @media screen and (max-width: 720px) {
  }
`;

const BaseImgIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
  background-color: rgba(255, 255, 255, 0.7);
  margin-left: 0.5rem;
  border: 0.1px solid #fff;
  border-radius: 32px;
  padding: 0.15rem;
`;

const PathIcon = styled(BaseImgIcon)``;

const MenuIcon = styled(BaseImgIcon)`
  width: 36px;
  height: 36px; ;
`;

const Home = styled.h4`
  font-size: 1.1rem;
  font-weight: 500;
  color: #fff;
`;

const LogoutBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
`;
