import { useAuth } from "../../app/context/AuthContext";

import Loading from "@/app/loading";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Box from "@mui/material/Box";

const ProtectedRoute = ({ children }) => {
  const { user, loading, userInfo } = useAuth();

  if (loading) {
    return <Loading />;
  }

  if (!user && !loading) {
    // Si el usuario no está autenticado, redirige a la página de inicio de sesión
    return (
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1rem",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "480px",
          rowGap: "1rem",
        }}
      >
        <Typography variant="h5">
          No autorizado... compadre ... que paso
        </Typography>
        <Link href={"/login"}>
          <Button variant="contained">Regresar</Button>
        </Link>
      </Box>
    );
  }

  if (user && userInfo && !loading) {
    return children;
  }
};

export default ProtectedRoute;
