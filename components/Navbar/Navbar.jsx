"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Link from "next/link";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

import { useAuth } from "../../app/context/AuthContext";

export default function Navbar() {
  const router = useRouter();
  const pages = [
    { label: "about", name: "reglas" },
    { label: "dashboard", name: "Inicio" },
  ];
  const settings = [
    {
      label: "Perfil",
      icon: <AccountCircleRoundedIcon />,
      action: () => handleProfile(),
    },
    {
      label: "Configuración",
      icon: <Settings />,
      action: () => handleLogout(),
    },
    { label: "Salir", icon: <Logout />, action: () => handleLogout() },
  ];

  const { user, logout, loading, setLoading } = useAuth();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleProfile = () => {
    // Lógica para la acción "Profile"
    handleCloseUserMenu();
  };

  const handleAccount = () => {
    // Lógica para la acción "Account"
    handleCloseUserMenu();
  };

  const handleDashboard = () => {
    // Lógica para la acción "Dashboard"
    handleCloseUserMenu();
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/");
      handleCloseUserMenu();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <CardGiftcardIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Link href={user ? "/dashboard" : "/"}>
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              SECRET
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link key={page.label} href={`/${page.label}`}>
                  <Button
                    key={page.label}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}
            </Menu>
          </Box>
          <CardGiftcardIcon
            sx={{ display: { xs: "none", md: "none" }, mr: 1 }}
          />

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.label} href={`/${page.label}`}>
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          {!user || loading ? null : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Ver más">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="" />
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
                {settings.map((setting) => (
                  <MenuItem key={setting.label} onClick={setting.action}>
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
