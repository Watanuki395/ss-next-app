import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardHeader,
  Container,
  CardContent,
  Button,
  CardMedia,
  Paper,
} from "@mui/material";

const rules = [
  {
    title: "Regla 1",
    description: "Cada participante recibe el nombre de otra persona al azar.",
    image: "/rule1.png", // Ruta a la imagen genérica para la regla 1
  },
  {
    title: "Regla 2",
    description: "Nadie debe revelar a quién le están comprando un regalo.",
    image: "/rule2.png", // Ruta a la imagen genérica para la regla 2
  },
  {
    title: "Regla 3",
    description: "Se establece un presupuesto para los regalos.",
    image: "/rule3.png", // Ruta a la imagen genérica para la regla 3
  },
  {
    title: "Regla 4",
    description: "En un día acordado, todos se reúnen y revelan sus regalos.",
    image: "/rule4.png", // Ruta a la imagen genérica para la regla 4
  },
];
function About() {
  return (
    <Container>
      <Paper elevation={3} sx={{ padding: "1rem", marginTop: "1rem" }}>
        <Box my={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            ¡Bienvenido al Juego de Amigo Secreto!
          </Typography>
        </Box>

        {/* Sección 1: Explicación del juego */}
        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            ¿Qué es el juego de Amigo Secreto?
          </Typography>
          <Typography paragraph>
            El juego de Amigo Secreto es una divertida tradición en la que un
            grupo de personas intercambian regalos de forma anónima. Cada
            persona recibe el nombre de otra persona a quien deberá comprarle un
            regalo, ¡y es un secreto hasta el día del intercambio!
          </Typography>
        </Box>

        {/* Sección 2: Reglas básicas */}
        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            Reglas Básicas del Juego
          </Typography>
          <Grid container spacing={2}>
            {rules.map((rule, index) => (
              <Grid item xs={12} sm={3} key={index}>
                <Card variant="outlined">
                  <CardHeader title={rule.title} />
                  <CardMedia
                    component="img"
                    height="200"
                    image={rule.image}
                    alt={rule.title}
                  />
                  <CardContent>
                    <Typography>{rule.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Sección 3: Más detalles */}
        <Box my={4}>
          <Typography variant="h5" gutterBottom>
            Más Detalles
          </Typography>
          <Typography paragraph>
            El juego de Amigo Secreto puede ser una forma divertida de celebrar
            las festividades o cualquier ocasión especial con amigos y
            familiares. ¡Anímate a participar y descubre quién será tu Amigo
            Secreto este año!
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default About;
