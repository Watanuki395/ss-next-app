"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Button, 
  Fab,
  useTheme,
  Skeleton
  , Chip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import { useAuth } from "../context/AuthContextSupabase";
import { getGamesByUserId, addParticipantToGame } from "../supabase/api";
import GameCard from "@/components/Dashboard/GameCard";
import StatCard from "@/components/Dashboard/StatCard";
import CustomModal from "@/components/Modal/CustomModal";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";

// Styled Components
const DashboardContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  paddingBottom: theme.spacing(8),
}));

const WelcomeBanner = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #D32F2F 0%, #1B5E20 100%)",
  borderRadius: "0 0 32px 32px",
  padding: theme.spacing(6, 2, 8, 2),
  color: "#FFFFFF",
  marginBottom: theme.spacing(4),
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
      radial-gradient(circle at 20% 50%, rgba(255, 215, 0, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: "none",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 700,
  fontSize: "1.5rem",
  marginBottom: theme.spacing(3),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  border: `2px dashed ${theme.palette.divider}`,
}));

function Dashboard() {
  const router = useRouter();
  const theme = useTheme();
  const { user, userInfo } = useAuth();
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [gamesUpdated, setGamesUpdated] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    active: 0,
    total: 0,
    completed: 0
  });

  const [notify, setNotify] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "",
  });

  const [modalAction, setOpenDeleteModal] = useState({
    id: "",
    isOpen: false,
    type: "input",
    title: "",
    message: "",
  });

  useEffect(() => {
    let isCancelled = false;
    if (user) {
      setLoading(true);
      // Capture the unsubscribe function returned by the subscription helper
      const unsubscribe = getGamesByUserId(user.id, (response) => {
        if (!isCancelled) {
          setGames(response);

          // Calculate stats
          const active = response.filter(g => g.game_active || g.gameActive).length;
          setStats({
            total: response.length,
            active: active,
            completed: response.length - active // Simplificación por ahora
          });

          setLoading(false);
        }
      });

      // Cleanup subscription on unmount or user change
      return () => {
        isCancelled = true;
        if (typeof unsubscribe === 'function') unsubscribe();
      };
    } else {
      // If there is no user, reset state
      setGames([]);
      setLoading(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [user, gamesUpdated]);

  const handleCreateClick = () => {
    router.push("/game/create");
  };

  const handleGameClick = (gameId) => {
    router.push(`/game/${gameId}`);
  };

  const handleJoinClick = () => {
    setOpenDeleteModal({
      id: "",
      isOpen: true,
      title: "Ingresa el Código del Juego:",
      message: "Pídele el código al organizador",
      type: "input"
    });
  };

  const handleSubmitModal = async (gameIdToJoin) => {
    try {
      setLoading(true);
      const result = await addParticipantToGame(
        gameIdToJoin.toUpperCase(),
        user.id,
        userInfo.fname
      );

      if (result.success) {
        setGamesUpdated((prev) => !prev);
        setNotify({
          isOpen: true,
          type: "success",
          title: "¡Te uniste al juego!",
          message: result.message,
        });
      } else {
        setNotify({
          isOpen: true,
          type: "warning",
          title: "No se pudo unir",
          message: result.message,
        });
      }
    } catch (error) {
      console.error(error);
      setNotify({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Ocurrió un error inesperado",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <DashboardContainer>
        <WelcomeBanner>
          <Container maxWidth="lg">
            <Box sx={{ position: "relative", zIndex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, fontFamily: '"Poppins", sans-serif' }}>
                ¡Hola, {userInfo?.fname || "Secret Santa"}! 🎅
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>
                Bienvenido a tu panel de control de regalos
              </Typography>
              
              <Box sx={{ mt: 4, display: "flex", gap: 2 }}>
                <Button 
                  variant="contained" 
                  size="large"
                  startIcon={<AddIcon />}
                  onClick={handleCreateClick}
                  sx={{ 
                    backgroundColor: "#FFFFFF", 
                    color: "#D32F2F",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#F5F5F5" }
                  }}
                >
                  Crear Juego
                </Button>
                <Button 
                  variant="outlined" 
                  size="large"
                  startIcon={<PersonAddIcon />}
                  onClick={handleJoinClick}
                  sx={{ 
                    borderColor: "rgba(255,255,255,0.5)", 
                    color: "#FFFFFF",
                    "&:hover": { borderColor: "#FFFFFF", backgroundColor: "rgba(255,255,255,0.1)" }
                  }}
                >
                  Unirse a Juego
                </Button>
              </Box>
            </Box>
          </Container>
        </WelcomeBanner>

        <Container maxWidth="lg" sx={{ mt: -6 }}>
          {/* Stats Section */}
          <Grid container spacing={3} sx={{ mb: 6 }}>
            <Grid item xs={12} md={4}>
              <StatCard 
                title="Juegos Totales" 
                value={stats.total} 
                icon={<CardGiftcardIcon />} 
                color="#D32F2F"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard 
                title="Juegos Activos" 
                value={stats.active} 
                icon={<EmojiEventsIcon />} 
                color="#1B5E20"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box 
                onClick={() => router.push('/wishlist')}
                sx={{ height: '100%', cursor: 'pointer' }}
              >
                <StatCard 
                  title="Mi Lista de Deseos" 
                  value="Ver Lista" 
                  icon={<CardGiftcardIcon />} 
                  color="#FF9800"
                />
              </Box>
            </Grid>
          </Grid>

          {/* Games Section */}
          <Box sx={{ mb: 4 }}>
              <SectionTitle>
                Tus Intercambios
              </SectionTitle>

              {/* Summary of active games with codes */}
              {games.length > 0 && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                    Juegos activos: {stats.active}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {games.filter(g => g.game_active || g.gameActive).slice(0, 8).map(g => (
                      <Link key={g.id || g.gameId || g.game_id} href={`/join/${g.game_id || g.gameId || (g.id || '').slice(0,6)}`}>
                        <a>
                          <Chip label={g.game_id || g.gameId || g.gameId?.toUpperCase() || (g.id || '').slice(0, 6)} size="small" clickable />
                        </a>
                      </Link>
                    ))}
                  </Box>
                </Box>
              )}

              {games.length > 0 ? (
              <Grid container spacing={3}>
                {games.map((game) => (
                  <Grid item xs={12} md={6} lg={4} key={game.id || game.gameId || game.game_id}>
                    <GameCard 
                      game={game} 
                      onClick={() => handleGameClick(game.id || game.gameId || game.game_id)} 
                    />
                  </Grid>
                ))}
              </Grid>
            ) : loading ? (
              <Grid container spacing={3}>
                {[1, 2, 3].map((n) => (
                  <Grid item xs={12} md={6} lg={4} key={`skeleton-${n}`}>
                    <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <EmptyState>
                <CardGiftcardIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Aún no tienes juegos
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  ¡Crea tu primer intercambio o únete a uno existente para empezar la diversión!
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleCreateClick}
                >
                  Crear mi primer juego
                </Button>
              </EmptyState>
            )}
          </Box>
        </Container>

        <CustomModal
          modalAction={modalAction}
          setOpen={setOpenDeleteModal}
          onSubmit={handleSubmitModal}
        />
        <CustumAlert notify={notify} setNotify={setNotify} />
      </DashboardContainer>
    </ProtectedRoute>
  );
}

// Helper icon for stats
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

export default Dashboard;
