"use client";
import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Link from "next/link";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EmailIcon from "@mui/icons-material/Email";
import ShareIcon from "@mui/icons-material/Share";
import HomeIcon from "@mui/icons-material/Home";

// Animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`;

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #D32F2F 0%, #1B5E20 100%)",
  padding: theme.spacing(3),
  position: "relative",
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
}));

const SuccessPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  maxWidth: "600px",
  margin: "0 auto",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
  animation: `${fadeIn} 0.6s ease-out`,
  textAlign: "center",
  position: "relative",
  zIndex: 2,
  backgroundColor: theme.palette.background.paper,
  
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
  },
}));

const SuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: "5rem",
  color: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.main,
  marginBottom: theme.spacing(2),
  animation: `${bounce} 1s ease-in-out`,
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 700,
  fontSize: "2.5rem",
  marginBottom: theme.spacing(2),
  color: theme.palette.text.primary,
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "1.125rem",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
  lineHeight: 1.6,
}));

const TrackingCode = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#2C2C2C" : "#FAFAFA",
  padding: theme.spacing(2),
  borderRadius: "12px",
  border: `2px dashed ${theme.palette.primary.main}`,
  marginBottom: theme.spacing(4),
}));

const CodeText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Courier New", monospace',
  fontSize: "1.5rem",
  fontWeight: 700,
  color: theme.palette.primary.main,
  letterSpacing: "0.1em",
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  padding: theme.spacing(1.5, 3),
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "1rem",
  margin: theme.spacing(1),
}));

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1B3320" : "#E8F5E9",
  padding: theme.spacing(3),
  borderRadius: "12px",
  marginTop: theme.spacing(4),
  textAlign: "left",
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  marginBottom: theme.spacing(2),
  
  "&:last-child": {
    marginBottom: 0,
  },
}));

export default function SuccessPage() {
  // TODO: Get actual tracking code from URL params or state
  const trackingCode = "SS-" + Math.random().toString(36).substr(2, 6).toUpperCase();
  
  return (
    <PageContainer>
      <Container maxWidth="md">
        <SuccessPaper>
          <SuccessIcon />
          
          <Title>¡Juego Creado!</Title>
          
          <Subtitle>
            Las asignaciones de Secret Santa se han generado exitosamente y los emails han sido enviados a todos los participantes.
          </Subtitle>
          
          <TrackingCode>
            <Typography variant="caption" sx={{ color: "#757575", display: "block", mb: 1 }}>
              Código de Seguimiento
            </Typography>
            <CodeText>{trackingCode}</CodeText>
            <Typography variant="caption" sx={{ color: "#757575", display: "block", mt: 1 }}>
              Guarda este código para consultar el estado de tu juego
            </Typography>
          </TrackingCode>
          
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/" passHref legacyBehavior>
              <ActionButton
                variant="contained"
                startIcon={<HomeIcon />}
                sx={(theme) => ({
                  background: theme.palette.mode === "dark" 
                    ? "linear-gradient(135deg, #FF6659 0%, #FF8A80 100%)"
                    : "linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)",
                  color: "#FFFFFF",
                  "&:hover": {
                    background: theme.palette.mode === "dark"
                      ? "linear-gradient(135deg, #FF8A80 0%, #FFAB91 100%)"
                      : "linear-gradient(135deg, #9A0007 0%, #7F0000 100%)",
                  },
                })}
              >
                Volver al Inicio
              </ActionButton>
            </Link>
            
            <Link href="/quick-play" passHref legacyBehavior>
              <ActionButton
                variant="outlined"
                sx={(theme) => ({
                  borderColor: theme.palette.primary.main,
                  color: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.mode === "dark" 
                      ? "rgba(255, 102, 89, 0.1)" 
                      : "rgba(211, 47, 47, 0.1)",
                    borderColor: theme.palette.primary.light,
                  },
                })}
              >
                Crear Otro Juego
              </ActionButton>
            </Link>
          </Box>
          
          <InfoBox>
            <Typography
              variant="h6"
              sx={(theme) => ({
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600,
                mb: 2,
                color: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.main,
              })}
            >
              ¿Qué sigue?
            </Typography>
            
            <InfoItem>
              <EmailIcon sx={(theme) => ({ color: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.main, mr: 2, mt: 0.5 })} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: "text.primary" }}>
                  Revisa tu email
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Recibirás una copia de confirmación con todos los detalles del juego
                </Typography>
              </Box>
            </InfoItem>
            
            <InfoItem>
              <CheckCircleIcon sx={(theme) => ({ color: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.main, mr: 2, mt: 0.5 })} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: "text.primary" }}>
                  Participantes notificados
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Todos los participantes han recibido un email con su asignación secreta
                </Typography>
              </Box>
            </InfoItem>
            
            <InfoItem>
              <ShareIcon sx={(theme) => ({ color: theme.palette.mode === "dark" ? theme.palette.secondary.light : theme.palette.secondary.main, mr: 2, mt: 0.5 })} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 0.5, color: "text.primary" }}>
                  Comparte el código
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Los participantes pueden usar el código {trackingCode} para consultar detalles
                </Typography>
              </Box>
            </InfoItem>
          </InfoBox>
          
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 4,
              color: "#BDBDBD",
              fontSize: "0.75rem",
            }}
          >
            💡 Tip: Registra una cuenta para acceder a features premium como listas de deseos, recordatorios automáticos y más
          </Typography>
        </SuccessPaper>
      </Container>
    </PageContainer>
  );
}
