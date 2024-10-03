// src/components/Navbar/Navbar.jsx

import React from "react";
import { Box } from "@mui/material";
import BtnNav from "./BtnNav"; // Assuming this is your button component

const Navbar = ({ isAuthenticated }) => {
  const pages = [
    {
      title: "Home",
      link: "/home",
    },
    {
      title: "About",
      link: "/about",
    },
    {
      title: "Services",
      link: "/services",
      arrow: true, // Indicates dropdown
      dropdownItems: [
        { title: "Consulting", link: "/services/consulting" },
        { title: "Support", link: "/services/support" },
      ],
    },
    {
      title: "Products",
      link: "/products",
      arrow: true, // Indicates dropdown
      dropdownItems: [
        { title: "Product A", link: "/products/product-a" },
        { title: "Product B", link: "/products/product-b" },
      ],
    },
  ];

  if (isAuthenticated) {
    pages.push(
      {
        title: "Expense Sheet",
        link: "/expense-sheet",
      },
      {
        title: "Time Sheet",
        link: "/time-sheet",
      }
    );
  } else {
    pages.push({
      title: "For Employees",
      link: "/login",
    });
  }

  return (
    <Box sx={{ display: "flex" }}>
      {pages.map((page, index) => (
        <BtnNav page={page} key={index} />
      ))}
    </Box>
  );
};

export default Navbar;
