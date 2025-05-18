// src/components/Navbar.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import InventoryIcon from "@mui/icons-material/Inventory";
import PeopleIcon from "@mui/icons-material/People";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import HelpIcon from "@mui/icons-material/Help";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileEl, setProfileEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuOpen = (event) => {
    setProfileEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
    handleMenuClose();
  };

  const handleLogin = () => {
    console.log("Login clicked");
    handleProfileMenuClose();
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    handleProfileMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#2C3E50" }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Project Dashboard
        </Typography>
        <IconButton color="inherit" onClick={handleProfileMenuOpen}>
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleNavigation("/")}>
          <HomeIcon sx={{ mr: 1 }} /> Home
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/products/create")}>
          <AddBoxIcon sx={{ mr: 1 }} /> Add Products
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/productList")}>
          <InventoryIcon sx={{ mr: 1 }} /> Products
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/userList")}>
          <PeopleIcon sx={{ mr: 1 }} /> User List
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/contact")}>
          <ContactMailIcon sx={{ mr: 1 }} /> Contact Us
        </MenuItem>
        <MenuItem onClick={() => handleNavigation("/ai")}>
          <HelpIcon sx={{ mr: 1 }} /> Ask AI
        </MenuItem>
      </Menu>

      <Menu
        anchorEl={profileEl}
        open={Boolean(profileEl)}
        onClose={handleProfileMenuClose}
      >
        <MenuItem onClick={handleLogin}>Login</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
