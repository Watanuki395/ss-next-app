import { Roboto_Mono } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto_Mono({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
  background: {
    default: "#121212",
    paper: "#121212",
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#60a5fa",
          }),
        }),
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          // Cambia los estilos de todos los TextField
          // Por ejemplo, puedes cambiar el color de fondo y el color del texto
          backgroundColor: "inherit",
          color: "#FFFFFF",
          input: {
            "&:-webkit-autofill": {
              WebkitBoxShadow: "0 0 0 100px #121212  inset",
              WebkitTextFillColor: "default",
            },
          },
        },
      },
    },
  },
});

export default theme;
