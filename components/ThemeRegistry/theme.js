import { Roboto_Mono, Inter, Poppins } from "next/font/google";
import { createTheme, css } from "@mui/material/styles";

const roboto = Roboto_Mono({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D32F2F",
      light: "#FF6659",
      dark: "#9A0007",
    },
    secondary: {
      main: "#1B5E20",
      light: "#4C8C4A",
      dark: "#003300",
    },
    error: {
      main: "#c83e4d",
    },
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#212121",
      secondary: "#616161",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: poppins.style.fontFamily,
    },
    h2: {
      fontFamily: poppins.style.fontFamily,
    },
    h3: {
      fontFamily: poppins.style.fontFamily,
    },
    h4: {
      fontFamily: poppins.style.fontFamily,
    },
    h5: {
      fontFamily: poppins.style.fontFamily,
    },
    h6: {
      fontFamily: poppins.style.fontFamily,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#FFFFFF",
          color: "#212121",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#FFFFFF",
            "& input": {
              color: "#212121",
            },
            "& fieldset": {
              borderColor: "#E0E0E0",
            },
            "&:hover fieldset": {
              borderColor: "#D32F2F",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#D32F2F",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#757575",
            "&.Mui-focused": {
              color: "#D32F2F",
            },
          },
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          "& .MuiPickersCalendarHeader-root": {
            backgroundColor: "#FFFFFF",
            color: "#212121",
          },
          "& .MuiDayCalendar-header": {
            backgroundColor: "#FFFFFF",
          },
          "& .MuiPickersDay-root": {
            color: "#212121",
            backgroundColor: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#FAFAFA",
            },
            "&.Mui-selected": {
              backgroundColor: "#D32F2F",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#9A0007",
              },
            },
          },
          "& .MuiPickersYear-yearButton": {
            color: "#212121",
            "&.Mui-selected": {
              backgroundColor: "#D32F2F",
              color: "#FFFFFF",
            },
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#212121",
          "& .MuiPickersCalendarHeader-label": {
            color: "#212121",
          },
          "& .MuiIconButton-root": {
            color: "#212121",
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#212121",
          backgroundColor: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#F5F5F5",
          },
          "&.Mui-selected": {
            backgroundColor: "#D32F2F",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#9A0007",
            },
          },
          "&.MuiPickersDay-today": {
            border: "1px solid #D32F2F",
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          padding: "16px",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#FFFFFF",
          color: "#212121",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#212121",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: poppins.style.fontFamily,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: "#FFFFFF",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#E3F2FD",
            color: "#1976D2",
          }),
        }),
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#FF6659",
      light: "#FF8A80",
      dark: "#D32F2F",
    },
    secondary: {
      main: "#4C8C4A",
      light: "#66BB6A",
      dark: "#1B5E20",
    },
    error: {
      main: "#EF5350",
    },
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B0B0B0",
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontFamily: poppins.style.fontFamily,
    },
    h2: {
      fontFamily: poppins.style.fontFamily,
    },
    h3: {
      fontFamily: poppins.style.fontFamily,
    },
    h4: {
      fontFamily: poppins.style.fontFamily,
    },
    h5: {
      fontFamily: poppins.style.fontFamily,
    },
    h6: {
      fontFamily: poppins.style.fontFamily,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#121212",
          color: "#FFFFFF",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#2C2C2C",
            "& input": {
              color: "#FFFFFF",
            },
            "& fieldset": {
              borderColor: "#505050",
            },
            "&:hover fieldset": {
              borderColor: "#FF6659",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#FF6659",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#B0B0B0",
            "&.Mui-focused": {
              color: "#FF6659",
            },
          },
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          "& .MuiPickersCalendarHeader-root": {
            backgroundColor: "#1E1E1E",
            color: "#FFFFFF",
          },
          "& .MuiDayCalendar-header": {
            backgroundColor: "#1E1E1E",
            "& .MuiTypography-root": {
              color: "#B0B0B0",
            },
          },
          "& .MuiPickersDay-root": {
            color: "#FFFFFF",
            backgroundColor: "#1E1E1E",
            "&:hover": {
              backgroundColor: "#2C2C2C",
            },
            "&.Mui-selected": {
              backgroundColor: "#FF6659",
              color: "#FFFFFF",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#FF8A80",
              },
            },
            "&.Mui-disabled": {
              color: "#505050",
            },
          },
          "& .MuiPickersYear-yearButton": {
            color: "#FFFFFF",
            "&.Mui-selected": {
              backgroundColor: "#FF6659",
              color: "#FFFFFF",
            },
          },
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          "& .MuiPickersCalendarHeader-label": {
            color: "#FFFFFF",
            fontSize: "1rem",
            fontWeight: 600,
          },
          "& .MuiIconButton-root": {
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#2C2C2C",
            },
          },
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
          backgroundColor: "#1E1E1E",
          fontSize: "0.9rem",
          "&:hover": {
            backgroundColor: "#2C2C2C",
          },
          "&.Mui-selected": {
            backgroundColor: "#FF6659",
            color: "#FFFFFF",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#FF8A80",
            },
          },
          "&.MuiPickersDay-today": {
            border: "2px solid #FF6659",
            fontWeight: 600,
          },
          "&.Mui-disabled": {
            color: "#505050",
          },
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          padding: "16px",
          borderTop: "1px solid #2C2C2C",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E1E1E",
          color: "#FFFFFF",
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontFamily: poppins.style.fontFamily,
        },
        contained: {
          "&.MuiButton-containedPrimary": {
            backgroundColor: "#FF6659",
            color: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#FF8A80",
            },
          },
        },
        outlined: {
          "&.MuiButton-outlinedPrimary": {
            borderColor: "#FF6659",
            color: "#FF6659",
            "&:hover": {
              borderColor: "#FF8A80",
              backgroundColor: "rgba(255, 102, 89, 0.1)",
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          backgroundColor: "#1E1E1E",
          backgroundImage: "none",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.severity === "info" && {
            backgroundColor: "#1976D2",
            color: "#FFFFFF",
          }),
          ...(ownerState.severity === "error" && {
            backgroundColor: "#D32F2F",
            color: "#FFFFFF",
          }),
          ...(ownerState.severity === "success" && {
            backgroundColor: "#388E3C",
            color: "#FFFFFF",
          }),
          ...(ownerState.severity === "warning" && {
            backgroundColor: "#F57C00",
            color: "#FFFFFF",
          }),
        }),
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: "#2C2C2C",
          color: "#FFFFFF",
          "&.MuiChip-outlined": {
            borderColor: "#505050",
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#2C2C2C",
        },
      },
    },
  },
});

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }
  
  /* Asegurar que los inputs tengan buen contraste */
  input,
  textarea,
  select {
    color: inherit !important;
  }
  
  /* Fix para autocomplete */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #212121 !important;
  }
  
  [data-theme="dark"] input:-webkit-autofill,
  [data-theme="dark"] input:-webkit-autofill:hover,
  [data-theme="dark"] input:-webkit-autofill:focus,
  [data-theme="dark"] input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px #2C2C2C inset !important;
    -webkit-text-fill-color: #FFFFFF !important;
  }
`;
