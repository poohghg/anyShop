import styled, { keyframes } from "styled-components";

export const FadeIn = keyframes`
    0% {
      opacity: 0;
      transform: scale(0.99);
    }
    50% {
      opacity: 35%;
    }
    100% {
      opacity: 100%;
      transform: scale(1);
    }
`;

const d = styled.div`
  /* transform: scale3d(); */
  transform: scale() () (0.9);
`;
