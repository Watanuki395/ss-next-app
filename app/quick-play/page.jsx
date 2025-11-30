"use client";
import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button, Paper, Step, Stepper, StepLabel, Grid, IconButton, Chip, Alert } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

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

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  background: "linear-gradient(135deg, #D32F2F 0%, #1B5E20 100%)",
  padding: theme.spacing(4, 2),
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

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: "800px",
  margin: "0 auto",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
  animation: `${fadeIn} 0.6s ease-out`,
  position: "relative",
  zIndex: 2,
  
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(3),
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 700,
  fontSize: "2.5rem",
  textAlign: "center",
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "1.125rem",
  textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(4),
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: theme.palette.mode === "dark" ? "#2C2C2C" : "#FAFAFA",
    
    "& input": {
      color: theme.palette.text.primary,
    },
    
    "& fieldset": {
      borderColor: theme.palette.mode === "dark" ? "#505050" : "#E0E0E0",
      borderWidth: "2px",
    },
    
    "&:hover": {
      backgroundColor: theme.palette.mode === "dark" ? "#3A3A3A" : "#FFFFFF",
      "& fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
    
    "&.Mui-focused": {
      backgroundColor: theme.palette.mode === "dark" ? "#3A3A3A" : "#FFFFFF",
      "& fieldset": {
        borderColor: theme.palette.primary.main,
        borderWidth: "2px",
      },
    },
  },
  
  "& .MuiInputLabel-root": {
    color: theme.palette.text.secondary,
    "&.Mui-focused": {
      color: theme.palette.primary.main,
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  padding: theme.spacing(1.5, 4),
  borderRadius: "12px",
  textTransform: "none",
  fontSize: "1rem",
}));

const PrimaryButton = styled(ActionButton)(({ theme }) => ({
  background: theme.palette.mode === "dark" 
    ? "linear-gradient(135deg, #FF6659 0%, #FF8A80 100%)"
    : "linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)",
  color: "#FFFFFF",
  boxShadow: theme.palette.mode === "dark"
    ? "0 4px 12px rgba(255, 102, 89, 0.3)"
    : "0 4px 12px rgba(211, 47, 47, 0.3)",
  
  "&:hover": {
    background: theme.palette.mode === "dark"
      ? "linear-gradient(135deg, #FF8A80 0%, #FFAB91 100%)"
      : "linear-gradient(135deg, #9A0007 0%, #7F0000 100%)",
    boxShadow: theme.palette.mode === "dark"
      ? "0 6px 16px rgba(255, 102, 89, 0.4)"
      : "0 6px 16px rgba(211, 47, 47, 0.4)",
  },
}));

const SecondaryButton = styled(ActionButton)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark"
      ? "rgba(255, 102, 89, 0.1)"
      : "rgba(211, 47, 47, 0.1)",
    borderColor: theme.palette.primary.dark,
  },
}));

const ParticipantChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  padding: theme.spacing(1),
  fontSize: "0.9rem",
  borderRadius: "12px",
}));

const steps = ["Información Básica", "Participantes", "Confirmación"];

