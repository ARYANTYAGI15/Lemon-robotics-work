import React from "react";
import {
  Box,
  Typography,
  Link,
  List,
  ListItem,
  Paper,
  InputBase,
  Button,
  Grid,
} from "@mui/material";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import behince from "../../assets/img/behince.svg";
import medium from "../../assets/img/medium.svg";
import dribble from "../../assets/img/dribble.svg";

import styles from "./styles";

const services = [
  "Material Handling",
  "Welding",
  "Matching & Tooling",
  "Virtual commissioning",
  "Brand Design",
];

const links = [
  "About Agency",
  "Latest News and Blogs",
  "Meet the Team",
  "Popular Services",
  "Testimonials",
  "Need a Career?",
];

const follow = [
  { title: "dribble", img: dribble },
  { title: "instagram", img: <InstagramIcon /> },
  { title: "twitter", img: <TwitterIcon /> },
  { title: "behince", img: behince },
  { title: "facebook", img: <FacebookIcon /> },
  { title: "medium", img: medium },
];

const Footer = () => {
  return (
    <Box sx={styles.footer}>
      <Grid
        container
        columns={{ xs: 4, sm: 8, md: 12 }}
        sx={styles.gridWrapper}
      >
        <Grid item xs={6} sm={4} md={3}>
          <Box>
            <Typography variant="h3" sx={styles.linkTitle}>
              Services
            </Typography>
            <List>
              {services.map((item, index) => {
                return (
                  <ListItem sx={styles.itemList} key={index}>
                    {item}
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <Box>
            <Typography variant="h3" sx={styles.linkTitle}>
              Links
            </Typography>
            <List>
              {links.map((item, index) => {
                return (
                  <ListItem sx={styles.itemList} key={index}>
                    {item}
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Box>
            <Typography variant="h3" sx={styles.linkTitle}>
              Follow
            </Typography>
            <List>
              {follow.map((item, index) => {
                return (
                  <ListItem sx={styles.itemList} key={index}>
                    {typeof item.img === "string" ? (
                      <Box component="img" src={item.img} />
                    ) : (
                      item.img
                    )}
                    <Box component="span" sx={{ marginLeft: "5px" }}>
                      {item.title}
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
        <Grid item xs={6} sm={4} md={4} sx={styles.emailBlock}>
          <Box sx={styles.subscribeFooter}>
            <Typography variant="h3" sx={styles.title}>
              {" "}
              Subscribe our News Letter
            </Typography>
            <Typography sx={styles.text}>
              {" "}
              Lorem ipsum dolor
              <Link sx={{ color: "#777FEB" }}>
                {" "}
                sit amet, consectetur adipiscing{" "}
              </Link>
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Services
            </Typography>
            <Paper component="form" sx={styles.paper}>
              <InputBase sx={styles.inputBase} placeholder="Email address" />
              <Button sx={styles.btn}>Sign UP</Button>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
