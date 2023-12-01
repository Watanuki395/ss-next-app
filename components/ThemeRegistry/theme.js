import { Roboto_Mono } from "next/font/google";
import { createTheme, css } from "@mui/material/styles";

const roboto = Roboto_Mono({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const lightThemex = {
  sbg: "rgb(147,147,160)",
  bg: "rgb(255,255,255)",
  bgAlpha: "rgba(250,250,250,.3)",
  bg2: "rgb(190,200,205, .5)",
  bg3: "rgb(230,230,230)",
  bg4: "rgb(230,230,230)",
  text: "rgb(45,45,45)",
  primary: "rgb(52, 131, 235)",
  deleteText: "crimson",
  viewText: "darkblue",
  textFieldHover: "#a9a8ad",
  TextFieldBorder: "#d6d5e6",
};
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

const lightThemeCristmas = {
  sbg: "rgb(147,123,113)", // Cinereous / Ceniciento
  bg: "rgb(246,231,224)", // Seashell / Concha
  bgAlpha: "rgba(246,231,224,.3)",
  bg2: "rgb(253,205,169, .5)", // Peach / Melocotón
  bg3: "rgb(253,231,190)", // Wheat / Trigo
  bg4: "rgb(253,205,169, .5)",
  text: "rgb(40,32,30)", // Raisin black / Negro pasa
  primary: "rgb(112,51,30)", // Sienna / Siena
  deleteText: "rgb(33,6,11)", // Licorice / Regaliz
  viewText: "rgb(52,53,45)", // Black olive / Aceituna negra
  textFieldHover: "#d6d5e6",
  TextFieldBorder: "#d6d5e6",
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
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
  sbg: "rgb(147,123,113)", // Cinereous / Ceniciento
  bg: "rgb(246,231,224)", // Seashell / Concha
  bgAlpha: "rgba(246,231,224,.3)",
  bg2: "rgb(253,205,169, .5)", // Peach / Melocotón
  bg3: "rgb(253,231,190)", // Wheat / Trigo
  bg4: "rgb(253,231,190)",
  text: "rgb(40,32,30)", // Raisin black / Negro pasa
  primary: "rgb(112,51,30)", // Sienna / Siena
  deleteText: "rgb(33,6,11)", // Licorice / Regaliz
  viewText: "rgb(52,53,45)", // Black olive / Aceituna negra
  textFieldHover: "#d6d5e6",
  TextFieldBorder: "#d6d5e6",
});

export const darkTheme = createTheme({
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
  sbg: "rgb(147,147,160)",
  bg: "rgb(255,255,255)",
  bgAlpha: "rgba(250,250,250,.3)",
  bg2: "rgb(190,200,205, .5)",
  bg3: "rgb(230,230,230)",
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
      background-color: #fdcda9;
      color: #2d2d2d;
    }
  }

  [data-theme="dark"] {
    body {
      background-color: #1e1e1e;
      color: #d2d2d2;
    }
  }
`;
