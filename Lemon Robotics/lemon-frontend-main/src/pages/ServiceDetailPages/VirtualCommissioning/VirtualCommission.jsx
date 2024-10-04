import { Box, Grid, Slide, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import virtualcomm from "../../../assets/images_youtube/img-home.jpg";
import FeaturesGridForVirtualCom from "./FeaturesGridForVirtualCom";
import CoverFlowEffectForVirtualComPage from "./CoverFlowEffectForVirtualComPage";

// Language options
const languageOptions = [
  {
    title: "",
    description:
      "Virtual Commissioning is the process of testing, validating, and optimizing control systems in a virtual environment before deployment to the actual physical system.",
    description2:
      "It allows engineers to identify potential issues, optimize processes, and reduce commissioning time and costs.",
  },
  {
    title: "",
    description:
      "Die virtuelle Inbetriebnahme ist der Prozess des Testens, Validierens und Optimierens von Steuerungssystemen in einer virtuellen Umgebung vor der Implementierung im physischen System.",
    description2:
      "Es ermöglicht Ingenieuren, potenzielle Probleme zu erkennen, Prozesse zu optimieren und die Inbetriebnahmezeit und -kosten zu reduzieren.",
  },
  {
    title: "",
    description:
      "El Comisionado Virtual es el proceso de probar, validar y optimizar sistemas de control en un entorno virtual antes de la implementación en el sistema físico.",
    description2:
      "Permite a los ingenieros identificar posibles problemas, optimizar los procesos y reducir el tiempo y los costos de la puesta en marcha.",
  },
];

// Custom styles for layout and design
const classes = {
  root: {
    marginTop: "500px", // Adjust this value based on your navbar height to prevent overlap
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: "3rem",
    color: "#333",
  },
  subtitle: {
    fontWeight: "lighter",
    fontSize: "1.5rem",
    color: "#666",
  },
  content: {
    fontWeight: "normal",
    fontSize: "1rem",
    color: "#444",
    marginTop: "10px",
  },
  slideContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px 0",
  },
};

// InfoSection Component (using Slide animation)
const InfoSection = ({ activeDiv }) => {
  return (
    <Grid container className={classes.root}>
      <Slide direction="left" in={true} timeout={1000} mountOnEnter unmountOnExit>
        <Grid item xs={12} className={classes.slideContainer}>
          <Typography variant="h1" className={classes.title}>
            {languageOptions[activeDiv].title}
          </Typography>
        </Grid>
      </Slide>
      <Slide direction="right" in={true} timeout={1500} mountOnEnter unmountOnExit>
        <Grid mt={4} xs={12} md={6}>
          <Typography variant="h2" className={classes.subtitle}>
            What is Virtual Commissioning?
          </Typography>
          <Typography variant="body1" className={classes.content}>
            {languageOptions[activeDiv].description}
          </Typography>
        </Grid>
      </Slide>
      <Slide direction="left" in={true} timeout={2000} mountOnEnter unmountOnExit>
        <Grid item xs={12} md={6} mt={4}>
          <Typography variant="h2" className={classes.subtitle}>
            Why is Virtual Commissioning important?
          </Typography>
          <Typography variant="body1" className={classes.content}>
            {languageOptions[activeDiv].description2}
          </Typography>
        </Grid>
      </Slide>
    </Grid>
  );
};

// IntroSlides Component (for title and image background)
const IntroSlides = ({ activeDiv }) => {
  return (
    <Box
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
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ position: "relative", p: { xs: 3, md: 6 }, textAlign: "center" }}>
            <Slide direction="left" in={true} timeout={1000}>
              <Typography component="h1" variant="h1" color="inherit" gutterBottom>
                {languageOptions[activeDiv].title}
              </Typography>
            </Slide>
            <Slide direction="right" in={true} timeout={1500}>
              <Typography variant="h2" color="inherit" paragraph>
                Optimizing operations and overcoming challenges of traditional commissioning.
              </Typography>
            </Slide>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

// Main VirtualCommission Component
const VirtualCommission = () => {
  const [activeDiv, setActiveDiv] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveDiv((prev) => (prev + 1) % languageOptions.length);
    }, 5000); // Change language every 5 seconds

    return () => clearInterval(intervalId);
  }, []);


  return (
    <>
      <Grid container rowSpacing={3} sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* InfoSection Component: Dynamic language with slide animations */}
        <InfoSection activeDiv={activeDiv} />

        {/* IntroSlides: Displaying title and background image */}
        <Grid item xs={12}>
          <IntroSlides activeDiv={activeDiv} />
        </Grid>

        {/* Features grid and coverflow effect components */}
        <Grid item xs={12}>
          <FeaturesGridForVirtualCom />
        </Grid>
        <Grid item xs={12}>
          <CoverFlowEffectForVirtualComPage />
        </Grid>
      </Grid>
    </>
  );
};

export default VirtualCommission;
