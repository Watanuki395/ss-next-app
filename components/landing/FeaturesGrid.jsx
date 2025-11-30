"use client";
import React from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LockIcon from "@mui/icons-material/Lock";
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

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// Styled Components
const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(12, 0),
  background: "#FAFAFA",
  
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(8, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 700,
  fontSize: "clamp(2rem, 4vw, 3rem)",
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
  maxWidth: "600px",
  margin: "0 auto",
  marginBottom: theme.spacing(8),
}));

const FeatureCard = styled(Card)(({ theme, featured }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "24px",
  border: featured ? "2px solid #FFD700" : "1px solid #E0E0E0",
  boxShadow: featured 
    ? "0 12px 48px rgba(255, 215, 0, 0.2)"
    : "0 4px 12px rgba(0, 0, 0, 0.08)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "visible",
  background: "#FFFFFF",
  
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: featured
      ? "0 16px 56px rgba(255, 215, 0, 0.3)"
      : "0 8px 24px rgba(0, 0, 0, 0.12)",
  },
  
  ...(featured && {
    "&::before": {
      content: '"DESTACADO"',
      position: "absolute",
      top: "-12px",
      right: "24px",
      background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
      color: "#FFFFFF",
      fontSize: "0.75rem",
      fontWeight: 700,
      padding: "4px 16px",
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(255, 215, 0, 0.4)",
      animation: `${pulse} 2s ease-in-out infinite`,
    },
  }),
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  background: color || "linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)",
  boxShadow: "0 8px 24px rgba(211, 47, 47, 0.3)",
  
  "& .MuiSvgIcon-root": {
    fontSize: "2.5rem",
    color: "#FFFFFF",
  },
}));

const FeatureTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  fontSize: "1.5rem",
  marginBottom: theme.spacing(2),
  color: "#212121",
}));

const FeatureDescription = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "1rem",
  lineHeight: 1.7,
  color: "#616161",
  marginBottom: theme.spacing(3),
  flexGrow: 1,
}));

const LearnMoreButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  textTransform: "none",
  color: "#D32F2F",
  padding: theme.spacing(1, 0),
  
  "&:hover": {
    background: "transparent",
    "& .MuiSvgIcon-root": {
      transform: "translateX(4px)",
    },
  },
  
  "& .MuiSvgIcon-root": {
    transition: "transform 0.3s ease",
  },
}));

const features = [
  {
    icon: <FlashOnIcon />,
    iconColor: "linear-gradient(135deg, #FF6659 0%, #D32F2F 100%)",
    title: "Modo Rápido",
    description:
      "Sin registro, sin complicaciones. Solo ingresa los emails de los participantes y listo. El sistema asigna automáticamente y envía las notificaciones en segundos.",
    benefits: ["Sin crear cuenta", "Asignación instantánea", "Emails automáticos"],
    link: "/quick-play",
    featured: false,
  },
  {
    icon: <LockIcon />,
    iconColor: "linear-gradient(135deg, #FFD700 0%, #FFA500 100%)",
    title: "Ultra Secret Santa",
    description:
      "El modo más misterioso. Los participantes solo ven la lista de deseos, no el nombre. La identidad se revela únicamente el día del intercambio. ¡Máximo suspenso!",
    benefits: ["Anonimato total", "Solo wishlist visible", "Revelación programada"],
    link: "/about",
    featured: true,
  },
  {
    icon: <DashboardIcon />,
    iconColor: "linear-gradient(135deg, #4C8C4A 0%, #1B5E20 100%)",
    title: "Modo Completo",
    description:
      "Regístrate para acceder a todas las funciones: dashboard personalizado, listas de deseos, presupuestos, recordatorios automáticos y mucho más.",
    benefits: ["Dashboard completo", "Listas de deseos", "Notificaciones"],
    link: "/register",
    featured: false,
  },
];

export default function FeaturesGrid() {
  return (
    <SectionContainer>
      <Container maxWidth="lg">
        <SectionTitle>
          Elige cómo quieres jugar
        </SectionTitle>
        
        <SectionSubtitle>
          Desde un juego rápido hasta una experiencia completa con todas las funciones
        </SectionSubtitle>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid 
              item 
              xs={12} 
              md={4} 
              key={index}
              sx={{
                animation: `${fadeInUp} 0.6s ease-out ${index * 0.1}s both`,
              }}
            >
              <FeatureCard featured={feature.featured}>
                <CardContent sx={{ p: 4, display: "flex", flexDirection: "column", height: "100%" }}>
                  <IconWrapper color={feature.iconColor}>
                    {feature.icon}
                  </IconWrapper>

                  <FeatureTitle>
                    {feature.title}
                  </FeatureTitle>

                  <FeatureDescription>
                    {feature.description}
                  </FeatureDescription>

                  <Box sx={{ mb: 3 }}>
                    {feature.benefits.map((benefit, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 1,
                        }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: feature.featured ? "#FFD700" : "#D32F2F",
                          }}
                        />
                        <Typography
                          sx={{
                            fontFamily: '"Inter", sans-serif',
                            fontSize: "0.875rem",
                            color: "#616161",
                          }}
                        >
                          {benefit}
                        </Typography>
                      </Box>
                    ))}
                  </Box>

                  <LearnMoreButton
                    endIcon={<ArrowForwardIcon />}
                    href={feature.link}
                  >
                    Saber más
                  </LearnMoreButton>
                </CardContent>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </SectionContainer>
  );
}
