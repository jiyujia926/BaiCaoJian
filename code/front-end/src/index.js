import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { theme } from "./style.js";
import Admin from "./admin.js";
import Footer from "./components/footer/Footer";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Admin /> 
      <Footer />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);