export default function QuickPlayPage() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState("");
  
  // Step 1: Basic Info
  const [gameName, setGameName] = useState("");
  const [organizerName, setOrganizerName] = useState("");
  const [organizerEmail, setOrganizerEmail] = useState("");
  const [eventDate, setEventDate] = useState(dayjs().add(7, "day"));
  const [budget, setBudget] = useState("");
  
  // Step 2: Participants
  const [participants, setParticipants] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  
  const handleNext = () => {
    setError("");
    
    if (activeStep === 0) {
      // Validate basic info
      if (!gameName || !organizerName || !organizerEmail) {
        setError("Por favor completa todos los campos obligatorios");
        return;
      }
      if (!/\S+@\S+\.\S+/.test(organizerEmail)) {
        setError("Email inválido");
        return;
      }
    }
    
    if (activeStep === 1) {
      // Validate participants
      if (participants.length < 3) {
        setError("Necesitas al menos 3 participantes para crear un juego");
        return;
      }
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleAddParticipant = () => {
    setError("");
    
    if (!newName || !newEmail) {
      setError("Ingresa nombre y email del participante");
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(newEmail)) {
      setError("Email inválido");
      return;
    }
    
    // Check duplicates
    if (participants.some(p => p.email.toLowerCase() === newEmail.toLowerCase())) {
      setError("Este email ya está en la lista");
      return;
    }
    
    setParticipants([...participants, { name: newName, email: newEmail }]);
    setNewName("");
    setNewEmail("");
  };
  
  const handleRemoveParticipant = (index) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateGame = async () => {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          gameName,
          organizerName,
          organizerEmail,
          eventDate: eventDate.format("DD/MM/YYYY"),
          budget,
          participants,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Error al crear el juego');
      }

      // Success
      router.push("/quick-play/success");
    } catch (err) {
      console.error("Error creating game:", err);
      setError(err.message || "Hubo un problema al crear el juego. Inténtalo de nuevo.");
      setIsSubmitting(false);
    }
  };
  
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <PageContainer>
        <Container maxWidth="lg">
          <FormPaper>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 3 }}>
              <CardGiftcardIcon sx={{ fontSize: "3rem", color: "#D32F2F", mr: 1 }} />
            </Box>
            
            <Title>Crear Juego Rápido</Title>
            <Subtitle>
              100% Gratis • Sin Registro • Sin Límites
            </Subtitle>
            
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
                {error}
              </Alert>
            )}
            
            {/* Step 1: Basic Info */}
            {activeStep === 0 && (
              <Box sx={{ animation: `${fadeIn} 0.4s ease-out` }}>
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <StyledTextField
                      fullWidth
                      label="Nombre del Juego"
                      value={gameName}
                      onChange={(e) => setGameName(e.target.value)}
                      placeholder="Ej: Secret Santa Oficina 2024"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Tu Nombre"
                      value={organizerName}
                      onChange={(e) => setOrganizerName(e.target.value)}
                      placeholder="Organizador"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Tu Email"
                      type="email"
                      value={organizerEmail}
                      onChange={(e) => setOrganizerEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Fecha del Intercambio"
                      value={eventDate}
                      onChange={(newValue) => setEventDate(newValue)}
                      minDate={dayjs()}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          required: true,
                        },
                      }}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      fullWidth
                      label="Presupuesto (opcional)"
                      type="number"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="Ej: 30"
                      InputProps={{
                        startAdornment: <Typography sx={{ mr: 1, color: "#757575" }}>$</Typography>,
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
            
            {/* Step 2: Participants */}
            {activeStep === 1 && (
              <Box sx={{ animation: `${fadeIn} 0.4s ease-out` }}>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: '"Poppins", sans-serif', color: "text.primary" }}>
                  Agregar Participantes (mínimo 3)
                </Typography>
                
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={5}>
                    <StyledTextField
                      fullWidth
                      label="Nombre"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="Juan Pérez"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={5}>
                    <StyledTextField
                      fullWidth
                      label="Email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="juan@email.com"
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={2}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleAddParticipant}
                      sx={{
                        height: "56px",
                        backgroundColor: "secondary.main",
                        "&:hover": { backgroundColor: "secondary.dark" },
                      }}
                    >
                      <AddIcon />
                    </Button>
                  </Grid>
                </Grid>
                
                <Box
                  sx={(theme) => ({
                    border: `2px dashed ${theme.palette.mode === "dark" ? "#505050" : "#E0E0E0"}`,
                    borderRadius: "12px",
                    padding: 3,
                    minHeight: "200px",
                    backgroundColor: theme.palette.mode === "dark" ? "#2C2C2C" : "#FAFAFA",
                  })}
                >
                  <Typography variant="subtitle2" sx={{ mb: 2, color: "text.secondary" }}>
                    Participantes ({participants.length})
                  </Typography>
                  
                  {participants.length === 0 ? (
                    <Typography sx={{ textAlign: "center", color: "text.disabled", py: 4 }}>
                      Aún no has agregado participantes
                    </Typography>
                  ) : (
                    <Box>
                      {participants.map((participant, index) => (
                        <Box
                          key={index}
                          sx={(theme) => ({
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            backgroundColor: theme.palette.background.paper,
                            padding: 2,
                            borderRadius: "8px",
                            mb: 1,
                            border: `1px solid ${theme.palette.mode === "dark" ? "#3A3A3A" : "#E0E0E0"}`,
                          })}
                        >
                          <Box>
                            <Typography sx={{ fontWeight: 600, color: "text.primary" }}>
                              {participant.name}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              {participant.email}
                            </Typography>
                          </Box>
                          <IconButton
                            onClick={() => handleRemoveParticipant(index)}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
                
                <Box sx={{ mt: 3, textAlign: "center" }}>
                  <Button
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    sx={{ borderColor: "primary.main", color: "primary.main" }}
                  >
                    Subir archivo CSV/Excel
                  </Button>
                  <Typography variant="caption" sx={{ display: "block", mt: 1, color: "text.secondary" }}>
                    Próximamente disponible
                  </Typography>
                </Box>
              </Box>
            )}
            
            {/* Step 3: Confirmation */}
            {activeStep === 2 && (
              <Box sx={{ animation: `${fadeIn} 0.4s ease-out` }}>
                <Typography variant="h6" sx={{ mb: 3, fontFamily: '"Poppins", sans-serif', color: "text.primary" }}>
                  Confirma los Detalles
                </Typography>
                
                <Box sx={(theme) => ({ 
                  backgroundColor: theme.palette.mode === "dark" ? "#2C2C2C" : "#FAFAFA", 
                  padding: 3, 
                  borderRadius: "12px", 
                  mb: 3 
                })}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Nombre del Juego
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600, color: "text.primary" }}>
                        {gameName}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Organizador
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.primary" }}>{organizerName}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {organizerEmail}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Fecha del Evento
                      </Typography>
                      <Typography variant="body1" sx={{ color: "text.primary" }}>
                        {eventDate.format("DD/MM/YYYY")}
                      </Typography>
                    </Grid>
                    
                    {budget && (
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Presupuesto
                        </Typography>
                        <Typography variant="body1" sx={{ color: "text.primary" }}>${budget}</Typography>
                      </Grid>
                    )}
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                        Participantes ({participants.length})
                      </Typography>
                      {participants.map((p, i) => (
                        <ParticipantChip
                          key={i}
                          label={`${p.name} (${p.email})`}
                          color="primary"
                          variant="outlined"
                        />
                      ))}
                    </Grid>
                  </Grid>
                </Box>
                
                <Alert severity="info" sx={{ borderRadius: "12px" }}>
                  Al crear el juego, se enviarán emails automáticamente a todos los participantes con su asignación de Secret Santa.
                </Alert>
              </Box>
            )}
            
            {/* Navigation Buttons */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
              <SecondaryButton
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Atrás
              </SecondaryButton>
              
              {activeStep === steps.length - 1 ? (
                <PrimaryButton 
                  onClick={handleCreateGame}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creando..." : "Crear Juego 🎁"}
                </PrimaryButton>
              ) : (
                <PrimaryButton onClick={handleNext}>
                  Siguiente
                </PrimaryButton>
              )}
            </Box>
          </FormPaper>
        </Container>
      </PageContainer>
    </LocalizationProvider>
  );
}
