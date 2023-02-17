import { Swiper as SwiperR, SwiperSlide } from "swiper/react";
import Swiper from "swiper";
import { Product } from "../../graphql/gqlProduct";
import SwiperItem from "./swiperItem";
import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import { useState } from "react";

interface MainSwiperProps {
  data: Product[];
  label: string;
}

const MainSwiper = ({ data, label }: MainSwiperProps) => {
  const [swiper, setSwiper] = useState<Swiper>();

  const handelNextSlide = () => {
    if (swiper) {
      swiper.slideTo(0);
      // swiper.slideNext(3);
    }
  };

  return (
    <Wrap>
      <FlexBox>
        <Label>{label}</Label>
        <div>
          {/* <button>{"<"}</button> */}
          <button onClick={handelNextSlide}>{">"}</button>
        </div>
      </FlexBox>
      <SwiperR
        className="mainSwiper"
        spaceBetween={25}
        slidesPerView={3.5}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(s) => setSwiper(s)}
        centeredSlides={false}
      >
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <SwiperItem {...product} />
          </SwiperSlide>
        ))}
      </SwiperR>
    </Wrap>
  );
};
export default MainSwiper;

const Wrap = styled.div`
  /* margin-top: 2vh; */
`;

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`;

const Label = styled.h2`
  font-size: 1.4rem;
  font-weight: 450;
  margin-bottom: 1rem;
`;
