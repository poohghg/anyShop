import Lottie from "lottie-web";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ScrollTop from "../lotties/scrollTop.json";

const ScrollToTopBtn = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isShow, setIsShow] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    Lottie.loadAnimation({
      container: ref.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: ScrollTop,
    });

    const root = document.querySelector("#main") as HTMLDivElement;
    window.addEventListener("scroll", () => {
      if (window.scrollY > 5) setIsShow(true);
      else setIsShow(false);
    });
  }, [ref.current]);

  console.log(isShow);
  return (
    <Wrap isShow={isShow}>
      <Button
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
        ref={ref}
      />
    </Wrap>
  );
};

export default ScrollToTopBtn;

const Wrap = styled.div<{ isShow: boolean }>`
  display: ${({ isShow }) => (isShow ? "flex" : "none")};
  position: fixed;
  right: 1.5rem;
  bottom: 2rem;
  border: 2px solid#aaa;
  border-radius: 50%;
  overflow: hidden;
  padding: 0.3rem;
  z-index: 1;
  background-color: #fff;
  box-shadow: 8px 16px 16px hsl(0deg 0% 0% / 0.25);
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 4.5vh;
  height: 4.5vh;
`;
