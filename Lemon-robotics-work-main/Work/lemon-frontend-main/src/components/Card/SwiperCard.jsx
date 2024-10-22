import { Card, CardContent, Container, Typography } from "@mui/material";
import React from "react";

const styles = {
  swiperCard: (theme) => ({
    backgroundImage:
      "linear-gradient(90deg, rgba(123,181,28,1) 23%, rgba(255,253,0,1) 100%)",
  }),
};

const SwiperCard = ({ serviceHeadingOne, serviceHeadingTwo }) => {
  return (
    <>
      <Container
        sx={{ display: "flex", flexDirection: "column", height: "300px" }}
      >
        <Card sx={styles.swiperCard}>
          <CardContent sx={{ height: "300px" }}>
            <Typography variant="gradientText">{serviceHeadingOne}</Typography>
            <Typography variant="gradientText">{serviceHeadingTwo}</Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default SwiperCard;
