import { useAuth } from "../../app/context/AuthContext"; // Importa tu contexto de autenticación
import { useRouter } from "next/navigation";
import Skeleton from "@mui/material/Skeleton";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";

const ProtectedRoute = ({ children }) => {
  const { user, loading, userInfo } = useAuth();
  const router = useRouter();

  // Si el usuario está autenticado o si la autenticación está en proceso, muestra el contenido de la ruta protegida
  return user && userInfo ? (
    children
  ) : loading ? (
    <Typography
      display={"flex"}
      height={"70vh"}
      justifyContent={"center"}
      alignItems={"center"}
      variant="h5"
    >
      Cargando...
    </Typography>
  ) : !user && !loading ? (
    <Typography
      display={"flex"}
      height={"70vh"}
      justifyContent={"center"}
      alignItems={"center"}
      variant="h5"
    >
      Es necesario iniciar session ...
    </Typography>
  ) : (
    <Typography
      display={"flex"}
      height={"70vh"}
      justifyContent={"center"}
      alignItems={"center"}
      variant="h5"
    >
      Ya merito... .... ....
    </Typography>
  );
};

export default ProtectedRoute;
