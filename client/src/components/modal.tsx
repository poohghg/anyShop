import { ReactNode } from "react";
import { createPortal } from "react-dom";
import styled, { keyframes } from "styled-components";

const Portal = ({
  children,
  selectors = "modal",
}: {
  children: ReactNode;
  selectors?: string;
}) => {
  const container = document.getElementById(selectors);
  return createPortal(children, container!);
};

const Modal = ({
  children,
  togleModal,
}: {
  children: ReactNode;
  togleModal: () => void;
}) => {
  return (
    <Portal>
      <Overlay>
        <Container>{children}</Container>
        <Dim />
      </Overlay>
    </Portal>
  );
};

export default Modal;

const show = keyframes`
  from {transform: translateY(100vh);}
  to {transform: translateY(0);}
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  animation: ${show} 0.3s ease-in forwards;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
