"use client";
import React, { useState, useEffect } from "react";
import ProtectedRoute from "@/components/ProtectedRoute/ProtectedRoute";
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Fab,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  CircularProgress,
  useTheme,
  Tooltip
} from "@mui/material";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkIcon from "@mui/icons-material/Link";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Link from "next/link";

import { useAuth } from "../context/AuthContextSupabase";
import { getWishlist, addToWishlist, updateWishlistItem, deleteWishlistItem } from "../supabase/api";
import { CustumAlert } from "@/components/CustumAlert/CustumAlert";

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
  
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 10% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 90% 80%, rgba(255, 215, 0, 0.15) 0%, transparent 40%)
    `,
    pointerEvents: "none",
  },
}));

const WishCard = styled(Card)(({ theme }) => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "16px",
  transition: "transform 0.2s, box-shadow 0.2s",
  border: `1px solid ${theme.palette.divider}`,
  
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.palette.mode === 'dark' 
      ? '0 8px 24px rgba(0,0,0,0.4)' 
      : '0 8px 24px rgba(0,0,0,0.1)',
  },
}));

const EmptyState = styled(Box)(({ theme }) => ({
  textAlign: "center",
  padding: theme.spacing(8),
  backgroundColor: theme.palette.background.paper,
  borderRadius: "16px",
  border: `2px dashed ${theme.palette.divider}`,
  marginTop: theme.spacing(4),
}));

export default function WishlistPage() {
  const { user } = useAuth();
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [notify, setNotify] = useState({ isOpen: false, title: "", message: "", type: "" });

  // Form State
  const [formData, setFormData] = useState({
    itemName: "",
    itemLink: "",
    itemPrice: "",
    itemNote: "",
  });

  const fetchWishlist = async () => {
    if (!user) return;
    setLoading(true);
    const result = await getWishlist(user.id); // Fixed: user.id
    if (result.success) {
      setItems(result.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        itemName: item.item_name,
        itemLink: item.item_link || "",
        itemPrice: item.item_price || "",
        itemNote: item.item_note || "",
      });
    } else {
      setEditingItem(null);
      setFormData({ itemName: "", itemLink: "", itemPrice: "", itemNote: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (!formData.itemName.trim()) {
      setNotify({ isOpen: true, type: "error", title: "Error", message: "El nombre del regalo es obligatorio" });
      return;
    }

    const payload = {
      ...formData,
      itemPrice: formData.itemPrice ? parseFloat(formData.itemPrice) : null,
    };

    let result;
    if (editingItem) {
      result = await updateWishlistItem(editingItem.id, payload);
    } else {
      result = await addToWishlist(user.id, payload); // Fixed: user.id
    }

    if (result.success) {
      setNotify({ isOpen: true, type: "success", title: "¡Listo!", message: result.message });
      handleCloseDialog();
      fetchWishlist();
    } else {
      setNotify({ isOpen: true, type: "error", title: "Error", message: result.message });
    }
  };

  const handleDelete = async (id) => {
    if (confirm("¿Estás seguro de eliminar este deseo?")) {
      const result = await deleteWishlistItem(id);
      if (result.success) {
        setNotify({ isOpen: true, type: "success", title: "Eliminado", message: result.message });
        fetchWishlist();
      } else {
        setNotify({ isOpen: true, type: "error", title: "Error", message: result.message });
      }
    }
  };

  return (
    <ProtectedRoute>
      <PageContainer>
        <Header>
          <Container maxWidth="lg">
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Link href="/dashboard" passHref legacyBehavior>
                <IconButton sx={{ color: "white", mr: 2 }}>
                  <ArrowBackIcon />
                </IconButton>
              </Link>
              <Typography variant="h4" sx={{ fontWeight: 700, fontFamily: '"Poppins", sans-serif' }}>
                Mi Lista de Deseos 🎁
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, ml: 7 }}>
              Ayuda a tu Secret Santa a elegir el regalo perfecto
            </Typography>
          </Container>
        </Header>

        <Container maxWidth="lg" sx={{ mt: -4 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 3 }}>
            <Fab 
              color="primary" 
              variant="extended" 
              onClick={() => handleOpenDialog()}
              sx={{ 
                boxShadow: theme.shadows[4],
                fontWeight: "bold"
              }}
            >
              <AddIcon sx={{ mr: 1 }} />
              Agregar Deseo
            </Fab>
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
              <CircularProgress />
            </Box>
          ) : items.length > 0 ? (
            <Grid container spacing={3}>
              {items.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.id}>
                  <WishCard>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          {item.item_name}
                        </Typography>
                        {item.item_price && (
                          <Typography variant="subtitle1" color="primary" fontWeight="bold">
                            ₡{item.item_price}
                          </Typography>
                        )}
                      </Box>
                      
                      {item.item_note && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, mt: 1 }}>
                          {item.item_note}
                        </Typography>
                      )}
                      
                      {item.item_link && (
                        <Button 
                          startIcon={<LinkIcon />} 
                          href={item.item_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          size="small"
                          sx={{ mt: 1, textTransform: "none" }}
                        >
                          Ver enlace
                        </Button>
                      )}
                    </CardContent>
                    <CardActions sx={{ justifyContent: "flex-end", p: 2, pt: 0 }}>
                      <Tooltip title="Editar">
                        <IconButton size="small" onClick={() => handleOpenDialog(item)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Eliminar">
                        <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </WishCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyState>
              <CardGiftcardIcon sx={{ fontSize: 60, color: "text.disabled", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Tu lista está vacía
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                ¡Agrega algunas ideas para que tu Secret Santa se inspire!
              </Typography>
              <Button variant="contained" onClick={() => handleOpenDialog()}>
                Agregar mi primer deseo
              </Button>
            </EmptyState>
          )}
        </Container>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontFamily: '"Poppins", sans-serif', fontWeight: 600 }}>
            {editingItem ? "Editar Deseo" : "Nuevo Deseo"}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="¿Qué te gustaría recibir?"
                fullWidth
                value={formData.itemName}
                onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                placeholder="Ej: Auriculares Bluetooth"
                autoFocus
              />
              <TextField
                label="Enlace (Opcional)"
                fullWidth
                value={formData.itemLink}
                onChange={(e) => setFormData({ ...formData, itemLink: e.target.value })}
                placeholder="https://amazon.com/..."
                InputProps={{
                  startAdornment: <InputAdornment position="start"><LinkIcon /></InputAdornment>,
                }}
              />
              <TextField
                label="Precio Aproximado (Opcional)"
                fullWidth
                type="number"
                value={formData.itemPrice}
                onChange={(e) => setFormData({ ...formData, itemPrice: e.target.value })}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₡</InputAdornment>,
                }}
              />
              <TextField
                label="Notas adicionales (Talla, Color, etc.)"
                fullWidth
                multiline
                rows={3}
                value={formData.itemNote}
                onChange={(e) => setFormData({ ...formData, itemNote: e.target.value })}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={handleCloseDialog} color="inherit">
              Cancelar
            </Button>
            <Button onClick={handleSave} variant="contained" color="primary">
              Guardar
            </Button>
          </DialogActions>
        </Dialog>

        <CustumAlert notify={notify} setNotify={setNotify} />
      </PageContainer>
    </ProtectedRoute>
  );
}
