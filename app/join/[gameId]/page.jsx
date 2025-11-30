"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, CircularProgress, Grid, Paper, Avatar, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";
import dayjs from "dayjs";
import { getDocWhereGameCode, addParticipantToGame, getWishlist } from "../../supabase/api";
import { useAuth } from "../../context/AuthContextSupabase";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";

const Header = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)",
  padding: theme.spacing(6, 2),
  color: "#FFFFFF",
  marginBottom: theme.spacing(4),
  borderRadius: "0 0 32px 32px",
}));

export default function JoinGame({ params }) {
  const { gameId } = params;
  const router = useRouter();
  const { user, userInfo } = useAuth();

  const [loading, setLoading] = useState(true);
  const [game, setGame] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, title: "", message: "", type: "" });

  useEffect(() => {
    if (gameId) {
      getDocWhereGameCode("games", gameId, (response) => {
        if (response.success) {
          setGame(response.data);
        } else {
          setNotify({ isOpen: true, title: "No encontrado", message: response.message, type: "error" });
        }
        setLoading(false);
      });
    }
  }, [gameId]);

  const handleJoin = async () => {
    if (!user) {
      router.push(`/login?redirect=/join/${gameId}`);
      return;
    }

    setLoading(true);
    const result = await addParticipantToGame(game.game_id || game.gameId || game.id, user.id, userInfo?.fname || user.email);
    setLoading(false);
    if (result.success) {
      setNotify({ isOpen: true, type: "success", title: "¡Listo!", message: result.message });
    } else {
      setNotify({ isOpen: true, type: "error", title: "Error", message: result.message });
    }
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <CircularProgress />
    </Box>
  );

  if (!game) return (
    <Container maxWidth="md">
      <Typography variant="h6" color="error">Juego no encontrado</Typography>
    </Container>
  );

  return (
    <Container maxWidth="lg">
      <Header>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>{game.game_name || game.gameName}</Typography>
        <Typography variant="body2">Código: <Chip label={game.game_id || game.gameId || (game.id)?.slice(0,6)} size="small" /></Typography>
      </Header>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1">Fecha</Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>{dayjs(game.date_of_game || game.dateOfGame).format('DD MMM YYYY')}</Typography>

            <Typography variant="subtitle1">Participantes ({game.players?.length || 0})</Typography>
            <Box sx={{ mt: 2 }}>
              {game.players?.map((p, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>{p.userName?.charAt(0) || p.name?.charAt(0)}</Avatar>
                  <Typography>{p.userName || p.name}</Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="subtitle1">Acciones</Typography>
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button variant="contained" onClick={handleJoin} disabled={!game.game_active}>Unirse</Button>
              <Button variant="outlined" onClick={() => router.push(`/`)}>Regresar</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <CustumAlert notify={notify} setNotify={setNotify} />
    </Container>
  );
}

