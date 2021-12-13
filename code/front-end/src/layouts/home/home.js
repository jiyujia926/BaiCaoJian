import React from "react";
import Button from "@material-ui/core/Button";

import useStyles from "./styles";

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://122.51.228.166:8000";
const server = "http://127.0.0.1:8000";

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
      <div>
          home
      </div>
      <Button variant="contained" color="primary" onClick={handleClick}>
        button for jaja
      </Button>
      <Button variant="contained" color="secondary" href="/search">
        to search
      </Button>
      <Button variant="contained" color="secondary" href="/detail">
        to detail
      </Button>
      <Button variant="contained" color="secondary" href="/user">
        to user
      </Button>
    </div>
  );
}

export default Home;