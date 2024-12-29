import React from "react";
import TimeSheetForm from "../forms/TimeSheetForm";
import TimeSheetHistoryFetch from "../fetch/TimeSheetHistoryFetch";
import { Grid } from "@mui/material";

const TimeSheetWindow = () => {
  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          backgroundImage:
            "url('https://cdn.photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          flexDirection: "column",
          justifyContent: "center",
          maxWidth: { xs: "75%", sm: "500px" },
          mt: 10,
          ml: 10,
          alignContent: {
            xs: "flex-start",
            sm: "center",
          },
        }}
      >
        <Grid item>
          <TimeSheetForm />
        </Grid>
        <Grid item>
          <TimeSheetHistoryFetch />
        </Grid>
      </Grid>
    </>
  );
};

export default TimeSheetWindow;
