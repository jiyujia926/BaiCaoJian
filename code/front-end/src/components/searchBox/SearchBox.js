import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import searchBoxStyles from "./styles";
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from "react-hook-form";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://localhost:8000";
const SearchForm = () => {
  const classes = searchBoxStyles();
  const { register, handleSubmit } = useForm();
  
  const onSubmit = (data)=> {
    console.log(data["keyword"]);
    // http request
    axios.post(`${server}/add/`).then(
      res => {
        console.log("get res: ", res);
      }, error => {
        console.log(error);
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        {...register("keyword", {required: true,})}
        className={classes.textField}
        label="Keyword"
      />
      <Button 
        className={classes.searchBtn}
        variant="contained"
        color="secondary"
        startIcon={<SearchIcon/>}
        value="Search"
        type="submit"
      >
        Search
      </Button>
    </form>
  );
}

export default SearchForm;