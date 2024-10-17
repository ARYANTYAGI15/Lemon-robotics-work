import { Card, CardMedia, Grid } from "@mui/material";
import React from "react";

const TopVideo = ({ video }) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardMedia
              sx={{ objectFit: "cover", width: "100%", height: "100%" }}
              component="video"
              src={video}
              autoPlay
              loop
              muted
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default TopVideo;
