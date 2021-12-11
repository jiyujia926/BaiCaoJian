import React from "react";
import Button from "@material-ui/core/Button";

import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();
  const handleClick = () => {
    alert("hello!");
  };
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