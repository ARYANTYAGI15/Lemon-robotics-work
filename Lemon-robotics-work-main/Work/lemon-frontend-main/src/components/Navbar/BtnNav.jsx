import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Icon, Link } from "@mui/material";
import DropDown from "./DropDown";

import styles from "./styles";
import EmojiTransportationRoundedIcon from "@mui/icons-material/EmojiTransportationRounded";

const BtnNav = ({ page }) => {
  return (
    <>
      {page.arrow ? (
        <DropDown page={page} />
      ) : (
        <Link
          component={NavLink}
          to={page.link}
          sx={styles.dropDownButton}
          style={({ isActive }) =>
            isActive ? { color: "#777FEB" } : undefined
          }
        >
          <Box sx={styles.title}>
            {page.title}
            {<EmojiTransportationRoundedIcon />}
          </Box>
        </Link>
      )}
    </>
  );
};

export default BtnNav;
