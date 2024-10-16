// Import React and MUI components
import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
} from "@mui/material";

// Define an array of services to display
const services = [
  {
    name: "Software Development",
    description:
      "We offer custom software solutions for web, mobile, and desktop platforms.",
    image: "software.jpg",
    url: "https://example.com/software",
  },
  {
    name: "Training and Education",
    description:
      "We provide online and offline courses, workshops, and certifications for various skills and domains.",
    image: "training.jpg",
    url: "https://example.com/training",
  },
  {
    name: "Recruitment and Staffing",
    description:
      "We help you find the best talent for your organization, whether it's permanent, contract, or freelance.",
    image: "recruitment.jpg",
    url: "https://example.com/recruitment",
  },
  // Add more services as needed
];

// Define a function component to render the product section
const ProductSection = ({ name, slogan, image, learnMore, buy }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="140" image={image} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {slogan}
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" color="primary" href={learnMore}>
          Learn more
        </Button>
        <Button variant="outlined" color="primary" href={buy}>
          Buy
        </Button>
      </CardActions>
    </Card>
  );
};

// Define a function component to render the Allservices page
const FeaturesGridForVirtualCom = () => {
  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        All Services
      </Typography>
      <Grid container spacing={2}>
        {/* Use the map function to display each service */}
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <ProductSection
              name={service.name}
              slogan={service.description}
              image={service.image}
              learnMore={service.url}
              buy={service.url}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

// Export the Allservices page component
export default FeaturesGridForVirtualCom;
