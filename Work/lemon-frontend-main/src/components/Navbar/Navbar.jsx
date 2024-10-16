// src/components/Navbar/Navbar.jsx

import React, { useState } from "react";
import { Box, IconButton, Drawer, List, ListItem, ListItemText, Collapse } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu"; // Import MenuIcon for the drawer
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import BtnNav from "./BtnNav"; // Assuming this is your button component

const Navbar = ({ isAuthenticated }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // State to manage dropdowns

  const pages = [
    { title: "Home", link: "/home" },
    { title: "About", link: "/about" },
    {
      title: "Services",
      link: "/services",
      arrow: true,
      dropdownItems: [
        { title: "Consulting", link: "/services/consulting" },
        { title: "Support", link: "/services/support" },
      ],
    },
    {
      title: "Products",
      link: "/products",
      arrow: true,
      dropdownItems: [
        { title: "Product A", link: "/products/product-a" },
        { title: "Product B", link: "/products/product-b" },
      ],
    },
  ];

  if (isAuthenticated) {
    pages.push(
      { title: "Expense Sheet", link: "/expense-sheet" },
      { title: "Time Sheet", link: "/time-sheet" }
    );
  } else {
    pages.push({ title: "For Employees", link: "/login" });
  }

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index); // Toggle dropdown visibility
  };

  const handleItemClick = () => {
    setDrawerOpen(false); // Close drawer when clicking an item
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px" }}>
      {/* Menu icon for mobile */}
      <IconButton
        color="inherit"
        aria-label="menu"
        onClick={toggleDrawer}
        sx={{ display: { xs: "block", md: "none" } }} // Only show on mobile
      >
        <MenuIcon />
      </IconButton>

      {/* Desktop Navbar */}
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {pages.map((page, index) => (
          <BtnNav page={page} key={index} />
        ))}
      </Box>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            {pages.map((page, index) => (
              <div key={index}>
                <ListItem button component={Link} to={page.link} onClick={handleItemClick}>
                  <ListItemText primary={page.title} />
                </ListItem>
                {/* Render dropdown items if present */}
                {page.dropdownItems && (
                  <>
                    <ListItem button onClick={() => handleDropdownToggle(index)}>
                      <ListItemText primary="More" />
                    </ListItem>
                    <Collapse in={openDropdown === index} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        {page.dropdownItems.map((dropdownItem, dropdownIndex) => (
                          <ListItem button key={dropdownIndex} component={Link} to={dropdownItem.link} onClick={handleItemClick}>
                            <ListItemText primary={dropdownItem.title} sx={{ pl: 4 }} /> {/* Indent dropdown items */}
                          </ListItem>
                        ))}
                      </List>
                    </Collapse>
                  </>
                )}
              </div>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Navbar;
