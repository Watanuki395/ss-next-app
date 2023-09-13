import React from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

function Dashboard({ metrics }) {
  return (
    <ProtectedRoute>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transition: "opacity 300ms ease-in",
        }}
      >
        <Typography variant="h4" gutterBottom p={4}>
          Esto es un resumen de tus juegos
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Número de Participantes
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {metrics?.participants}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ProtectedRoute>
  );
}

export default Dashboard;
