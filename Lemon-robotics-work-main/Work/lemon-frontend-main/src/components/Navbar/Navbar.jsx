import React, { useState } from "react";
import { Box } from "@mui/material";
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

  // Add conditional pages based on isAuthenticated state
  if (isAuthenticated) {
    pages.push(
      { title: "Expense Sheet", link: "/hr/expense-sheet" },
      { title: "Time Sheet", link: "/hr/time-sheet" }
    );
  } else {
    // For unauthenticated users, display the "For Employees" option
    pages.push({ title: "For Employees", link: "/login" });
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { lg: "flex", xs: "grid" },
        gridTemplateColumns: {
          xs: "1fr",
          lg: "repeat(auto-fill, minmax(100px, 1fr))",
        },
        gap: { xs: "10px", lg: "20px" },
        justifyContent: "space-between",
        paddingRight: "20px",
      }}
    >
      {pages.map((page, index) => (
        <BtnNav page={page} key={index} />
      ))}
    </Box>
  );
};

export default Navbar;
