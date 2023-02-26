import { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { Path } from "./gnb";
import Modal from "./modal";

interface MgnbProps {
  paths: Path[];
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string | undefined;
}

const Mgnb = ({ paths, closeMenu, userId }: MgnbProps) => {
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);
  const closeModal = () => setIsClose(true);
  const handleLink = useCallback(() => closeModal(), []);

  const onAnimationEnd = () => {
    if (isClose) closeMenu(true);
  };

  return (
    <Modal toggleModal={closeModal}>
      <Wrap isClose={isClose} onAnimationEnd={onAnimationEnd}>
        <CloseBtn onClick={closeModal}>x</CloseBtn>
        <MenuUl>
          {paths.map(({ to, pathName }) =>
            !!userId && to === "singUp" ? null : (
              <PathItem key={to}>
                <Link to={to} onClick={handleLink}>
                  {pathName}
                </Link>
              </PathItem>
            ),
          )}
        </MenuUl>
      </Wrap>
    </Modal>
  );
};

export default memo(Mgnb);

const show = keyframes`
  from {transform: translateY(100vh);  opacity: 0;}
  to {transform: translateY(0);  opacity: 1;}
`;

const close = keyframes`
  from {transform: translateY(0vh);  opacity: 1;}
  to {transform: translateY(100vh);  opacity: 0;}
`;

const Wrap = styled.div<{ isClose: boolean }>`
  animation: ${show} 0.2s ease-in forwards;
  position: relative;
  width: 100%;
  margin-top: 7vh;
  height: 93vh;
  border: 1px solid;
  border-radius: 12px;
  z-index: 15;
  background-color: #fff;
  ${({ isClose }) =>
    isClose &&
    css`
      animation: ${close} 0.2s ease-in forwards;
    `}
`;

const MenuUl = styled.ul`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  z-index: 15;
`;

const PathItem = styled.li<{ isActive?: boolean }>`
  padding: 0.5rem 0;
  a {
    color: #000;
    font-size: 1.5rem;
    font-weight: 400;
    cursor: pointer;
  }
`;

const CloseBtn = styled.button`
  position: fixed;
  top: -4.5vh;
  left: 50%;
  transform: translateX(-50%);
  height: 32px;
  width: 32px;
  background-color: #fff;
  border-radius: 50%;
  z-index: 20;
`;
