"use client";
import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
  Paper,
  Chip,
  Stack,
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Image from "next/image";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SecurityIcon from "@mui/icons-material/Security";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

// Animations
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

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

// Styled Components
const HeroSection = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #D32F2F 0%, #1B5E20 100%)",
  color: "white",
  padding: theme.spacing(12, 2),
  textAlign: "center",
  position: "relative",
  overflow: "hidden",
  
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  marginBottom: theme.spacing(4),
  position: "relative",
  display: "inline-block",
  
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "60px",
    height: "4px",
    background: "linear-gradient(90deg, #D32F2F, #FFD700)",
    borderRadius: "2px",
  },
}));

const ModeCard = styled(Card)(({ theme, featured }) => ({
  height: "100%",
  borderRadius: "24px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  border: featured ? `2px solid ${theme.palette.primary.main}` : "1px solid #e0e0e0",
  position: "relative",
  overflow: "visible",
  
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
  },
}));

const RuleCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "16px",
  textAlign: "center",
  height: "100%",
  transition: "all 0.3s ease",
  border: "1px solid #e0e0e0",
  
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  },
}));

const IconWrapper = styled(Box)(({ theme, color }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${color}15 0%, ${color}30 100%)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  animation: `${float} 3s ease-in-out infinite`,
  
  "& .MuiSvgIcon-root": {
    fontSize: "2.5rem",
    color: color,
  },
}));

const gameModes = [
  {
    title: "Juego Rápido",
    icon: <RocketLaunchIcon />,
    color: "#FF5722",
    description: "Perfecto para cuando necesitas organizar un intercambio al instante",
    features: [
      "Sin registro necesario",
      "Asignación automática instantánea",
      "Emails enviados automáticamente",
      "Ideal para grupos pequeños",
    ],
    image: "/quick_play_mode_1764602019795.png",
    featured: false,
  },
  {
    title: "Ultra Secreto",
    icon: <SecurityIcon />,
    color: "#1B5E20",
    description: "Máxima privacidad y seguridad para tu intercambio de regalos",
    features: [
      "Registro requerido para mayor seguridad",
      "Dashboard personalizado",
      "Listas de deseos privadas",
      "Notificaciones y recordatorios",
      "Historial de juegos",
    ],
    image: "/ultra_secret_mode_1764602040556.png",
    featured: true,
  },
];

const rules = [
  {
    title: "Asignación Aleatoria",
    description: "Cada participante recibe el nombre de otra persona al azar. Nadie puede ser asignado a sí mismo.",
    icon: <ShuffleIcon />,
    color: "#2196F3",
    image: "/assignment_rule_1764602058218.png",
  },
  {
    title: "Mantén el Secreto",
    description: "Nadie debe revelar a quién le están comprando un regalo. ¡Es un secreto hasta el día del intercambio!",
    icon: <VisibilityOffIcon />,
    color: "#9C27B0",
    image: "/secrecy_rule_1764602074312.png",
  },
  {
    title: "Respeta el Presupuesto",
    description: "Se establece un presupuesto máximo para los regalos. Todos deben respetarlo para mantener la equidad.",
    icon: <AttachMoneyIcon />,
    color: "#FF9800",
    image: "/budget_rule_1764602093492.png",
  },
  {
    title: "Día de Revelación",
    description: "En la fecha acordada, todos se reúnen para intercambiar regalos y revelar quién fue el Amigo Secreto de cada uno.",
    icon: <CardGiftcardIcon />,
    color: "#D32F2F",
    image: "/reveal_rule_1764602111193.png",
  },
];

