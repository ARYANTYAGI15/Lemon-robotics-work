import React from "react";

import {
  Box,
  Button,
  CssBaseline,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme } from "@mui/material/styles";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// import { navbarMainMenuItems } from "../../../constants/navbarMainMenuItems";
import SideNavHeader from "./SideNavHeader";

import { useNavigate } from "react-router-dom";
import LeaveIcon2 from "@mui/icons-material/FlightTakeoff";
import AttendanceIcon from "@mui/icons-material/Fingerprint";
import TimeSheetIcon from "@mui/icons-material/PendingActions";
import TaskIcon from "@mui/icons-material/ChecklistRtl";
import HolidayIcon from "@mui/icons-material/Surfing";

export const navbarMainMenuItems = [
  {
    id: 0,
    icon: <LeaveIcon2 />,
    label: "Employee",
    route: "/hr/employee",
  },
  {
    id: 1,
    icon: <AttendanceIcon />,
    label: "Attendance",
    route: "/hr/attendance",
  },
  {
    id: 2,
    icon: <TimeSheetIcon />,
    label: "Time Sheet",
    route: "/hr/time-sheet",
  },
  {
    id: 3,
    icon: <TaskIcon />,
    label: "Tasks",
    route: "/task",
  },
  {
    id: 4,
    icon: <HolidayIcon />,
    label: "Holidays",
    route: "/holiday",
  },
  {
    id: 5,
    icon: <LeaveIcon2/>,
    label: "Expense",
    route: "/hr/expense-sheet",
  }
];

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const logout = () => {
  localStorage.clear();
  window.location.replace("/login");
};

export default function SideNav() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideNavHeader open={open} handleDrawerOpen={handleDrawerOpen} />
      <Drawer
        PaperProps={{
          sx: { backgroundColor: "#101F33" },
        }}
        variant="permanent"
        open={open}
      >
        <DrawerHeader>
          <IconButton
            sx={{ color: "rgba(255,255,255,0.7)" }}
            onClick={handleDrawerClose}
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navbarMainMenuItems.map((item) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{ display: "block" }}
              onClick={() => navigate(item.route)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{ opacity: open ? 1 : 0, color: "rgba(255,255,255,0.7)" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Button
          variant="contained"
          onClick={logout}
          sx={{
            textAlign: "left",
            fontSize: 13,
            fontWeight: 500,
            color: "white",
            borderRadius: 50,
            border: "2px solid white",
          }}
        >
          Logout
        </Button>

        <Divider />
      </Drawer>
    </Box>
  );
}
