import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCube, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const styles = {
  swiperSlide: {
    backgroundPosition: "center",
    backgroundSize: "cover",
  },

  swiperSlideImg: {
    display: "block",
    width: "100%",
  },

  swiper: {
    width: "300px",
    height: "300px",
    position: "relative",
  },
};

const CubeSwiper = ({ handleVisible }) => {
  return (
    <>
      <Swiper
        style={styles.swiper}
        effect={"cube"}
        grabCursor={true}
        autoplay
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
          autoplay: {
            delay: 2000,
          },
        }}
        pagination={true}
        modules={[Autoplay, EffectCube, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide
          onClick={() => handleVisible(true)}
          style={styles.swiperSlide}
        >
          <img
            style={styles.swiperSlideImg}
            src="https://swiperjs.com/demos/images/nature-1.jpg"
          />
        </SwiperSlide>
        <SwiperSlide style={styles.swiperSlide}>
          <img
            style={styles.swiperSlideImg}
            src="https://swiperjs.com/demos/images/nature-2.jpg"
          />
        </SwiperSlide>
        <SwiperSlide style={styles.swiperSlide}>
          <img
            style={styles.swiperSlideImg}
            src="https://swiperjs.com/demos/images/nature-3.jpg"
          />
        </SwiperSlide>
        <SwiperSlide style={styles.swiperSlide}>
          <img
            style={styles.swiperSlideImg}
            src="https://swiperjs.com/demos/images/nature-4.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default CubeSwiper;