export default function About() {
  return (
    <Box>
      {/* Hero Section */}
      <HeroSection>
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Typography
            variant="h2"
            fontWeight="800"
            gutterBottom
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              animation: `${fadeInUp} 0.8s ease-out`,
            }}
          >
            ¿Qué es el Amigo Secreto?
          </Typography>
          <Typography
            variant="h5"
            sx={{
              maxWidth: "800px",
              margin: "0 auto",
              opacity: 0.95,
              fontSize: { xs: "1rem", md: "1.25rem" },
              animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
            }}
          >
            Una tradición divertida donde un grupo de personas intercambian regalos de forma anónima.
            Cada persona recibe el nombre de otra a quien deberá regalar, ¡y es un secreto hasta el día del intercambio!
          </Typography>
        </Container>
      </HeroSection>

      {/* Game Modes Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <SectionTitle variant="h3">
            Modos de Juego
          </SectionTitle>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto", mt: 2 }}>
            Elige el modo que mejor se adapte a tus necesidades
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {gameModes.map((mode, index) => (
            <Grid item xs={12} md={6} key={index}>
              <ModeCard elevation={mode.featured ? 4 : 2} featured={mode.featured}>
                {mode.featured && (
                  <Chip
                    label="Recomendado"
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      fontWeight: 600,
                    }}
                  />
                )}
                
                <Box
                  sx={{
                    height: "200px",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "24px 24px 0 0",
                  }}
                >
                  <Image
                    src={mode.image}
                    alt={mode.title}
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </Box>

                <CardContent sx={{ p: 4 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <IconWrapper color={mode.color}>
                      {mode.icon}
                    </IconWrapper>
                    <Typography variant="h4" fontWeight="700">
                      {mode.title}
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" paragraph>
                    {mode.description}
                  </Typography>

                  <Stack spacing={1.5} mt={3}>
                    {mode.features.map((feature, idx) => (
                      <Box key={idx} display="flex" alignItems="center" gap={1}>
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            bgcolor: mode.color,
                          }}
                        />
                        <Typography variant="body2">{feature}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </CardContent>
              </ModeCard>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Rules Section */}
      <Box sx={{ bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.2)' : '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Box textAlign="center" mb={6}>
            <SectionTitle variant="h3">
              Reglas del Juego
            </SectionTitle>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px", mx: "auto", mt: 2 }}>
              Sigue estas reglas para garantizar un intercambio justo y divertido
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {rules.map((rule, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <RuleCard elevation={0}>
                  <Box
                    sx={{
                      width: "100%",
                      height: "180px",
                      position: "relative",
                      mb: 2,
                      borderRadius: "12px",
                      overflow: "hidden",
                    }}
                  >
                    <Image
                      src={rule.image}
                      alt={rule.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Box>

                  <IconWrapper color={rule.color}>
                    {rule.icon}
                  </IconWrapper>

                  <Typography variant="h6" fontWeight="600" gutterBottom>
                    {rule.title}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {rule.description}
                  </Typography>
                </RuleCard>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <SectionTitle variant="h3">
            ¿Cómo Funciona?
          </SectionTitle>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                textAlign: "center", 
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255, 87, 34, 0.1)' : '#FFF3E0',
                borderRadius: "16px",
                border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(255, 87, 34, 0.3)' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.palette.mode === 'dark' 
                    ? '0 8px 24px rgba(255, 87, 34, 0.2)' 
                    : '0 8px 24px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <Typography variant="h1" fontWeight="800" color="primary" gutterBottom>
                1
              </Typography>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Crea tu Juego
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Elige un modo (Rápido o Ultra Secreto), agrega participantes y establece el presupuesto.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                textAlign: "center", 
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(76, 175, 80, 0.1)' : '#E8F5E9',
                borderRadius: "16px",
                border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(76, 175, 80, 0.3)' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.palette.mode === 'dark' 
                    ? '0 8px 24px rgba(76, 175, 80, 0.2)' 
                    : '0 8px 24px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <Typography variant="h1" fontWeight="800" color="success.main" gutterBottom>
                2
              </Typography>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                Realiza el Sorteo
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Nuestro algoritmo asigna aleatoriamente a cada participante. Todos reciben un email con su asignación.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                textAlign: "center", 
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(211, 47, 47, 0.1)' : '#FCE4EC',
                borderRadius: "16px",
                border: (theme) => theme.palette.mode === 'dark' ? '1px solid rgba(211, 47, 47, 0.3)' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: (theme) => theme.palette.mode === 'dark' 
                    ? '0 8px 24px rgba(211, 47, 47, 0.2)' 
                    : '0 8px 24px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              <Typography variant="h1" fontWeight="800" color="error.main" gutterBottom>
                3
              </Typography>
              <Typography variant="h6" fontWeight="600" gutterBottom>
                ¡Intercambien Regalos!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                En la fecha acordada, reúnanse para intercambiar regalos y revelar quién fue el Amigo Secreto de cada uno.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: "linear-gradient(135deg, #D32F2F 0%, #1B5E20 100%)", py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: "center" }}>
          <Typography variant="h3" fontWeight="700" color="white" gutterBottom>
            ¿Listo para Empezar?
          </Typography>
          <Typography variant="h6" color="white" sx={{ opacity: 0.9, mb: 4 }}>
            Organiza tu intercambio de regalos en minutos
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
            <Box
              component="a"
              href="/quick-play"
              sx={{
                display: "inline-block",
                px: 4,
                py: 2,
                bgcolor: "white",
                color: "#D32F2F",
                borderRadius: "50px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
                },
              }}
            >
              Crear Juego Rápido
            </Box>
            <Box
              component="a"
              href="/register"
              sx={{
                display: "inline-block",
                px: 4,
                py: 2,
                border: "2px solid white",
                color: "white",
                borderRadius: "50px",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Registrarme
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
