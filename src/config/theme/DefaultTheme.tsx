import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#6ee909aa",
    },
    secondary: {
      main: "#ee0505",
    },
    text: {
      primary: "#05140c",
      secondary: "#1bff06",
    },
    background: {
      default: "#87CEEB",
      paper: "#",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#0a0801ad",
          color: "#d8e709",
          fontWeight: "bolder",
          "&:hover": {
            backgroundColor: "#fa9a09bb",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          transition: "box-shadow 0.3s ease, transform 0.2s ease",
          "&:hover": {
            boxShadow: "0px 8px 20px rgba(12, 4, 4, 0.3)",
            transform: "translateY(-5px)",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "color 0.3s ease, transform 0.2s ease",
          "&:hover": {
            color: "#0e0903bb",
            transform: "scale(1.2)",
          },
        },
      },
    },
  },
});
