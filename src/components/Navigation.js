import React, { useState, useEffect, useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  CssBaseline,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
  Icon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ContactsIcon from "@mui/icons-material/Contacts";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link, useNavigate } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { UserAuth } from "../context/AuthConext";
import { ThemeContext } from "./ThemeContext";

const drawerWidth = 240;

export default function Navigation(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { theme, toggle, dark } = useContext(ThemeContext);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { googleSignIn, logOut } = UserAuth();

  const user = sessionStorage.getItem("user");

  const myUser = JSON.parse(user);

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setAnchorElUser(null);
  }, [user]);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PlayCircleIcon />
          <p style={{ margin: "2px 0 0 5px" }}>FLIMS.NET</p>
        </div>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="News" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: "center" }}>
            <ListItemText primary="Contact" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          sx={{
            background: "linear-gradient(to right, #206eeb, #373B44); ",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ ml: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Link to="/">
                <Button
                  size="large"
                  sx={{
                    color: theme.color,
                    fontSize: "20px",
                    fontWeight: 700,
                    mr: { xs: 0, sm: 2 },
                  }}
                >
                  Movie World
                </Button>
              </Link>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}>
              <Link to="/">
                <Button sx={{ color: theme.color }} startIcon={<HomeIcon />}>
                  Home
                </Button>
              </Link>
              <Link to="/about">
                <Button sx={{ color: theme.color }} startIcon={<InfoIcon />}>
                  About
                </Button>
              </Link>
              <Link to="/news">
                <Button
                  sx={{ color: theme.color }}
                  startIcon={<NewspaperIcon />}
                >
                  News
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  sx={{ color: theme.color }}
                  startIcon={<ContactsIcon />}
                >
                  Contact
                </Button>
              </Link>
              <Button>
                <Icon style={{ color: theme.color }} onClick={toggle} left>
                  {!dark ? <Icon>dark_mode</Icon> : <Icon>light_mode</Icon>}
                </Icon>
              </Button>
            </Box>
            <Box>
              {myUser?.displayName ? (
                <div>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt={myUser.email} src={myUser.photoURL} />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    <Link to="/dashboard" style={{ textDecoration: "none" }}>
                      <MenuItem onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">Dashboard</Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem>
                      <Typography textAlign="center" onClick={handleSignOut}>
                        Logout
                      </Typography>
                    </MenuItem>
                  </Menu>
                </div>
              ) : (
                <>
                  <Button
                    variant="outlined"
                    onClick={handleGoogleSignIn}
                    color="inherit"
                    startIcon={<GoogleIcon />}
                    sx={{ borderColor: "#fff", color: "#fff" }}
                  >
                    Login
                  </Button>
                </>
              )}
            </Box>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
}
