import React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Link from "next/link";
import {
  StyledContainer,
  StyledForm,
  StyledButton,
  StyledLinks,
  StyledLink,
} from "./styles";
import PasswordField from "@/components/PasswordField/PasswordField";

const LoginPage = () => {
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
          Iniciar Sesión
        </Typography>
        <StyledForm>
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
          <Link href={"/forgot"}>
            <StyledLink>Olvide mi Contraseña</StyledLink>
          </Link>
          <StyledButton>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              type="submit"
            >
              Iniciar Sesión
            </Button>
          </StyledButton>
        </StyledForm>
        <StyledLinks>
          <Link href={"/register"}>
            <StyledLink>¿No tienes una cuenta?, Registrate</StyledLink>
          </Link>
        </StyledLinks>
      </StyledContainer>
    </Container>
  );
};

export default LoginPage;
