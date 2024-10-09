import React from "react";
import MuiButton from "@mui/material/Button";

const styles = {
  btn: (theme) => ({
    fontFamily: "Monteserrat, sans-serif",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "20px",
    textTransform: "capitalize",
    color: "#FFFFFF",
    padding: "20px 60px",
    background: theme.palette.slateBlue.main,
    borderRadius: "50%",
    "&:hover": {
      background: "#646AB0",
    },
  }),
};

const Button = ({ children }) => {
  return <MuiButton sx={styles.btn}>{children}</MuiButton>;
};

export default Button;
