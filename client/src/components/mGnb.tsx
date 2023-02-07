import { SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled, { css, keyframes } from "styled-components";
import { Path } from "./gnb";
import Modal from "./modal";

interface MgnbProps {
  paths: Path[];
  closeMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const Mgnb = ({ paths, closeMenu }: MgnbProps) => {
  const navigate = useNavigate();
  const [isClose, setIsClose] = useState(false);
  const closeModal = () => setIsClose(true);

  const linkTo = (path: string) => {
    closeModal();
    navigate(path);
  };

  const onAnimationEnd = () => {
    if (isClose) closeMenu(true);
  };

  return (
    <Modal togleModal={closeModal}>
      <Wrap isClose={isClose} onAnimationEnd={onAnimationEnd}>
        <MenuUl>
          {paths.map(({ to, pathName }) => (
            <PathItem key={to}>
              <button onClick={() => linkTo(to)}>{pathName}</button>
            </PathItem>
          ))}
        </MenuUl>
      </Wrap>
    </Modal>
  );
};

export default Mgnb;

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
  position: fixed;
  top: 7.5vh;
  width: 100%;
  height: 92.5vh;
  overflow: auto;
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
  /* justify-content: center; */
  gap: 1rem;

  z-index: 15;
`;

const PathItem = styled.li<{ isActive?: boolean }>`
  a {
    color: rgb(156 163 175);
    font-size: 1.2rem;
    font-weight: 300;
    color: rgba(28, 39, 51, 255);
    display: flex;
    align-items: center;
  }
  a:hover {
    font-size: 1.5rem;
  }
`;
