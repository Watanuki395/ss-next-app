"use client";
import { useAuth } from "../../app/context/AuthContext"; // Importa tu contexto de autenticación
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

const ProtectedRoute = ({ children }) => {
  const { user, loading, userInfo } = useAuth();
  const router = useRouter();

  // Verifica si el usuario está autenticado
  useEffect(() => {
    if (!loading && !user) {
      // Si el usuario no está autenticado, redirige a la página de inicio de sesión
      router.push("/login");
    }
  }, [user, loading, router]);

  // Si el usuario está autenticado o si la autenticación está en proceso, muestra el contenido de la ruta protegida
  return user && userInfo ? (
    children
  ) : loading || !userInfo ? (
    <Box sx={{ width: "100%", height: "100vh" }}>
      <Skeleton
        animation="wave"
        sx={{ bgcolor: "grey.900" }}
        variant="rectangular"
        width="100%"
        height="100%"
      />
    </Box>
  ) : null;
};

export default ProtectedRoute;
