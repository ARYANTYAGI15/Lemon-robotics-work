import React, { useState } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import arrow from "../../assets/img/chevron-down.svg";
import styles from "./styles";
import { Box, Link } from "@mui/material";

import { Link as RouterLink } from "react-router-dom";
import Cables from "@mui/icons-material/SettingsInputComponent";
import Gripper from "@mui/icons-material/PrecisionManufacturing";
import HomeRobot from "@mui/icons-material/SmartToy";
import Humanoid from "../../assets/svgs/humanoid-robot-svgrepo-com.svg";
const products = [
  { title: "Cables", icon: <Cables /> },
  { title: "Grippers", icon: <Gripper /> },
  { title: "Humanoid", icon: Humanoid },
  { title: "Home Robots", icon: <HomeRobot /> },
  { title: "And much more...", link: "/" },
];

const services = [
  { title: "Virtual Commissioning", link: "/services/virtualcom" },
  { title: "Welding" },
  { title: "Machining & Tooling" },
  { title: "software testing", link: "/services/softwaretest" },
  { title: "All Services", link: "/services" },
];

export default function DropDown({ page }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [showIcon, setShowIcon] = useState(false);

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        // sx={styles.btnLink}
      >
        {page.title} <img src={arrow} alt="arrow" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {page.title === "Services"
          ? services.map((service, index) => (
              <Link
                sx={{ textDecoration: "none" }}
                component={RouterLink}
                to={service.link}
                key={index}
              >
                <MenuItem key={service.link} sx={styles.menuItem}>
                  <Box sx={styles.serviceTitle}>{service.title}</Box>
                </MenuItem>
              </Link>
            ))
          : undefined}
        {page.title === "Products"
          ? products.map((product, index) => (
              <MenuItem
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onMouseOver={() => console.log("hover")}
                onMouseOut={() => console.log("over")}
                key={index}
              >
                {/* {showIcon && {typeof product.icon === "string" ? (
                      <Box component="img" src={item.img} />
                    ) : (
                      product.icon
                    )}}
                {product.title} */}
                {product.title}
                {typeof product.icon === "string" ? (
                  <Box component="img" src={product.icon} />
                ) : (
                  product.icon
                )}
              </MenuItem>
            ))
          : undefined}
      </Menu>
    </div>
  );
}
