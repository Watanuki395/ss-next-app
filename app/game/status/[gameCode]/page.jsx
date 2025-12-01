'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Container,
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

export default function PublicGameStatusPage() {
  const theme = useTheme();
  const { gameCode } = useParams();
  
  const [loading, setLoading] = useState(true);
  const [gameInfo, setGameInfo] = useState(null);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [emailError, setEmailError] = useState('');

  useEffect(() => {
    if (gameCode) {
      fetchGameInfo();
    }
  }, [gameCode]);

  const fetchGameInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/game/public-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameCode }),
      });

      const data = await response.json();

      if (response.ok) {
        setGameInfo(data);
      } else {
        setError(data.error || 'No se pudo cargar la información del juego');
      }
    } catch (err) {
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleSendAssignment = async () => {
    if (!email) {
      setEmailError('Por favor ingresa tu email');
      return;
    }

    try {
      setSending(true);
      setEmailError('');
      
      const response = await fetch('/api/game/send-assignment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameCode, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setEmailSent(true);
        setEmail('');
      } else {
        setEmailError(data.error || 'Error al enviar el correo');
      }
    } catch (err) {
      setEmailError('Error al conectar con el servidor');
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 8, textAlign: 'center' }}>
        <CircularProgress />
        <Typography sx={{ mt: 2 }}>Cargando información del juego...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!gameInfo) {
    return null;
  }

  const { game, participants } = gameInfo;

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      {/* Header */}
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          mb: 4, 
          borderRadius: '24px',
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: 'white',
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {game.name}
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          Código: {gameCode}
        </Typography>
      </Paper>

      {/* Game Info */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: '16px' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Información del Juego
        </Typography>
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <CalendarTodayIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography>
              <strong>Fecha del evento:</strong> {new Date(game.date).toLocaleDateString('es-ES', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <AttachMoneyIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography>
              <strong>Presupuesto:</strong> ${game.budget}
            </Typography>
          </Box>

          {game.description && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                {game.description}
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Chip 
              label={game.active ? "Sorteo Realizado ✓" : "Sorteo Pendiente"} 
              color={game.active ? "success" : "warning"}
              sx={{ fontWeight: 'bold' }}
            />
          </Box>
        </Box>
      </Paper>

      {/* Participants */}
      <Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: '16px' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Participantes ({participants.length})
        </Typography>
        <List>
          {participants.map((participant, index) => (
            <ListItem key={index} sx={{ borderBottom: index < participants.length - 1 ? '1px solid #eee' : 'none' }}>
              <PersonIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
              <ListItemText primary={participant.name} />
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Email Assignment Request */}
      {game.active && (
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            borderRadius: '16px',
            background: theme.palette.mode === 'dark' ? '#1e1e1e' : '#f5f5f5',
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            ¿Olvidaste tu asignación?
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Ingresa tu email y te enviaremos tu asignación junto con un código de confirmación.
          </Typography>

          {emailSent ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              ¡Correo enviado! Revisa tu bandeja de entrada. El email incluye tu asignación y un código de confirmación único.
            </Alert>
          ) : (
            <>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                  fullWidth
                  label="Tu Email"
                  variant="outlined"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  disabled={sending}
                  InputProps={{
                    startAdornment: <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                  }}
                />
                <Button
                  variant="contained"
                  onClick={handleSendAssignment}
                  disabled={sending || !email}
                  sx={{ minWidth: '150px' }}
                >
                  {sending ? <CircularProgress size={24} /> : 'Enviar'}
                </Button>
              </Box>

              {emailError && (
                <Alert severity="error">{emailError}</Alert>
              )}

              <Alert severity="info" sx={{ mt: 2 }}>
                <strong>Nota de seguridad:</strong> La información NO se mostrará en pantalla. 
                Solo recibirás un correo en la dirección que proporciones.
              </Alert>
            </>
          )}
        </Paper>
      )}

      {!game.active && (
        <Alert severity="info" sx={{ mt: 3 }}>
          El sorteo aún no se ha realizado. Una vez que el organizador realice el sorteo, 
          podrás solicitar tu asignación aquí.
        </Alert>
      )}
    </Container>
  );
}
