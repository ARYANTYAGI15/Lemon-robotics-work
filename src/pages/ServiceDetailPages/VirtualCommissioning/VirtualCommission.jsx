import React from "react";
import virtualcomm from "../../../assets/images_youtube/img-home.jpg";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import CoverFlowEffectForVirtualComPage from "./CoverFlowEffectForVirtualComPage";
import FeaturesGridForVirtualCom from "./FeaturesGridForVirtualCom";

const classes = {
  root: {
    backgroundImage: "url(https://source.unsplash.com/featured/?robotics)",
    backgroundSize: "cover",
    padding: 4,
    margin: 2,
  },
  title: {
    fontWeight: "bold",
    fontSize: "3rem",
    color: "white",
    textShadow: "2px 2px 4px black",
  },
  subtitle: {
    fontWeight: "lighter",
    fontSize: "1.5rem",
    color: "white",
    textShadow: "1px 1px 2px black",
  },
  content: {
    fontWeight: "normal",
    fontSize: "1rem",
    color: "white",
    textShadow: "1px 1px 2px black",
  },
};

const InfoSection = () => {
  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.title}>
          Robotics
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h2" className={classes.subtitle}>
          What is robotics?
        </Typography>
        <Typography variant="body1" className={classes.content}>
          Robotics is the branch of engineering and science that deals with the
          design, construction, operation, and application of robots. Robots are
          machines that can perform tasks that are usually done by humans or
          animals, such as moving, sensing, manipulating, or communicating.
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="h2" className={classes.subtitle}>
          Why is robotics important?
        </Typography>
        <Typography variant="body1" className={classes.content}>
          Robotics is important because it can improve the quality of life,
          productivity, and efficiency of various domains, such as
          manufacturing, agriculture, health care, education, entertainment, and
          more. Robots can also help humans in dangerous, tedious, or complex
          tasks, such as exploring space, defusing bombs, or performing surgery.
        </Typography>
      </Grid>
    </Grid>
  );
};

const IntroSlides = ({ place }) => {
  console.log(place);
  return (
    <>
      <Paper
        sx={{
          position: "relative",
          backgroundColor: "grey.800",
          color: "#fff",
          mb: 4,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${virtualcomm})`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {
          <img
            style={{ display: "none" }}
            src={virtualcomm}
            alt="virtualcomm"
          />
        }
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.3)",
          }}
        />
        <Grid container sx={{ display: "flex", justifyContent: { place } }}>
          <Grid item md={6}>
            <Box
              sx={{
                position: "relative",
                p: { xs: 3, md: 6 },
                pr: { md: 0 },
              }}
            >
              <Typography
                component="h1"
                variant="h1"
                color="inherit"
                gutterBottom
              >
                Virtual Commissioning
              </Typography>
              <Typography variant="h2" color="inherit" paragraph>
                is proving to be the solution to optimize operations and
                overcome the challenges of traditional commissioning.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

// Define a function component to render the product section
const ProductSection = ({ name, slogan, image, learnMore, buy }) => {
  return (
    <Box sx={{ p: 4, bgcolor: "background.paper" }}>
      <Typography variant="h3" component="h2" gutterBottom>
        {name}
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        {slogan}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button variant="contained" color="primary" href={learnMore}>
          Learn more
        </Button>
        <Button variant="outlined" color="primary" href={buy}>
          Buy
        </Button>
        <img src={image} alt={name} width="400" height="300" />
      </Box>
    </Box>
  );
};

const VirtualCommission = () => {
  return (
    <>
      <Grid
        container
        rowSpacing={3}
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <InfoSection />
        <Grid item xs={12}>
          <IntroSlides place="flex-end" />
        </Grid>
        <Grid item>
          <FeaturesGridForVirtualCom />
          <Grid item>
            <CoverFlowEffectForVirtualComPage />
          </Grid>
          <IntroSlides place="flex-end" />
        </Grid>
      </Grid>
    </>
  );
};

export default VirtualCommission;
