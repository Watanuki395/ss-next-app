"use client";
import React, { useState } from "react";
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
import Skeleton from "@mui/material/Skeleton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import Fab from "@mui/material/Fab";

import { useAuth } from "../../app/context/AuthContext";
import { Grid } from "@mui/material";
import { useTheme } from "next-themes";

export default function Navbar() {
  const router = useRouter();
  const { user, logout, loading } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();

  const settings = [
    {
      label: "Perfil",
      icon: <AccountCircleRoundedIcon />,
      action: () => handleProfile(),
    },
    {
      label: "Configuración",
      icon: <Settings />,
      action: () => handleAccount(),
    },
    { label: "Salir", icon: <Logout />, action: () => handleLogout() },
  ];

  const pages = [];

  if (user) {
    pages.push(
      { label: "about", name: "reglas" },
      { label: "dashboard", name: "Inicio" }
    );
  } else {
    pages.pop();
  }

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isDarkMode, setDarkMode] = useState(true);

  const toggleThemeMode = () => {
    setDarkMode(!isDarkMode);
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

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
    try {
      router.push("/profile");
      handleCloseUserMenu();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleAccount = () => {
    // Lógica para la acción "Account"
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

  return !loading ? (
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

          {!user && !loading ? (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                columnGap: "2rem",
              }}
            >
              <Link href={`/login`}>
                <Button color="secondary" variant="contained">
                  Iniciar Sesión
                </Button>
              </Link>
              <Grid item>
                <Tooltip title={`Tema ${isDarkMode ? "oscuro" : "claro"}`}>
                  <Fab
                    size="small"
                    color="secondary"
                    onClick={toggleThemeMode}
                    sx={{ p: 0 }}
                  >
                    {isDarkMode ? (
                      <DarkModeIcon alt="Modo Oscuro" />
                    ) : (
                      <LightModeIcon alt="Modo Claro" />
                    )}
                  </Fab>
                </Tooltip>
              </Grid>
            </Grid>
          ) : loading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Grid
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                columnGap: "2rem",
              }}
            >
              <Grid item>
                <Tooltip title="Ver más">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="usuario" src="" />
                  </IconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title={`Tema ${isDarkMode ? "oscuro" : "claro"}`}>
                  <Fab
                    size="small"
                    color="secondary"
                    onClick={toggleThemeMode}
                    sx={{ p: 0 }}
                  >
                    {isDarkMode ? (
                      <DarkModeIcon alt="Modo Oscuro" />
                    ) : (
                      <LightModeIcon alt="Modo Claro" />
                    )}
                  </Fab>
                </Tooltip>
              </Grid>

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
            </Grid>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    <></>
  );
}
