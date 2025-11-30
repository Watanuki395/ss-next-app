"use client";
import React from "react";
import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Animaciones
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: "#FFFFFF",
  
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
  textAlign: "center",
  marginBottom: theme.spacing(2),
  color: "#212121",
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "1.125rem",
  textAlign: "center",
  color: "#757575",
  marginBottom: theme.spacing(8),
  maxWidth: "700px",
  margin: "0 auto",
  marginBottom: theme.spacing(8),
}));

const StepCard = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(3),
}));

const StepNumber = styled(Box)(({ theme }) => ({
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)",
  color: "#FFFFFF",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  fontWeight: 700,
  margin: "0 auto",
  marginBottom: theme.spacing(3),
  boxShadow: "0 8px 24px rgba(211, 47, 47, 0.3)",
}));

const StepTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  fontSize: "1.25rem",
  marginBottom: theme.spacing(2),
  color: "#212121",
}));

const StepDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "1rem",
  lineHeight: 1.7,
  color: "#616161",
}));

const BenefitItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  
  "& .benefit-icon": {
    color: "#1B5E20",
    fontSize: "1.5rem",
    flexShrink: 0,
  },
  
  "& .benefit-text": {
    fontFamily: '"Inter", sans-serif',
    fontSize: "1rem",
    color: "#424242",
    lineHeight: 1.6,
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(2, 4),
  borderRadius: "50px",
  textTransform: "none",
  background: "linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)",
  color: "#FFFFFF",
  boxShadow: "0 8px 24px rgba(211, 47, 47, 0.3)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 12px 32px rgba(211, 47, 47, 0.4)",
    background: "linear-gradient(135deg, #9A0007 0%, #7F0000 100%)",
  },
}));

const steps = [
  {
    number: "1",
    title: "Ingresa los participantes",
    description: "Agrega los nombres y emails de todos los que jugarán. Mínimo 3 personas.",
  },
  {
    number: "2",
    title: "El sistema asigna automáticamente",
    description: "Nuestro algoritmo genera emparejamientos aleatorios garantizando que nadie se regale a sí mismo.",
  },
  {
    number: "3",
    title: "Todos reciben su asignación",
    description: "Cada participante recibe un email con el nombre de la persona a quien debe regalar.",
  },
];

const benefits = [
  "100% anónimo hasta el día del intercambio",
  "Sin límite de participantes",
  "Emails automáticos con toda la información",
  "Opción de establecer presupuesto",
  "Recordatorios antes de la fecha",
  "Modo Ultra Secret Santa disponible",
];

export default function HowItWorks() {
  return (
    <>
      {/* Cómo Funciona */}
      <SectionContainer>
        <Container maxWidth="lg">
          <SectionTitle>
            ¿Cómo funciona?
          </SectionTitle>
          
          <SectionSubtitle>
            En solo 3 pasos simples tendrás tu juego de Amigo Secreto listo
          </SectionSubtitle>

          <Grid container spacing={4}>
            {steps.map((step, index) => (
              <Grid 
                item 
                xs={12} 
                md={4} 
                key={index}
                sx={{
                  animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <StepCard>
                  <StepNumber>{step.number}</StepNumber>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </StepCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </SectionContainer>

      {/* Beneficios */}
      <SectionContainer sx={{ background: "#FAFAFA" }}>
        <Container maxWidth="md">
          <SectionTitle>
            ¿Por qué usar nuestra plataforma?
          </SectionTitle>
          
          <SectionSubtitle>
            Diseñada para hacer tu intercambio de regalos más fácil y divertido
          </SectionSubtitle>

          <Grid container spacing={3}>
            {benefits.map((benefit, index) => (
              <Grid 
                item 
                xs={12} 
                sm={6} 
                key={index}
                sx={{
                  animation: `${fadeInUp} 0.6s ease-out ${index * 0.05}s both`,
                }}
              >
                <BenefitItem>
                  <CheckCircleIcon className="benefit-icon" />
                  <Typography className="benefit-text">{benefit}</Typography>
                </BenefitItem>
              </Grid>
            ))}
          </Grid>

          <Box 
            sx={{ 
              textAlign: "center", 
              mt: 6,
              animation: `${fadeInUp} 0.6s ease-out 0.4s both`,
            }}
          >
            <CTAButton
              size="large"
              endIcon={<ArrowForwardIcon />}
              href="/quick-play"
            >
              Crear Mi Primer Juego
            </CTAButton>
          </Box>
        </Container>
      </SectionContainer>
    </>
  );
}
