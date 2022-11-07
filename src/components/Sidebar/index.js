import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import jwt_decode from "jwt-decode";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aos from "aos";
import { logout } from "../../reducers/userSlice";
import { useNavigate } from "react-router";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import { NavbarButtonsContainer } from "./NavbarElements";

import TabletAndroidIcon from "@mui/icons-material/TabletAndroid";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import MonitorIcon from "@mui/icons-material/Monitor";

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
    width: `calc(${theme.spacing(8)} + 1px)`,
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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100%)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  zIndex: 0,
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

const Sidebar = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const user = useSelector((state) => state.userSlice.user);

  const handleDrawerOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useState(() => {
    Aos.init({ duration: 500 });
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    console.log(user);
    if (user == null) {
      console.log(user);
      navigate("/login");
      return;
    }
  }, [navigate, user]);

  const [anchorEl, setAnchorEl] = useState("");

  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...open,
            }}
          >
            <MenuIcon />
          </IconButton>
          <NavbarButtonsContainer>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <div></div>

              <div variant="h6">Sos</div>

              <div>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={openMenu ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                  >
                    {user && (
                      <>
                        <Avatar
                          sx={{ width: 40, height: 40 }}
                          src={jwt_decode(user.token).avatar}
                        ></Avatar>
                        &nbsp;&nbsp;
                        <Typography style={{ color: "white" }}>
                          {jwt_decode(user.token).firstname +
                            " " +
                            jwt_decode(user.token).lastname}
                        </Typography>
                      </>
                    )}
                    {!user && (
                      <Avatar sx={{ width: 40, height: 40 }}> G </Avatar>
                    )}
                  </IconButton>
                </Tooltip>

                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMenu}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: "hidden",
                      filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                      mt: 1.5,
                      "& .MuiAvatar-root": {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      "&:before": {
                        content: '""',
                        display: "block",
                        position: "absolute",
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: "background.paper",
                        transform: "translateY(-50%) rotate(45deg)",
                        zIndex: 0,
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  {/* <MenuItem>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem> */}
                  <MenuItem onClick={() => handleLogout()}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </Box>
          </NavbarButtonsContainer>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"device"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                setPage(1);
                navigate("/");
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: page === 1 ? "#DCDCDC" : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <TabletAndroidIcon />
              </ListItemIcon>
              <ListItemText
                primary={"devices"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem key={"news"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                setPage(2);
                navigate("/news");
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: page === 2 ? "#DCDCDC" : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <NewspaperIcon />
              </ListItemIcon>
              <ListItemText primary={"news"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"usres"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                setPage(3);
                navigate("/users");
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: page === 3 ? "#DCDCDC" : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <GroupIcon />
              </ListItemIcon>
              <ListItemText primary={"users"} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem key={"sos"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                setPage(4);
                navigate("/alerts");
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: page === 4 ? "#DCDCDC" : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AddAlertIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Sos LogBook"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem key={"settings"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                setPage(5);
                navigate("/settings");
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: page === 5 ? "#DCDCDC" : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Settings"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem key={"monitor"} disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => {
                setPage(6);
                navigate("/monitor");
              }}
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
                backgroundColor: page === 6 ? "#DCDCDC" : "none",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MonitorIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Monitoring"}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
    </>
  );
};

export default Sidebar;
