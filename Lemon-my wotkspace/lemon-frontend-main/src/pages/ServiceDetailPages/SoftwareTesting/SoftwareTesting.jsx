import React from "react";
import { Container, Typography, Paper, Grid, Box } from "@mui/material";
import BarChartIcon from "@mui/icons-material/BarChart";
import SecurityIcon from "@mui/icons-material/Security";
import SpeedIcon from "@mui/icons-material/Speed";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";

const SoftwareTesting = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        Software Testing Services
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Passionate about delivering flawless software through rigorous testing
        and automation.
      </Typography>
      <Grid container spacing={3}>
        {/* Services Section */}
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h4" gutterBottom>
                Core Services
              </Typography>
              <Typography variant="body1">
                - Functional Testing <br />
                - Integration Testing <br />
                - End-to-End Testing <br />
                - Load Testing <br />
                - Performance Testing <br />- Security Testing
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Platforms Section */}
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h4" gutterBottom>
                Platforms We Test On
              </Typography>
              <Typography variant="body1">
                - Edge, Chrome, Safari, Firefox <br />
                - Android <br />- iOS
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Tools Section */}
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h4" gutterBottom>
                Tools We Use
              </Typography>
              <Typography variant="body1">
                - WebdriverIO <br />
                - Locust <br />
                - Pytest <br />
                - Appium <br />
                - Docker <br />
                - Postman <br />- Coming soon: AWS, Jenkins
              </Typography>
            </Box>
          </Paper>
        </Grid>
        {/* Reports Section */}
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Box p={2}>
              <Typography variant="h4" gutterBottom>
                Management Friendly Test Reports
              </Typography>
              <Box display="flex" justifyContent="center" alignItems="center">
                <BarChartIcon fontSize="large" />
                <SecurityIcon fontSize="large" />
                <SpeedIcon fontSize="large" />
                <IntegrationInstructionsIcon fontSize="large" />
                {/* Placeholder for graphs/charts */}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SoftwareTesting;
