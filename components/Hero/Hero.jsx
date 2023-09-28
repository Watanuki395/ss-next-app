import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";

import { StyledBox, BackgroundImage, StyledContainer } from "./styles";

const HeroSection = () => {
  return (
    <StyledContainer>
      <BackgroundImage>
        <StyledBox>
          <Container>
            <Typography variant="h4" gutterBottom>
              ¡Bienvenido al Juego de Amigo Secreto!
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Descubre la emoción de intercambiar regalos de forma anónima.
            </Typography>
          </Container>
        </StyledBox>
      </BackgroundImage>
    </StyledContainer>
  );
};

export default HeroSection;
