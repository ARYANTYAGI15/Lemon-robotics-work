import React from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";

const styles = {
  cardContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: { sm: "column", lg: "row" },
  },

  imageContainer: {
    objectFit: "contain",
    height: "13rem",
    width: "15rem",
    // width: { lg: "500px", sm: "50px" },
  },
};

const MuiCard = ({ customImage }) => {
  return (
    <>
      <Container maxWidth="xs">
        <Card sx={styles.cardContainer}>
          <Box component="img" src={customImage} sx={styles.imageContainer} />
          <CardContent>
            <Typography variant="h3" component="div">
              Material Handling
            </Typography>
            <Typography variant="body1">
              Material handling involves short-distance movement within the
              confines of a building or between a building and a transportation
              vehicle
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default MuiCard;
