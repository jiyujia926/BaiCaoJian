import { createTheme } from "@material-ui/core/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
      light: "#48a999", 
      dark: "#004c40",
    },
    secondary: {
      main: "#558b2f",
      light: "#85bb5c",
      dark: "#255d00",
    },
    error: {
      main: "#7f0000",
    },
    success: {
      main: "#004c40",
    },
  },
  components: {
    SpeedDial: {
      styleOverrides: {
        fab: {
          backgroundColor: "#004c40",
        },
      },
    },
  },
});