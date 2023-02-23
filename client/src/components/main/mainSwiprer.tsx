import { Swiper as SwiperR, SwiperSlide } from "swiper/react";
import Swiper from "swiper";
import { Product } from "../../graphql/gqlProduct";
import SwiperItem from "./swiperItem";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import { useCallback, useState } from "react";
import { LeftMark, RightMark } from "../../style/icons/icons";
import SkleSwiperItem from "./skleSwiperItem";

interface MainSwiperProps {
  data: Product[];
  label: string;
  cntLabel?: string;
  isSuccess: boolean;
}

const MainSwiper = ({ data, label, cntLabel, isSuccess }: MainSwiperProps) => {
  const [swiper, setSwiper] = useState<Swiper>();
  const [swiperLoc, setSwiperLoc] = useState({
    isBeginning: true,
    isEnd: data?.length < 4 ? true : false,
  });

  const handelNextSlide = useCallback(
    (to: string) => {
      if (swiper) {
        if (to === "next") swiper.slideNext(300);
        else swiper.slidePrev(300);
      }
    },
    [swiper],
  );

  const onSlideChange = useCallback(
    (swiper: Swiper) => {
      if (
        swiperLoc.isBeginning !== swiper.isBeginning ||
        swiperLoc.isEnd !== swiper.isEnd
      ) {
        const { isBeginning, isEnd } = swiper;
        setSwiperLoc({ isBeginning, isEnd });
      }
    },
    [swiperLoc, swiper],
  );

  if (isSuccess && !data.length) return null;
  return (
    <Wrap>
      <FlexBox>
        <Label>{label}</Label>
        <ButtonBox>
          <Button
            disabled={swiperLoc.isBeginning}
            onClick={() => handelNextSlide("prev")}
          >
            <LeftMark unActive={swiperLoc.isBeginning} />
          </Button>
          <Button
            disabled={swiperLoc.isEnd}
            onClick={() => handelNextSlide("next")}
          >
            <RightMark unActive={swiperLoc.isEnd} />
          </Button>
        </ButtonBox>
      </FlexBox>
      <SwiperR
        className="mainSwiper"
        spaceBetween={15}
        slidesPerView={3.3}
        onSlideChange={onSlideChange}
        onSwiper={(s) => setSwiper(s)}
        centeredSlides={false}
      >
        {isSuccess
          ? data.map((product) => (
              <SwiperSlide key={product.id}>
                <SwiperItem {...product} cntLabel={cntLabel} />
              </SwiperSlide>
            ))
          : Array.from({ length: 5 }).map((_, i) => (
              <SwiperSlide key={i}>
                <SkleSwiperItem />
              </SwiperSlide>
            ))}
      </SwiperR>
    </Wrap>
  );
};
export default MainSwiper;

const Wrap = styled.div`
  & + & {
    margin-top: 5rem;
  }
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
