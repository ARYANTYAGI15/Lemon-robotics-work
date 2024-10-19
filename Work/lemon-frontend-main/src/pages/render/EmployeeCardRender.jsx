import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Grid } from "@mui/material";
import Work from "@mui/icons-material/Work";
import { Badge, Business, PhoneAndroid } from "@mui/icons-material";

// import Sample_Employee_Photo from "../assets/samples/Sample_Employee_Photo.jpg";

const isImageFile = (input) => {
  return typeof input === "string";
};

const GridItem = ({ primarytext, img }) => {
  return (
    <Grid item xs={6}>
      <ListItem>
        <ListItemAvatar>
          {isImageFile(img) ? (
            <Avatar
              sx={{ width: 60, height: 60 }}
              variant="rounded"
              src={img}
            />
          ) : (
            <Avatar>{img}</Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={primarytext} />
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
    // <h1>Employee Card render</h1>
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Grid container>
        {/* <GridItem img={samplephoto} primarytext={name || "Loading..."} /> */}
        <GridItem primarytext={name || "Loading..."} />
        <GridItem img={<Work />} primarytext={designation || "Loading..."} />
        <GridItem img={<PhoneAndroid />} primarytext={phone || "Loading..."} />
        <GridItem img={<Business />} primarytext={department || "Loading..."} />
        <GridItem img={<Badge />} primarytext={empid || "Loading..."} />
      </Grid>
    </List>
  );
};
export default EmployeeCardRender;
