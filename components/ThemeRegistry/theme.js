import { Roboto_Mono } from "next/font/google";
import { createTheme, css } from "@mui/material/styles";

const roboto = Roboto_Mono({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    // Tema claro
    primary: {
      main: "#ff9800",
    },
    secondary: {
      main: "#fff9c4",
    },
    error: {
      main: "#c83e4d",
    },
    background: {
      default: "#fffde7",
      paper: "#fff9c4",
    },
    text: {
      primary: "#28201e",
      secondary: "#4f4f4f",
    },
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
              WebkitBoxShadow: "0 0 0 100px #fde7be  inset",
              WebkitTextFillColor: "default",
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "100%",
          minWidth: "90%",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          overflow: "visible",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            //boxShadow: "0px 0px 20px #575d82",
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 0px 5px #575d82",
          },
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(30,30,30)",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(10,10,10)",
          fontSize: "30px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#cd881c36",
          "&:hover": {
            backgroundColor: "#cd881c5c",
            boxShadow: "0px 0px 5px #575d82",
          },
        },
      },
    },
  },
  sbg: "#937b71",
  bg: "#f6e7e0",
  bgAlpha: "#f6e7e0",
  bg2: "#fdcda9",
  bg3: "#fde7be",
  bg4: "#fde7be",
  text: "#28201e",
  primary: "#70331e",
  deleteText: "#21060b",
  viewText: "#34352d",
  textFieldHover: "#d6d5e6",
  TextFieldBorder: "#d6d5e6",
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    // Tema oscuro
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#847577",
    },
    error: {
      main: "#c83e4d",
    },
    background: {
      default: "#1e1e1e",
      paper: "#212529",
    },
    text: {
      primary: "#ffffff", // Blanco
      secondary: "#b8c2cc", // Gris claro
    },
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
              WebkitBoxShadow: "0 0 0 100px rgb(57, 60, 63)  inset",
              WebkitTextFillColor: "default",
            },
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          width: "100%",
          minWidth: "90%",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          overflow: "visible",
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            //boxShadow: "0px 0px 20px #575d82",
          },
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: "0px 0px 5px #575d82",
          },
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(30,30,30)",
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(10,10,10)",
          fontSize: "30px",
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#cd881c36",
          "&:hover": {
            backgroundColor: "#cd881c5c",
            boxShadow: "0px 0px 5px #575d82",
          },
        },
      },
    },
  },
  sbg: "rgb(147,147,160)",
  bg: "rgb(255,255,255)",
  bgAlpha: "rgba(250,250,250,.3)",
  bg2: "rgb(190,200,205, .5)",
  bg3: "rgb(57, 60, 63)",
  bg4: "rgb(253,205,169, .5)", // Peach / Melocotón
  text: "rgb(214, 214, 214)",
  primary: "rgb(52, 131, 235)",
  deleteText: "crimson",
  viewText: "darkblue",
  textFieldHover: "#a9a8ad",
  TextFieldBorder: "#d6d5e6",
});

export const globalStyles = css`
  :root {
    body {
      //background-color: #fdcda9;
      //color: #2d2d2d;
    }
  }

  [data-theme="dark"] {
    body {
      //background-color: #1e1e1e;
      //color: #d2d2d2;
    }
  }
`;
