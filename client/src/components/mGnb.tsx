import { SyntheticEvent, useCallback, useState } from "react";
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

  const linkTo = useCallback((path: string) => {
    closeModal();
    navigate(path);
  }, []);

  const onAnimationEnd = () => {
    if (isClose) closeMenu(true);
  };

  return (
    <Modal toggleModal={closeModal}>
      <Wrap isClose={isClose} onAnimationEnd={onAnimationEnd}>
        <CloseBtn onClick={closeModal}>x</CloseBtn>
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
  position: relative;
  width: 100%;
  margin-top: 7vh;
  height: 93vh;
  /* overflow: auto; */
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
  button {
    font-size: 1.1rem;
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
