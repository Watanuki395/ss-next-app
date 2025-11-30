"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Paper,
  Avatar,
  Chip,
  IconButton,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  useTheme
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useAuth } from "../../context/AuthContextSupabase";
import { getDocWhereGameId, getWishlist } from "../../supabase/api";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";
import dayjs from "dayjs";

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const reveal = keyframes`
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
`;

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  paddingBottom: theme.spacing(8),
}));

const Header = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
  padding: theme.spacing(6, 2),
  color: "#FFFFFF",
  marginBottom: theme.spacing(4),
  borderRadius: "0 0 32px 32px",
  position: "relative",
  overflow: "hidden",
}));

const GameInfoCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "24px",
  height: "100%",
  boxShadow: theme.shadows[4],
}));

const ParticipantRow = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  borderRadius: "12px",
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
}));

const RevealCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  background: "linear-gradient(135deg, #D32F2F 0%, #C62828 100%)",
  color: "white",
  textAlign: "center",
  boxShadow: theme.shadows[8],
  animation: `${float} 3s ease-in-out infinite`,
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
}));

export default function GameDetailsPage({ params }) {
  const router = useRouter();
  const theme = useTheme();
  const { gameId } = params;
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, title: "", message: "", type: "" });
  
  // State for Draw
  const [drawing, setDrawing] = useState(false);
  
  // State for Reveal
  const [revealed, setRevealed] = useState(false);
  const [myAssignment, setMyAssignment] = useState(null);
  const [assigneeWishlist, setAssigneeWishlist] = useState([]);

  useEffect(() => {
    if (gameId) {
      fetchGameData();
    }
  }, [gameId]);

  const fetchGameData = () => {
    getDocWhereGameId("games", gameId, (response) => {
      if (response.data) {
        setGame(response.data);
        
        // Check if I have an assignment
        if (user) {
          const me = response.data.players?.find(p => p.id === user.id);
          if (me && me.assignedTo) {
            setMyAssignment(me.assignedTo);
            fetchAssigneeWishlist(me.assignedTo.id);
          }
        }
      }
      setLoading(false);
    });
  };

  const fetchAssigneeWishlist = async (assigneeId) => {
    const result = await getWishlist(assigneeId);
    if (result.success) {
      setAssigneeWishlist(result.data);
    }
  };

  const handleDraw = async () => {
    if (!confirm("¿Estás seguro de realizar el sorteo? Se enviarán correos a todos los participantes.")) return;
    
    setDrawing(true);
    try {
      const response = await fetch('/api/game/draw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          gameId: game.game_id,
          organizerEmail: user.email 
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setNotify({ isOpen: true, type: "success", title: "¡Sorteo Exitoso!", message: "Los correos han sido enviados." });
        fetchGameData(); // Refresh data
      } else {
        throw new Error(data.error || "Error en el sorteo");
      }
    } catch (error) {
      setNotify({ isOpen: true, type: "error", title: "Error", message: error.message });
    } finally {
      setDrawing(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/join/${game.game_id}`;
    navigator.clipboard.writeText(url);
    setNotify({ isOpen: true, type: "success", title: "Copiado", message: "Enlace de invitación copiado al portapapeles" });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!game) return null;

  const isOrganizer = game.created_by === user?.id;
  const isDraft = !game.players?.some(p => p.assignedTo);

  return (
    <ProtectedRoute>
      <PageContainer>
        <Header>
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <IconButton onClick={() => router.push('/dashboard')} sx={{ color: "white", mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Poppins", sans-serif' }}>
                {game.game_name}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2, ml: 7 }}>
              <Chip icon={<CalendarTodayIcon sx={{ color: "white !important" }} />} label={dayjs(game.date_of_game).format("DD MMM YYYY")} sx={{ color: "white", borderColor: "white" }} variant="outlined" />
              {game.game_amount > 0 && (
                <Chip icon={<AttachMoneyIcon sx={{ color: "white !important" }} />} label={`₡${game.game_amount}`} sx={{ color: "white", borderColor: "white" }} variant="outlined" />
              )}
            </Box>
          </Container>
        </Header>

        <Container maxWidth="lg" sx={{ mt: -6 }}>
          <Grid container spacing={4}>
            {/* Left Column: Game Info & Participants */}
            <Grid item xs={12} md={8}>
              {/* Reveal Section (Only if drawn) */}
              {!isDraft && myAssignment && (
                <Box sx={{ mb: 4 }}>
                  {!revealed ? (
                    <RevealCard onClick={() => setRevealed(true)}>
                      <EmojiEventsIcon sx={{ fontSize: 60, mb: 2 }} />
                      <Typography variant="h5" fontWeight="bold">
                        ¡Tu Amigo Secreto ha sido asignado!
                      </Typography>
                      <Typography variant="body1">
                        Toca aquí para revelar a quién debes regalar 🎁
                      </Typography>
                    </RevealCard>
                  ) : (
                    <Paper sx={{ p: 4, borderRadius: "24px", textAlign: "center", animation: `${reveal} 0.5s ease-out`, border: `2px solid ${theme.palette.primary.main}` }}>
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        Debes comprarle un regalo a:
                      </Typography>
                      <Avatar sx={{ width: 80, height: 80, margin: "0 auto 16px", bgcolor: theme.palette.primary.main, fontSize: 32 }}>
                        {myAssignment.name.charAt(0)}
                      </Avatar>
                      <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
                        {myAssignment.name}
                      </Typography>
                      
                      {assigneeWishlist.length > 0 ? (
                        <Box sx={{ mt: 3, textAlign: "left" }}>
                          <Divider sx={{ mb: 2 }}>Sus Deseos</Divider>
                          <Grid container spacing={2}>
                            {assigneeWishlist.map((item) => (
                              <Grid item xs={12} key={item.id}>
                                <Box sx={{ p: 2, bgcolor: theme.palette.action.hover, borderRadius: 2 }}>
                                  <Typography fontWeight="bold">{item.item_name}</Typography>
                                  {item.item_note && <Typography variant="body2">{item.item_note}</Typography>}
                                  {item.item_link && (
                                    <Button size="small" href={item.item_link} target="_blank">Ver Enlace</Button>
                                  )}
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                          Esta persona aún no ha agregado deseos a su lista.
                        </Typography>
                      )}
                    </Paper>
                  )}
                </Box>
              )}

              <GameInfoCard>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                  <Typography variant="h6" fontWeight="bold">Participantes ({game.players?.length || 0})</Typography>
                  {isOrganizer && isDraft && (
                    <Button startIcon={<ShareIcon />} onClick={handleShare}>
                      Invitar
                    </Button>
                  )}
                </Box>
                
                <Grid container spacing={2}>
                  {game.players?.map((player, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ParticipantRow>
                        <Avatar sx={{ width: 32, height: 32, mr: 2, bgcolor: theme.palette.secondary.main }}>
                          {player.userName?.charAt(0)}
                        </Avatar>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="subtitle2" fontWeight="600">
                            {player.userName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {player.email || "Sin email"}
                          </Typography>
                        </Box>
                        {player.assignedTo && (
                          <Chip label="Asignado" size="small" color="success" variant="outlined" />
                        )}
                      </ParticipantRow>
                    </Grid>
                  ))}
                </Grid>
              </GameInfoCard>
            </Grid>

            {/* Right Column: Actions */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                {isOrganizer && isDraft && (
                  <Paper sx={{ p: 3, borderRadius: "24px", bgcolor: theme.palette.primary.light, color: "white" }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      Panel de Organizador
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
                      Cuando todos estén listos, realiza el sorteo para asignar los amigos secretos.
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      size="large"
                      onClick={handleDraw}
                      disabled={drawing || (game.players?.length < 3)}
                      sx={{ 
                        bgcolor: "white", 
                        color: theme.palette.primary.main,
                        "&:hover": { bgcolor: "rgba(255,255,255,0.9)" }
                      }}
                    >
                      {drawing ? "Realizando Sorteo..." : "Realizar Sorteo 🎲"}
                    </Button>
                    {game.players?.length < 3 && (
                      <Typography variant="caption" sx={{ display: "block", mt: 1, textAlign: "center" }}>
                        Mínimo 3 participantes
                      </Typography>
                    )}
                  </Paper>
                )}

                <Paper sx={{ p: 3, borderRadius: "24px" }}>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Tu Lista de Deseos
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    Asegúrate de tener tu lista actualizada para que tu Secret Santa sepa qué regalarte.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    startIcon={<CardGiftcardIcon />}
                    onClick={() => router.push('/wishlist')}
                  >
                    Gestionar mi Lista
                  </Button>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>

        <CustumAlert notify={notify} setNotify={setNotify} />
      </PageContainer>
    </ProtectedRoute>
  );
}
