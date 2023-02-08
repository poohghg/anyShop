import styled, { keyframes } from "styled-components";

export const FadeIn = keyframes`
    0% {
      opacity: 0;
    }
    50% {
      opacity: 35%;
    }
    100% {
      opacity: 100%;
    }
`;

const d = styled.div`
  /* transform: scale3d(); */
  transform: scale() () (0.9);
`;
