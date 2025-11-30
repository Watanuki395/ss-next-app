"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, TextField, Button, Paper, InputAdornment, IconButton, Alert } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import Link from "next/link";
import { useAuth } from "../context/AuthContextSupabase";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

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
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "linear-gradient(135deg, #D32F2F 0%, #1B5E20 100%)",
  padding: theme.spacing(3),
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

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  maxWidth: "480px",
  width: "100%",
  margin: "0 auto",
  borderRadius: "24px",
  boxShadow: "0 20px 60px rgba(0, 0, 0, 0.4)",
  animation: `${fadeIn} 0.6s ease-out`,
  position: "relative",
  zIndex: 2,
  backgroundColor: "#FFFFFF",
  
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(4),
    maxWidth: "100%",
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  gap: theme.spacing(1),
}));

const Logo = styled(CardGiftcardIcon)(({ theme }) => ({
  fontSize: "3rem",
  color: "#D32F2F",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 700,
  fontSize: "2rem",
  textAlign: "center",
  marginBottom: theme.spacing(1),
  color: "#212121",
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.75rem",
  },
}));

const Subtitle = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "1rem",
  textAlign: "center",
  color: "#616161",
  marginBottom: theme.spacing(4),
  lineHeight: 1.6,
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.875rem",
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#FAFAFA",
    transition: "all 0.3s ease",
    
    "& fieldset": {
      borderColor: "#E0E0E0",
      borderWidth: "2px",
    },
    
    "&:hover": {
      backgroundColor: "#FFFFFF",
      "& fieldset": {
        borderColor: "#D32F2F",
      },
    },
    
    "&.Mui-focused": {
      backgroundColor: "#FFFFFF",
      "& fieldset": {
        borderColor: "#D32F2F",
        borderWidth: "2px",
      },
    },
  },
  
  "& .MuiInputLabel-root": {
    color: "#757575",
    fontWeight: 500,
    
    "&.Mui-focused": {
      color: "#D32F2F",
      fontWeight: 600,
    },
  },
  
  "& .MuiInputBase-input": {
    color: "#212121",
    fontSize: "1rem",
  },
  
  "& .MuiFormHelperText-root": {
    marginLeft: 0,
    fontSize: "0.75rem",
  },
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  fontFamily: '"Poppins", sans-serif',
  fontWeight: 600,
  fontSize: "1rem",
  padding: theme.spacing(1.5),
  borderRadius: "12px",
  textTransform: "none",
  background: "linear-gradient(135deg, #D32F2F 0%, #9A0007 100%)",
  color: "#FFFFFF",
  boxShadow: "0 4px 12px rgba(211, 47, 47, 0.3)",
  transition: "all 0.3s ease",
  
  "&:hover": {
    background: "linear-gradient(135deg, #9A0007 0%, #7F0000 100%)",
    boxShadow: "0 6px 16px rgba(211, 47, 47, 0.4)",
    transform: "translateY(-2px)",
  },
  
  "&:disabled": {
    background: "#BDBDBD",
    color: "#FFFFFF",
  },
}));

const LinkText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.9375rem",
  color: "#D32F2F",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "inline-block",
  
  "&:hover": {
    color: "#9A0007",
    textDecoration: "underline",
    transform: "translateY(-1px)",
  },
}));

const DividerText = styled(Typography)(({ theme }) => ({
  fontFamily: '"Inter", sans-serif',
  fontSize: "0.9375rem",
  color: "#616161",
  textAlign: "center",
  margin: theme.spacing(3, 0, 2, 0),
  fontWeight: 500,
}));

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Campo Requerido")
    .email("Correo Electrónico Inválido")
    .max(255, "Máximo 255 caracteres"),
  password: Yup.string()
    .required("Campo Requerido")
    .min(8, "Mínimo 8 caracteres"),
});

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values) => {
    setError("");
    setLoading(true);
    
    try {
      await login(values.email, values.password);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      setError("Usuario y/o contraseña no válidos. Por favor, intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageContainer>
      <Container maxWidth="sm">
        <FormPaper elevation={0}>
          <LogoContainer>
            <Logo />
          </LogoContainer>
          
          <Title>Iniciar Sesión</Title>
          <Subtitle>
            Accede a tu cuenta para gestionar tus juegos de Amigo Secreto
          </Subtitle>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: "12px" }}>
              {error}
            </Alert>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, values, handleChange, handleBlur }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <StyledTextField
                    fullWidth
                    name="email"
                    label="Correo Electrónico"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.email && touched.email)}
                    helperText={touched.email && errors.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailIcon sx={{ color: "#757575" }} />
                        </InputAdornment>
                      ),
                    }}
                  />

                  <StyledTextField
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type={showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(errors.password && touched.password)}
                    helperText={touched.password && errors.password}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#757575" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />

                  <Box sx={{ textAlign: "right", mt: -1 }}>
                    <Link href="/forgot" passHref legacyBehavior>
                      <LinkText component="a">
                        ¿Olvidaste tu contraseña?
                      </LinkText>
                    </Link>
                  </Box>

                  <SubmitButton
                    type="submit"
                    fullWidth
                    size="large"
                    disabled={loading}
                  >
                    {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </SubmitButton>
                </Box>
              </Form>
            )}
          </Formik>

          <DividerText>
            ¿No tienes una cuenta?
          </DividerText>

          <Box sx={{ textAlign: "center" }}>
            <Link href="/register" passHref legacyBehavior>
              <LinkText component="a" sx={{ fontWeight: 600 }}>
                Regístrate aquí
              </LinkText>
            </Link>
          </Box>
        </FormPaper>
      </Container>
    </PageContainer>
  );
}
