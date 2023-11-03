import { Roboto_Mono } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto_Mono({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

// const lightTheme = {
//   sbg: "rgb(147,147,160)",
//   bg: "rgb(255,255,255)",
//   bgAlpha: "rgba(250,250,250,.3)",
//   bg2: "rgb(190,200,205, .5)",
//   bg3: "rgb(230,230,230)",
//   bg4: "rgb(230,230,230)",
//   text: "rgb(45,45,45)",
//   primary: "rgb(52, 131, 235)",
//   deleteText: "crimson",
//   viewText: "darkblue",
//   textFieldHover: "#a9a8ad",
//   TextFieldBorder: "#d6d5e6",
// };
// const darkTheme = {
//   sbg: "rgb(15,15,15)",
//   bg: "rgb(15,15,15)",
//   bgAlpha: "rgba(0,0,0,.3)",
//   bg2: "rgb(30,30,30)",
//   bg3: "rgb(50,50,50)",
//   bg4: "rgb(230,230,230)",
//   text: "rgb(210,210,210)",
//   primary: "rgb(52, 131, 235)",
//   deleteText: "crimson",
//   viewText: "rgba(64, 127, 170, 0.75)",
//   textFieldHover: "#a9a8ad",
//   TextFieldBorder: "#d6d5e6",
// };

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#CE93D8",
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
              WebkitBoxShadow: "0 0 0 100px #121212  inset",
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
  bg2: "rgb(50,50,50)",
  bgAlpha: "rgba(0,0,0,.3)",
  text: "rgb(210,210,210)",
});

export default theme;
