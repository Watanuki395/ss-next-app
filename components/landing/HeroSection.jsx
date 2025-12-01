"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Stack, TextField, Paper } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Link from "next/link";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";

// Animaciones
const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

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

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const snowfall = keyframes`
  0% {
    transform: translateY(-10vh) translateX(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) translateX(100px);
    opacity: 0;
  }
`;

const giftFloat = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  25% {
    transform: translateY(-20px) rotate(5deg);
  }
  75% {
    transform: translateY(-10px) rotate(-5deg);
  }
`;

// Styled Components
const HeroContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  minHeight: "90vh",
  display: "flex",
  alignItems: "center",
  background: "linear-gradient(135deg, #D32F2F 0%, #1B5E20 100%)",
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
  
  [theme.breakpoints.down("md")]: {
    minHeight: "80vh",
  },
}));

// Contenedor de partículas de nieve
const SnowContainer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  overflow: "hidden",
  zIndex: 1,
});

// Partícula de nieve individual
const Snowflake = styled(Box)(({ delay, duration, left }) => ({
  position: "absolute",
  top: "-10vh",
  left: `${left}%`,
  width: "10px",
  height: "10px",
  background: "white",
  borderRadius: "50%",
  opacity: 0.8,
  animation: `${snowfall} ${duration}s linear ${delay}s infinite`,
  boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
}));

// Contenedor de regalos flotantes
const GiftsContainer = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  pointerEvents: "none",
  zIndex: 1,
});

// Regalo flotante
const FloatingGift = styled(Box)(({ delay, top, left }) => ({
  position: "absolute",
  top: `${top}%`,
  left: `${left}%`,
  fontSize: "2rem",
  opacity: 0.3,
  animation: `${giftFloat} 4s ease-in-out ${delay}s infinite`,
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  padding: theme.spacing(8, 2),
  
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(6, 2),
  },
}));

const MainHeadline = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 800,
  fontSize: "clamp(2rem, 5vw, 4rem)",
  lineHeight: 1.2,
  color: "#FFFFFF",
  marginBottom: theme.spacing(3),
  animation: `${fadeInUp} 0.8s ease-out`,
  textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  
  "& .highlight": {
    background: "linear-gradient(90deg, #FFD700 0%, #FFA500 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: `${shimmer} 3s infinite linear`,
    backgroundSize: "1000px 100%",
  },
}));

const SubHeadline = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "clamp(1rem, 2vw, 1.5rem)",
  lineHeight: 1.6,
  color: "rgba(255, 255, 255, 0.95)",
  marginBottom: theme.spacing(5),
  maxWidth: "800px",
  margin: "0 auto",
  marginBottom: theme.spacing(5),
  animation: `${fadeInUp} 0.8s ease-out 0.2s both`,
  textShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
}));

const CTAButton = styled(Button)(({ theme, variant }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  fontSize: "1.125rem",
  padding: theme.spacing(2, 4),
  borderRadius: "50px",
  textTransform: "none",
  boxShadow: variant === "contained" 
    ? "0 8px 24px rgba(0, 0, 0, 0.3)"
    : "none",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: variant === "contained"
      ? "0 12px 32px rgba(0, 0, 0, 0.4)"
      : "0 4px 12px rgba(255, 255, 255, 0.2)",
  },
  
  "&:active": {
    transform: "translateY(0)",
  },
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "1rem",
    padding: theme.spacing(1.5, 3),
  },
}));

const FeatureBadge = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  gap: theme.spacing(1),
  background: "rgba(255, 215, 0, 0.2)",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 215, 0, 0.3)",
  borderRadius: "50px",
  padding: theme.spacing(1, 2),
  marginBottom: theme.spacing(4),
  animation: `${fadeInUp} 0.8s ease-out 0.4s both, ${float} 3s ease-in-out infinite`,
  
  "& .badge-icon": {
    fontSize: "1.25rem",
  },
  
  "& .badge-text": {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#FFD700",
    textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
  },
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(6),
  marginTop: theme.spacing(8),
  animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
  
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: theme.spacing(3),
  },
}));

const StatItem = styled(Box)(({ theme }) => ({
  textAlign: "center",
  
  "& .stat-number": {
    fontFamily: '"Poppins", sans-serif',
    fontSize: "2.5rem",
    fontWeight: 800,
    color: "#FFD700",
    lineHeight: 1,
    marginBottom: theme.spacing(1),
    textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  },
  
  "& .stat-label": {
    fontFamily: '"Inter", sans-serif',
    fontSize: "0.875rem",
    color: "rgba(255, 255, 255, 0.8)",
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },
}));

export default function HeroSection() {
  const router = useRouter();
  const [gameCode, setGameCode] = useState("");

  const handleSearchGame = () => {
    if (gameCode.trim()) {
      router.push(`/game/status/${gameCode.trim()}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchGame();
    }
  };

  // Generar partículas de nieve
  const snowflakes = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
  }));

  // Generar regalos flotantes
  const gifts = [
    { id: 1, emoji: "🎁", top: 15, left: 10, delay: 0 },
    { id: 2, emoji: "🎄", top: 25, left: 85, delay: 1 },
    { id: 3, emoji: "🎅", top: 45, left: 5, delay: 2 },
    { id: 4, emoji: "⭐", top: 60, left: 90, delay: 0.5 },
    { id: 5, emoji: "🎁", top: 75, left: 15, delay: 1.5 },
    { id: 6, emoji: "🔔", top: 35, left: 95, delay: 2.5 },
  ];

  return (
    <HeroContainer>
      {/* Efecto de nieve */}
      <SnowContainer>
        {snowflakes.map((flake) => (
          <Snowflake
            key={flake.id}
            delay={flake.delay}
            duration={flake.duration}
            left={flake.left}
          />
        ))}
      </SnowContainer>

      {/* Regalos flotantes */}
      <GiftsContainer>
        {gifts.map((gift) => (
          <FloatingGift
            key={gift.id}
            delay={gift.delay}
            top={gift.top}
            left={gift.left}
          >
            {gift.emoji}
          </FloatingGift>
        ))}
      </GiftsContainer>

      <ContentWrapper maxWidth="lg">
        {/* Badge destacado */}
        <FeatureBadge>
          <span className="badge-icon">🎁</span>
          <span className="badge-text">
            Modo Ultra Secret Santa Disponible
          </span>
        </FeatureBadge>

        {/* Headline principal */}
        <MainHeadline variant="h1">
          ¿Cansado de que siempre descubran{" "}
          <span className="highlight">quién te dara regalo</span> en el Amigo Secreto?
        </MainHeadline>

        {/* Subheadline */}
        <SubHeadline variant="h2">
          Organiza el intercambio perfecto con tecnología que mantiene el
          misterio hasta el último momento. Simple, rápido y 100% anónimo.
        </SubHeadline>

        {/* CTAs */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="center"
          sx={{ animation: `${fadeInUp} 0.8s ease-out 0.4s both` }}
        >
          <Link href="/quick-play" passHref legacyBehavior>
            <CTAButton
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#D32F2F",
                "&:hover": {
                  backgroundColor: "#F5F5F5",
                },
              }}
            >
              Crear Juego Rápido
            </CTAButton>
          </Link>

          <Link href="/register" passHref legacyBehavior>
            <CTAButton
              variant="outlined"
              size="large"
              startIcon={<PersonAddIcon />}
              sx={{
                borderColor: "#FFFFFF",
                color: "#FFFFFF",
                borderWidth: "2px",
                "&:hover": {
                  borderColor: "#FFFFFF",
                  borderWidth: "2px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Registrarme para Más
            </CTAButton>
          </Link>
        </Stack>

        {/* Game Code Search Section */}
        <Paper
          elevation={3}
          sx={{
            mt: 6,
            p: 3,
            maxWidth: "600px",
            mx: "auto",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(10px)",
            animation: `${fadeInUp} 0.8s ease-out 0.6s both`,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: "#D32F2F",
              mb: 2,
              textAlign: "center",
            }}
          >
            ¿Ya tienes un código de juego?
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#D32F2F",
              mb: 2,
              textAlign: "center",
            }}
          >
            Ingresa tu código para ver el estado del juego
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              placeholder="Ej: ABC123"
              variant="outlined"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value.toUpperCase())}
              onKeyPress={handleKeyPress}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: "#D32F2F" }} />,
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                },
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearchGame}
              disabled={!gameCode.trim()}
              sx={{
                minWidth: "120px",
                borderRadius: "12px",
                backgroundColor: "#D32F2F",
                "&:hover": {
                  backgroundColor: "#B71C1C",
                },
              }}
            >
              Buscar
            </Button>
          </Box>
        </Paper>

        {/* Estadísticas */}
        <StatsContainer>
          <StatItem>
            <div className="stat-number">10K+</div>
            <div className="stat-label">Juegos Creados</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">50K+</div>
            <div className="stat-label">Participantes Felices</div>
          </StatItem>
          <StatItem>
            <div className="stat-number">100%</div>
            <div className="stat-label">Anónimo</div>
          </StatItem>
        </StatsContainer>
      </ContentWrapper>
    </HeroContainer>
  );
}
