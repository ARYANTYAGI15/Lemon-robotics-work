import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Grow,
  Slide,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import serviceVideo from "../../assets/videos/video-2.mp4";
// import serviceVideo from "../../assets/videos/virtualcomvideo.mp4";
import serviceImage from "../../assets/images_youtube/img-2.jpg";
import { CoverFlowEffectForAllServicePage, TopVideo } from "../../components";

const services = [
  {
    serviceName: "Mechanical Design and Detailing",
    serviceNameGerman: "Mechanisches Design und Detaillierung",
    serviceNameSpanish: "Diseño mecánico y detallado",
    serviceImgOne: "https://swiperjs.com/demos/images/nature-1.jpg",
    serviceImgTwo: "https://swiperjs.com/demos/images/nature-3.jpg",
    serviceHeadingOne:
      "Our team of experienced engineers and designers is adept at creating precise and optimized mechanical designs for various automation projects.",
    serviceHeadingTwo:
      "We ensure that every detail is carefully considered, from concept to execution.",
  },

  {
    serviceName: "Controls Design and Development",
    serviceNameGerman: "Design und Entwicklung von Steuerungen",
    serviceNameSpanish: "Diseño y Desarrollo de Controles",
    serviceImgOne: "https://swiperjs.com/demos/images/nature-1.jpg",
    serviceImgTwo: "https://swiperjs.com/demos/images/nature-3.jpg",
    serviceHeadingOne:
      "Our expertise in controls engineering enables us to develop robust and reliable control systems tailored to your automation requirements.",
    serviceHeadingTwo:
      "We work with the latest technologies to create efficient and seamless control solutions",
  },
];

const AllServicePage = () => {
  const [activeDiv, setActiveDiv] = useState(0);
  const [checked, setchecked] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveDiv((prev) => (prev + 1) % 3);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <TopVideo video={serviceVideo} />
        {/* <Grid item lg={12} sm={6} sx={{ height: 500 }}>
          <CardMedia
            sx={{ objectFit: "cover", width: "100%", height: "100%" }}
            component="video"
            src={serviceVideo}
            autoPlay
            loop
            muted
          />
        </Grid> */}

        {services.map((service) => (
          <>
            <Grid
              container
              xs
              sx={{ flexDirection: { xs: "column", md: "row" } }}
            >
              <Grid
                item
                xs
                sx={{
                  height: 500,
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {
                  <Box
                    sx={{
                      minHeight: "100px",
                      maxHeight: "100px",
                    }}
                  >
                    <Slide
                      direction="right"
                      in={activeDiv === 0 ? true : false}
                      timeout={2000}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          display: activeDiv === 0 ? "flex" : "none",
                          textAlign: "center",
                          objectFit: "contain",
                        }}
                      >
                        {service.serviceName}
                      </Typography>
                    </Slide>
                    <Slide
                      direction="right"
                      in={activeDiv === 1 ? true : false}
                      timeout={2000}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          display: activeDiv === 1 ? "flex" : "none",
                          textAlign: "center",
                          objectFit: "contain",
                        }}
                      >
                        {service.serviceNameGerman}
                      </Typography>
                    </Slide>
                    <Slide
                      direction="right"
                      in={activeDiv === 2 ? true : false}
                      timeout={2000}
                    >
                      <Typography
                        variant="h2"
                        sx={{
                          display: activeDiv === 2 ? "flex" : "none",
                          textAlign: "center",
                          objectFit: "contain",
                        }}
                      >
                        {service.serviceNameSpanish}
                      </Typography>
                    </Slide>
                  </Box>
                }
              </Grid>
              <Grid
                item
                xs
                sx={{
                  height: "400px",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CoverFlowEffectForAllServicePage
                  serviceImgOne={service.serviceImgOne}
                  serviceImgTwo={service.serviceImgTwo}
                  serviceHeadingOne={service.serviceHeadingOne}
                  serviceHeadingTwo={service.serviceHeadingTwo}
                />
              </Grid>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default AllServicePage;
