// src/components/Drawer/Drawer.jsx

import React from "react";
import { Box } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import close from "../../assets/img/close.svg";
import Navbar from "../Navbar/Navbar"; // Import the Navbar component

const Drawer = ({ open, onClose, isAuthenticated }) => {
  return (
    <MuiDrawer
      PaperProps={{
        sx: { width: "50%" }, // Set the width of the drawer
      }}
      anchor="left"
      open={open}
      onClose={onClose}
    >
      <Box sx={{ padding: "2px" }}>
        {/* Close Button */}
        <IconButton onClick={onClose} sx={{ padding: 0, marginLeft: "5px" }}>
          <img src={close} alt="close" />
        </IconButton>
        
        <Box sx={{ padding: "44px" }}>
          {/* Pass isAuthenticated prop to Navbar */}
          <Navbar isAuthenticated={isAuthenticated} onClose={onClose} />
        </Box>
      </Box>
    </MuiDrawer>
  );
};

export default Drawer;
