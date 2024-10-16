import { Box, Container, Grow, Paper, Typography } from "@mui/material";
import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
// import required modules
import { EffectCube, Pagination } from "swiper/modules";
import { CubeSwiper } from "../../components";

const icon = (
  <Paper sx={{ m: 1, width: 100, height: 100 }} elevation={4}>
    <svg>
      <Box
        component="polygon"
        points="0,100 50,00, 100,100"
        sx={{
          fill: (theme) => theme.palette.common.white,
          stroke: (theme) => theme.palette.divider,
          strokeWidth: 1,
        }}
      />
    </svg>
  </Paper>
);

const values = [
  {
    title: "Expertise",
    body: "Our team comprises experts in automation, robotics, and controls, ensuring that your projects are handled by professionals with in-depth knowledge and experience",
  },
];

const About = () => {
  const [visible, setVisible] = useState(false);

  const handleVisible = (isVisible) => {
    setVisible(isVisible);
  };

  console.log(visible);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: "2rem",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Typography sx={{ textAlign: "center" }} variant="h2">
          Why Choose Lemon Robotics?
        </Typography>
        <CubeSwiper />
      </Box>
      <Box>
        <Grow in={visible}>{icon}</Grow>
      </Box>
    </>
  );
};

export default About;
