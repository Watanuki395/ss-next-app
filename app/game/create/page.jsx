"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Step,
  Stepper,
  StepLabel,
  Grid,
  IconButton,
  Chip,
  Alert,
  useTheme,
  InputAdornment
} from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/es";

import { useAuth } from "../../context/AuthContextSupabase";
import { saveGameData, updateUserGames } from "../../supabase/api";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundColor: theme.palette.background.default,
  paddingBottom: theme.spacing(8),
}));

const Header = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%)",
  padding: theme.spacing(6, 2),
  color: "#FFFFFF",
  marginBottom: theme.spacing(4),
  borderRadius: "0 0 32px 32px",
  position: "relative",
  overflow: "hidden",
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: "24px",
  boxShadow: theme.shadows[10],
  animation: `${fadeIn} 0.6s ease-out`,
  position: "relative",
  zIndex: 2,
}));

const steps = ["Detalles del Evento", "Participantes", "Confirmación"];

export default function CreateGamePage() {
  const router = useRouter();
  const theme = useTheme();
  const { user, userInfo } = useAuth();
  
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({ isOpen: false, title: "", message: "", type: "" });

  // Form State
  const [gameName, setGameName] = useState("");
  const [gameDescription, setGameDescription] = useState("");
  const [eventDate, setEventDate] = useState(dayjs().add(7, "day"));
  const [budget, setBudget] = useState("");
  
  // Participants (Organizer is auto-added)
  const [participants, setParticipants] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  // Initialize organizer as participant on mount
  React.useEffect(() => {
    if (user && userInfo && participants.length === 0) {
      setParticipants([
        { 
          id: user.id, // Fixed: Supabase uses user.id, not user.uid
          name: userInfo.fname || "Organizador", 
          email: user.email, 
          isOrganizer: true 
        }
      ]);
    }
  }, [user, userInfo]);

  const handleNext = () => {
    if (activeStep === 0) {
      if (!gameName) {
        setNotify({ isOpen: true, type: "warning", title: "Faltan datos", message: "El nombre del juego es obligatorio" });
        return;
      }
    }
    if (activeStep === 1) {
      if (participants.length < 3) {
        setNotify({ isOpen: true, type: "warning", title: "Pocos participantes", message: "Se necesitan al menos 3 personas" });
        return;
      }
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleAddParticipant = () => {
    if (!newName) {
      setNotify({ isOpen: true, type: "warning", title: "Faltan datos", message: "Ingresa el nombre del participante" });
      return;
    }
    
    // Check duplicates
    if (participants.some(p => p.name.toLowerCase() === newName.toLowerCase())) {
      setNotify({ isOpen: true, type: "warning", title: "Duplicado", message: "Ya existe un participante con ese nombre" });
      return;
    }

    setParticipants([...participants, { 
      id: `temp-${Date.now()}`, 
      name: newName, 
      email: newEmail,
      isOrganizer: false
    }]);
    setNewName("");
    setNewEmail("");
  };

  const handleRemoveParticipant = (index) => {
    const p = participants[index];
    if (p.isOrganizer) return; // Cannot remove organizer
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const generateUniqueGameID = () => {
    const currentDate = new Date();
    const randomDigits = currentDate.getMilliseconds().toString().padStart(3, '0');
    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return (uuid.substring(0, 6) + "-" + randomDigits).toUpperCase();
  };

  const handleCreateGame = async () => {
    setLoading(true);
    try {
      const gameID = generateUniqueGameID();
      
      // Format players for DB
      const playersForDb = participants.map(p => ({
        id: (p.id && typeof p.id === 'string' && p.id.startsWith('temp')) ? p.id : p.id, // Safer check
        userName: p.name,
        email: p.email,
        playing: true
      }));

      const gameData = {
        game_name: gameName,
        game_description: gameDescription,
        date_of_game: eventDate.toISOString(),
        game_amount: budget ? parseFloat(budget) : 0,
        game_active: true, // Active by default
        game_id: gameID,
        players: playersForDb,
        created_by: user.id
      };

      const result = await saveGameData("games", null, gameData, user.id);
      
      if (result.success) {
        await updateUserGames(result.gameId, user.id);
        
        setNotify({
          isOpen: true,
          type: "success",
          title: "¡Juego Creado!",
          message: "Redirigiendo al detalle del juego..."
        });
        
        setTimeout(() => {
          router.push(`/game/${result.gameId}`);
        }, 1500);
      } else {
        throw new Error("No se pudo guardar el juego");
      }
    } catch (error) {
      console.error(error);
      setNotify({
        isOpen: true,
        type: "error",
        title: "Error",
        message: "Hubo un problema al crear el juego"
      });
      setLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
        <PageContainer>
          <Header>
            <Container maxWidth="lg">
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <IconButton onClick={() => router.back()} sx={{ color: "white", mr: 2 }}>
                  <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Poppins", sans-serif' }}>
                  Crear Nuevo Intercambio
                </Typography>
              </Box>
            </Container>
          </Header>

          <Container maxWidth="md" sx={{ mt: -6 }}>
            <FormPaper>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }} alternativeLabel>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Step 1: Details */}
              {activeStep === 0 && (
                <Box sx={{ animation: `${fadeIn} 0.4s ease-out` }}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Nombre del Juego"
                        value={gameName}
                        onChange={(e) => setGameName(e.target.value)}
                        placeholder="Ej: Navidad Familia 2024"
                        required
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Descripción (Opcional)"
                        value={gameDescription}
                        onChange={(e) => setGameDescription(e.target.value)}
                        multiline
                        rows={2}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <DatePicker
                        label="Fecha del Intercambio"
                        value={eventDate}
                        onChange={(newValue) => setEventDate(newValue)}
                        slotProps={{ textField: { fullWidth: true } }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Presupuesto"
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        InputProps={{
                          startAdornment: <InputAdornment position="start">₡</InputAdornment>,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {/* Step 2: Participants */}
              {activeStep === 1 && (
                <Box sx={{ animation: `${fadeIn} 0.4s ease-out` }}>
                  <Typography variant="h6" gutterBottom>
                    Invita a los participantes
                  </Typography>
                  <Alert severity="info" sx={{ mb: 3 }}>
                    Tú ya estás incluido como organizador. Agrega a tus amigos o familiares.
                  </Alert>

                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Nombre"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        fullWidth
                        label="Email (Opcional)"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Para enviar invitación"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleAddParticipant}
                        sx={{ height: "56px" }}
                      >
                        <AddIcon />
                      </Button>
                    </Grid>
                  </Grid>

                  <Box sx={{ bgcolor: theme.palette.background.default, p: 2, borderRadius: 2 }}>
                    {participants.map((p, index) => (
                      <Chip
                        key={index}
                        label={`${p.name} ${p.isOrganizer ? "(Organizador)" : ""}`}
                        onDelete={p.isOrganizer ? undefined : () => handleRemoveParticipant(index)}
                        color={p.isOrganizer ? "primary" : "default"}
                        sx={{ m: 0.5 }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Step 3: Review */}
              {activeStep === 2 && (
                <Box sx={{ animation: `${fadeIn} 0.4s ease-out` }}>
                  <Typography variant="h6" gutterBottom align="center">
                    Resumen del Juego
                  </Typography>
                  
                  <Paper variant="outlined" sx={{ p: 3, mb: 3 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Nombre</Typography>
                        <Typography variant="body1" fontWeight="bold">{gameName}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Fecha</Typography>
                        <Typography variant="body1" fontWeight="bold">{eventDate.format("DD/MM/YYYY")}</Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Presupuesto</Typography>
                        <Typography variant="body1" fontWeight="bold">
                          {budget ? `₡${budget}` : "Sin límite"}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle2" color="text.secondary">Participantes</Typography>
                        <Typography variant="body1" fontWeight="bold">{participants.length} personas</Typography>
                      </Grid>
                    </Grid>
                  </Paper>

                  <Alert severity="success">
                    ¡Todo listo! Al crear el juego, podrás compartir el código o enlace con tus amigos.
                  </Alert>
                </Box>
              )}

              {/* Actions */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  variant="outlined"
                >
                  Atrás
                </Button>
                
                {activeStep === steps.length - 1 ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateGame}
                    disabled={loading}
                    startIcon={loading ? <CardGiftcardIcon /> : null}
                  >
                    {loading ? "Creando..." : "Crear Juego"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleNext}
                  >
                    Siguiente
                  </Button>
                )}
              </Box>
            </FormPaper>
          </Container>

          <CustumAlert notify={notify} setNotify={setNotify} />
        </PageContainer>
      </LocalizationProvider>
    </ProtectedRoute>
  );
}
