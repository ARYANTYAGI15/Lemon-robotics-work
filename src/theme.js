import { capitalize } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import createBreakpoints from "@mui/system/createTheme/createBreakpoints";

const breakpoints = createBreakpoints({});

const theme = createTheme({
  props: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          scrollBehavior: "smooth",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#686868",
    },

    slateBlue: {
      main: "#777FEB",
    },

    background: {
      default: "black",
    },
  },

  typography: {
    h1: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "50px",
      fontWeight: 700,
      lineHeight: "55px",
      textTransform: "capitalize",
    },

    h2: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "42px",
      fontWeight: 700,
      lineHeight: "39px",
      color: "#000000",
      [breakpoints.up("md")]: {
        fontSize: "64px",
        lineHeight: "78px",
      },
    },
    h3: {
      fontWeight: 500,
      lineHeight: "20px",
      textTransform: "uppercase",
      color: "#fff",
      fontSize: "1.2rem",
      "@media (min-width:600px)": {
        fontSize: "1.5rem",
      },
      [breakpoints.up("md")]: {
        fontSize: "2.4rem",
      },
    },
    gradientText: {
      fontSize: 20,
      fontWeight: 700,
      backgrounClip: "text",
      backgroundRepeat: "repeat",
      backgroundSize: "100%",
      background:
        "-webkit-radial-gradient(circle, hsla(258, 80%, 38%, 1) 98%, hsla(47, 61%, 59%, 1) 100%)",

      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    },
    body1: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: "17px",
      color: "#686868",
      [breakpoints.up("md")]: {
        fontSize: "24px",
        lineHeight: "29px",
        fontWeight: 500,
      },
    },
  },
});

export default theme;
