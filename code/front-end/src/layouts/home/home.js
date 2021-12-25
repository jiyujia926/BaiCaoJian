import React from "react";
import Button from "@material-ui/core/Button";

import Footer from "../../components/footer/Footer";
import SearchForm from "../../components/searchBox/SearchBox";
import LogoImg from "../../images/LOGO.png";
import useStyles from "./styles";

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://1.15.97.64:1241/:6636";
const server = "http://127.0.0.1:6636";

const Home = () => {
  const classes = useStyles();
  const handleClick = () => {
    alert("hello!");
    add()
  };
  async function add() {
      let res = await axios.post(`${server}/add/`)
      alert(res.data)
  }
  return (
    <div className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        button for jaja
      </Button>
      <div className={classes.img}>
        <img src={LogoImg} alt="Logo"></img>
      </div> 
      <div className={classes.searchform}>
        <SearchForm />
      </div>
      <Footer />
    </div>
  );
}

export default Home;