import CountUp from "react-countup";
import React from "react";
import "./counter.css";
import { Box, Container, Icon, Paper, Typography } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import behince from "../../assets/img/behince.svg";

const styles = {
  activity: { height: 200, width: 200 },
};

const Counter = ({ end }) => {
  return (
    <>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "#cfe8fc",
          // width: "100%vh",
          // height: { lg: "300px", xs: "200px" },
          alignItems: "center",
        }}
      >
        <Box
          sx={{ width: "100px", height: "100px" }}
          component="img"
          src={behince}
        />
        <Typography>Business</Typography>
        <CountUp
          start={0}
          end={end}
          duration={2.75}
          // separator=" "
          // decimals={4}
          // decimal=","
          // prefix="EUR "
          suffix=" +"
          className="countup"
          onEnd={() => {
            console.log("end");
          }}
        />
      </Paper>
    </>
  );
};

export default Counter;
