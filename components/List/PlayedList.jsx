import React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import styled from "@emotion/styled"; // Importa styled de Emotion

// Define un componente StyledListItem que aplica estilos personalizados
const StyledListItem = styled(ListItem)`
  border-radius: 10px; // Ajusta el valor según el nivel de redondeo deseado
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between; // Separa las filas izquierda y derecha
  align-items: center; // Centra verticalmente el contenido
  padding: 1rem; // Añade espacio alrededor del ListItem
  &:hover {
    background-color: #2b2b2b; // Cambia el color de fondo al hacer hover
  }
`;

const StyledListSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: right;
`;

// Define un componente StyledImage para mostrar la imagen con bordes redondeados
const StyledImage = styled("img")`
  border-radius: 50px;
  max-width: 100px;
  max-height: 100px;
  margin-right: 1rem;

  @media screen and (max-width: 768px) {
    align-self: center;
    min-width: 80px;
    max-height: 80px;
  }
  @media screen and (max-width: 468px) {
    align-self: center;
    min-width: 50px;
    max-height: 50px;
  }
`;

const pedidosArray = [
  {
    idProd: 123456,
    ProdName: "un producto",
    gameName: "Amigo Secreto Familiar",
    participants: 10,
    description: "Descripción del juego...",
    status: "active",
  },
  {
    idProd: 222222,
    ProdName: "otro producto",
    gameName: "Amigo Secreto en la Oficina",
    participants: 8,
    description: "Descripción del juego...",
    status: "closed",
  },
  // ... Otros objetos de juego
];

function PlayedList() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <List>
        {pedidosArray.map((item) => (
          <Paper elevation={3} key={item.idProd}>
            <StyledListItem key={item.idProd}>
              <Grid container>
                <StyledImage src="./rule4.png" alt="Imagen del juego" />
                <StyledListSection>
                  <Typography variant="h6">{item.gameName}</Typography>
                  <Typography variant="body1">
                    Participantes: {item.participants}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                  <Chip
                    size="small"
                    label={item.status === "active" ? "Activo" : "Finalizado"}
                    color={item.status === "active" ? "success" : "default"}
                    variant="filled"
                    sx={{ width: "max-content" }}
                  />
                </StyledListSection>
              </Grid>
              <StyledListSection>
                <Typography variant="body2">
                  <Fab color="secondary" aria-label="edit" size="small">
                    <MoreVertIcon />
                  </Fab>
                </Typography>
              </StyledListSection>
            </StyledListItem>
          </Paper>
        ))}
      </List>
    </Box>
  );
}

export default PlayedList;
