import Lottie, { AnimationItem } from "lottie-web";
import { memo, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import ScrollTop from "../lotties/scrollTop.json";

const ScrollToTopBtn = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const instance = useRef<AnimationItem>();
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    if (!instance.current)
      instance.current = Lottie.loadAnimation({
        container: ref.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: ScrollTop,
      });

    let prevY = 0;
    const pageY = document.querySelector("#root") as HTMLElement;
    window.addEventListener("scroll", () => {
      if (window.innerHeight + window.scrollY === pageY.scrollHeight)
        setIsShow(true);
      else if (window.scrollY - prevY > 0 || window.scrollY === 0)
        setIsShow(false);
      else setIsShow(true);
      prevY = window.scrollY;
    });
  }, [ref.current]);

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

export default memo(ScrollToTopBtn);

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
  box-shadow: 1px 16px 16px hsl(0deg 0% 0% / 0.25);
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  width: 4.5vh;
  height: 4.5vh;
`;
