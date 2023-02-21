import styled, { keyframes } from "styled-components";

interface AniLoadingProps {
  backgroundColor?: "white" | "black";
}

const AniLoading = ({ backgroundColor = "white" }: AniLoadingProps) => (
  <Main backgroundColor={backgroundColor}>
    <Wrap backgroundColor={backgroundColor}>
      <FirstSpan />
      <SecondSpan />
      <ThirdSpan />
      <LastSpan />
    </Wrap>
  </Main>
);

export default AniLoading;

const firstTrans = `translate3d(0px, 0px, 0px) scale(1)`;
const secondTrans = `translate3d(24px, 0px, 2px) scale(1)`;
const thirdTrans = `translate3d(48px, 0px, 0px) scale(1)`;
const lastTrans = `translate3d(24px, 0px, -2px) scale(0.3)`;

const first = keyframes`
  0%{ transform : ${firstTrans}}
  25%{ transform: ${secondTrans} }
  50%{ transform: ${thirdTrans} }
  75%{ transform: ${lastTrans} }
  100%{ transform: ${firstTrans} }
`;

const second = keyframes`
  0%{ transform : ${secondTrans}}
  25%{ transform: ${thirdTrans} }
  50%{ transform: ${lastTrans} }
  75%{ transform: ${firstTrans} }
  100%{ transform: ${secondTrans} }
`;

const third = keyframes`
  0%{ transform : ${thirdTrans}}
  25%{ transform: ${lastTrans} }
  50%{ transform: ${firstTrans} }
  75%{ transform: ${secondTrans} }
  100%{ transform: ${thirdTrans} }
`;

const last = keyframes`
  0%{ transform : ${lastTrans}}
  25%{ transform: ${firstTrans} }
  50%{ transform: ${secondTrans} }
  75%{ transform: ${thirdTrans} }
  100%{ transform: ${lastTrans} }
`;

// 부요요소를 perspective 속성값을 주어 3D형태로 표현
// 자식요소에 zindex값을주어 거리감을 표현할 수 있음.

const Main = styled.div<{ backgroundColor: "white" | "black" }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;

  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  background-color: ${({ backgroundColor }) =>
    backgroundColor === "white" ? "#fff" : "#000"};
`;

const Wrap = styled.div<{ backgroundColor: "white" | "black" }>`
  background-color: inherit;
  z-index: 25;
  width: 60px;
  height: 12px;
  position: relative;
  perspective: 300px;
  perspective-origin: center top;
  > div {
    position: absolute;
    left: 0;
    top: 0;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    perspective-origin: center;
    transform-origin: left center;
    animation-timing-function: cubic-bezier(0, 1, 1, 1, 0);
    animation-duration: 1.8s;
    animation-iteration-count: infinite;
  }
`;
const FirstSpan = styled.div`
  background-color: orange;
  animation: ${first};
`;

const SecondSpan = styled.div`
  background-color: #00b7ff;
  animation: ${second};
`;

const ThirdSpan = styled.div`
  background-color: orange;
  animation: ${third};
`;

const LastSpan = styled.div`
  background-color: #9900ff;
  animation: ${last};
`;
