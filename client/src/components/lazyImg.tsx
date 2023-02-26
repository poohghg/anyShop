import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import styled, { css } from "styled-components";
import { FadeIn } from "../style/animataion";

interface LazyImgProps {
  src: string;
  alt?: string;
  height?: number;
  width?: number;
  style?: {};
  pOtion?: {};
}

const LazyImg = React.memo(
  ({ src, alt, height, width, style, pOtion }: LazyImgProps) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const observerRef = useRef<IntersectionObserver>();
    const [isLoad, setIsLoad] = useState(false);

    const getObserver = useCallback(() => {
      const options = {
        threshold: 0.01,
        ...pOtion,
      };

      const callBack = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver,
      ) => {
        entries.some((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLImageElement;
            const image = new Image();
            image.src = target.dataset!.src as string;
            target.src = image.src;
            image.onload = () => setIsLoad(true);
            // target요소가 관찰되면 관찰을끝낸다.
            observer.unobserve(target);
          }
          return null;
        });
      };

      if (!observerRef.current)
        observerRef.current = new IntersectionObserver(callBack, options);
      return observerRef.current;
    }, [observerRef.current]);

    useEffect(() => {
      if (imgRef.current) getObserver().observe(imgRef.current);
      return () => getObserver().disconnect();
    }, [imgRef.current]);

    return (
      <InviewImage
        ref={imgRef}
        isLoad={isLoad}
        data-src={src}
        alt={alt ?? "image"}
        height={height}
        width={width ?? height}
        style={style}
        src="/images/place.png"
      />
    );
  },
);

export default memo(LazyImg);

const InviewImage = styled.img<{ isLoad: boolean }>`
  /* ${({ isLoad }) =>
    isLoad &&
    css`
      animation: ${FadeIn} 0.2s ease-out 0s;
    `} */
`;
