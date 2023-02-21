import { useEffect, useRef } from "react";
import lottie from "lottie-web";
import Person from "../../lotties/person.json";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { RootState } from "../../redux";

const MainProfile = () => {
  const nickName = useSelector((root: RootState) => root.userReducer.nickName);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: Person,
    });
  }, [containerRef.current]);

  return (
    <Wrap>
      <Container ref={containerRef} id="container" />
      <User>
        <p>안녕하세요</p>
        <p>{nickName || "손"}님</p>
      </User>
    </Wrap>
  );
};

export default MainProfile;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
`;

const Container = styled.div`
  width: 12vh;
  height: 12vh;
  overflow: hidden;
`;

const User = styled.div`
  padding-left: 6px;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  align-self: flex-end;
  p:nth-child(1) {
    padding-bottom: 5px;
    color: #aaa;
    font-size: 1.2rem;
    font-weight: 400;
  }
  p:nth-child(2) {
    color: #000;
    font-size: 2rem;
    font-weight: 500;
  }
`;
