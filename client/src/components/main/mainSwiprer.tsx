import { Swiper as SwiperR, SwiperSlide } from "swiper/react";
import Swiper from "swiper";
import { Product } from "../../graphql/gqlProduct";
import SwiperItem from "./swiperItem";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import { useCallback, useState } from "react";
import { log } from "console";
import { LeftMark, RightMark } from "../../style/icons/icons";

interface MainSwiperProps {
  data: Product[];
  label: string;
  cntLabel?: string;
}

const MainSwiper = ({ data, label, cntLabel }: MainSwiperProps) => {
  const [swiper, setSwiper] = useState<Swiper>();

  const handelNextSlide = useCallback(
    (to: string) => {
      if (swiper) {
        if (to === "next") swiper.slideNext(300);
        else swiper.slidePrev(300);
      }
    },
    [swiper],
  );

  return (
    <Wrap>
      <FlexBox>
        <Label>{label}</Label>
        <ButtonBox>
          <Button onClick={() => handelNextSlide("prev")}>
            <LeftMark />
          </Button>
          <Button onClick={() => handelNextSlide("next")}>
            <RightMark />
          </Button>
        </ButtonBox>
      </FlexBox>
      <SwiperR
        className="mainSwiper"
        spaceBetween={30}
        slidesPerView={3.5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(s) => setSwiper(s)}
        centeredSlides={false}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <SwiperItem {...product} cntLabel={cntLabel} />
          </SwiperSlide>
        ))}
      </SwiperR>
    </Wrap>
  );
};
export default MainSwiper;

const Wrap = styled.div`
  & + & {
    margin-top: 3rem;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* padding-left: 1.5rem; */
  padding: 0 1.5rem;
  margin-bottom: 1rem;
`;

const Label = styled.h2`
  font-size: 1.4rem;
  font-weight: 450;
`;

const ButtonBox = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  & + & {
    margin-left: 0.5rem;
  }
`;
