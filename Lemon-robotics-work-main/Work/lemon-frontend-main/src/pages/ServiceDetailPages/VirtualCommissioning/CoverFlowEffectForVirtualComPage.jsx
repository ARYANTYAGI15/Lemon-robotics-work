import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./virtualcomstyles.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

// Define an array of services to display
const services = [
  {
    name: "Software Development",
    description:
      "We offer custom software solutions for web, mobile, and desktop platforms.",
    image: "software.jpg",
    url: "https://example.com/software",
  },
  {
    name: "Training and Education",
    description:
      "We provide online and offline courses, workshops, and certifications for various skills and domains.",
    image: "training.jpg",
    url: "https://example.com/training",
  },
  {
    name: "Recruitment and Staffing",
    description:
      "We help you find the best talent for your organization, whether it's permanent, contract, or freelance.",
    image: "recruitment.jpg",
    url: "https://example.com/recruitment",
  },
  // Add more services as needed
];

// Define a function component to render the service card
const ServiceCard = ({ service }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={service.image}
        alt={service.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {service.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {service.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={service.url}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default function CoverFlowEffectForVirtualComPage() {
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
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {services.map((service, index) => (
          <SwiperSlide key={index}>
            <ServiceCard service={service} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
