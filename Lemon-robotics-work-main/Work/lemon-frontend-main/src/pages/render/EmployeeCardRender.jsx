import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Work from "@mui/icons-material/Work";
import { Badge, Business, PhoneAndroid } from "@mui/icons-material";
import { Link } from "react-router-dom"; // Import Link for navigation

// Sample Employee Photo (You can replace with an actual image or URL)
const SampleEmployeePhoto = "https://via.placeholder.com/150";

// Utility function to check if input is a valid image URL
const isImageFile = (input) => {
  return typeof input === "string" && input !== ""; // Ensure it's a valid string
};

const GridItem = ({ primarytext, img }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <ListItem
        sx={{
          paddingLeft: "16px",
          paddingRight: "16px",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)", // Lift effect with shadow
          },
        }}
      >
        <ListItemAvatar>
          {isImageFile(img) ? (
            <Avatar
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                boxShadow: "0 10px 15px rgba(0,0,0,0.2)", // Adds depth to the avatar
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.1)", // Slight scaling on hover for effect
                },
              }}
              variant="rounded"
              src={img || SampleEmployeePhoto} // Use sample photo if img is missing
            />
          ) : (
            <Avatar sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
              {img}
            </Avatar>
          )}
        </ListItemAvatar>
        <ListItemText
          primary={primarytext}
          primaryTypographyProps={{
            fontWeight: "bold",
            color: "#333",
            fontSize: "1.2rem", // Increased font size for readability
          }}
        />
      </ListItem>
    </Grid>
  );
};

const EmployeeCardRender = ({
  name,
  empid,
  phone,
  designation,
  department,
}) => {
  return (
    <Box
      sx={{
        padding: "40px",
        background: "linear-gradient(to bottom right, #f1f2b5, #135058)", // Soft yellow-green gradient
        minHeight: "100vh", // Cover full viewport height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 900,
          margin: "auto",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)", // Deeper shadow
          borderRadius: "20px", // Softer card corners
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.8), rgba(240,240,240,0.9))", // Subtle gradient for card background
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)", // Larger shadow on hover
            transform: "scale(1.02)", // Slight zoom-in effect
          },
        }}
      >
        <CardContent
          sx={{
            padding: "50px", // Larger padding for breathing space
            position: "relative",
            background: "linear-gradient(135deg, #e0f7fa 10%, #ffffff 90%)", // Fresh, clean gradient inside card
          }}
        >
          <Typography
            variant="h4"
            component="div"
            textAlign="center"
            fontWeight="bold"
            sx={{
              marginBottom: "24px",
              color: "#1976d2",
              textTransform: "uppercase", // Adds a sleek, professional style
              letterSpacing: "1px", // Space out letters for effect
            }}
          >
            Employee Details
          </Typography>

          <List sx={{ width: "100%" }}>
            <Grid container spacing={4}>
              {/* Employee name */}
              <GridItem
                img={SampleEmployeePhoto} // Display sample image as the employee's photo
                primarytext={name || "Loading..."}
              />
              {/* Designation */}
              <GridItem
                img={<Work />}
                primarytext={designation || "Loading..."}
              />
              {/* Phone */}
              <GridItem
                img={<PhoneAndroid />}
                primarytext={phone || "Loading..."}
              />
              {/* Department */}
              <GridItem
                img={<Business />}
                primarytext={department || "Loading..."}
              />
              {/* Employee ID */}
              <GridItem
                img={<Badge />}
                primarytext={`ID: ${empid || "Loading..."}`}
              />
            </Grid>
          </List>

          {/* Navigation buttons for Time Sheet and Expense Sheet */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px", // Space between buttons
              marginTop: "40px", // Margin for separation from the card content
            }}
          >
            <Button
              component={Link}
              to="/hr/time-sheet"
              variant="contained"
              color="primary"
              sx={{
                padding: "10px 20px",
                fontSize: "1rem",
                textTransform: "none", // Keep button text normal case
                borderRadius: "20px", // Rounded corners for a modern look
              }}
            >
              Go to Time Sheet
            </Button>
            <Button
              component={Link}
              to="/hr/expense-sheet"
              variant="outlined"
              color="primary"
              sx={{
                padding: "10px 20px",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: "20px",
              }}
            >
              Go to Expense Sheet
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeCardRender;
