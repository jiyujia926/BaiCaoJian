import { ThemeProvider } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { theme } from "./style.js";
import Admin from "./admin.js";
import Footer from "./components/footer/Footer";
import SearchForm from "./components/searchBox/SearchBox";
import LogoImg from "./images/logo.svg";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Admin />
      <div style={{
          width: "100%",
          justifyContent: "center", 
          alignItems: "center",
          display: "flex",  
          display: "-webkit-flex",
        }}
      >
        <img src={LogoImg} alt="Logo"></img>
      </div> 
      <div style={{
          width: "100%",
          justifyContent: "center", 
          alignItems: "center",
          display: "flex",  
          display: "-webkit-flex",
        }}
      >
        <SearchForm />
      </div>
      <Footer />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);