import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

import slide_image_1 from "../../assets/slide_images/img_1.jpg";
import slide_image_2 from "../../assets/slide_images/img_1.jpg";
import slide_image_3 from "../../assets/slide_images/img_1.jpg";
import slide_image_4 from "../../assets/slide_images/img_1.jpg";
import slide_image_5 from "../../assets/slide_images/img_1.jpg";
import slide_image_6 from "../../assets/slide_images/img_1.jpg";
import slide_image_7 from "../../assets/slide_images/img_1.jpg";

import "./coverflow.css";
import { Card, CardContent, Container, Typography } from "@mui/material";
import SwiperCard from "../Card/SwiperCard";

const CoverFlowEffectForAllServicePage = ({
  serviceImgOne,
  serviceImgTwo,
  serviceHeadingOne,
  serviceHeadingTwo,
}) => {
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        initialSlide={1}
        coverflowEffect={{
          rotate: 50,
          stretch: 25,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={serviceImgOne} />
        </SwiperSlide>
        <SwiperSlide>
          <SwiperCard
            serviceHeadingOne={serviceHeadingOne}
            serviceHeadingTwo={serviceHeadingTwo}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={serviceImgTwo} />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CoverFlowEffectForAllServicePage;
