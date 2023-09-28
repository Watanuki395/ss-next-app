"use client";
import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Realiza una solicitud al servidor para enviar el correo de recuperación
    try {
      // // Simulación de solicitud exitosa
      // await fetch("/api/send-recovery-email", {
      //   method: "POST",
      //   body: JSON.stringify({ email }),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      // Actualiza el estado para mostrar el mensaje de confirmación
      setFormSubmitted(true);
    } catch (error) {
      // Maneja errores si la solicitud falla
      console.error("Error al enviar el correo de recuperación", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Recuperar Contraseña
      </Typography>
      {!formSubmitted ? (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo Electrónico"
            fullWidth
            margin="normal"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" type="submit">
            Enviar Correo de Recuperación
          </Button>
        </form>
      ) : (
        <div>
          <Typography variant="body1" gutterBottom>
            Se ha enviado un correo de recuperación a {email}.
          </Typography>
          <Button variant="contained" color="primary" href="/login">
            Regresar a la Página de Inicio de Sesión
          </Button>
        </div>
      )}
    </Container>
  );
};

export default ForgotPassword;
