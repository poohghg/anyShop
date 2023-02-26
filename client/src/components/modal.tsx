import { memo, ReactNode } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

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
  toggleModal,
}: {
  children: ReactNode;
  toggleModal: () => void;
}) => {
  return (
    <Portal>
      <Overlay>
        {children}
        <Dim onClick={toggleModal} />
      </Overlay>
    </Portal>
  );
};

export default memo(Modal);

const Overlay = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dim = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
