import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PasswordField from "@/components/PasswordField/PasswordField";
import Link from "next/link";
import {
  StyledContainer,
  StyledForm,
  StyledButton,
  StyledLinks,
  StyledLink,
} from "./styles";
import Grid from "@mui/material/Grid";

const RegisterPage = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 300ms ease-in",
      }}
    >
      <StyledContainer>
        <Avatar sx={{ m: 2, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h2" align="center" gutterBottom>
          Registro
        </Typography>
        <StyledForm>
          <Grid container spacing={2}>
            {/* Utiliza Grid para controlar el diseño */}
            <Grid item xs={12} sm={6}>
              {/* En pantallas pequeñas, cada campo se mostrará en una columna */}
              <TextField
                label="Nombre"
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              {/* En pantallas pequeñas, cada campo se mostrará en una columna */}
              <TextField
                label="Apellido"
                fullWidth
                margin="normal"
                variant="outlined"
                required
              />
            </Grid>
          </Grid>
          <TextField
            label="Correo Electrónico"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <PasswordField
            label="Contraseña"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <PasswordField
            label="Confirmar Contraseña"
            fullWidth
            margin="normal"
            variant="outlined"
            required
          />
          <StyledButton>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
            >
              Registrarse
            </Button>
          </StyledButton>
        </StyledForm>
        <StyledLinks>
          <Link href={"/login"}>
            <StyledLink>¿Ya tienes una cuenta?, Iniciar Sesión</StyledLink>
          </Link>
        </StyledLinks>
      </StyledContainer>
    </Container>
  );
};

export default RegisterPage;
