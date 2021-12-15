import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import searchBoxStyles from "./styles";
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://localhost:8000";
const SearchForm = () => {
  const classes = searchBoxStyles();
  const { register, handleSubmit } = useForm();
  const [ kw , setKw ] = useState();
  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setKw(value);
  }

  return (
    <form >
      <TextField
        {...register("keyword", {required: true,})}
        className={classes.textField}
        label="请输入关键词"
        onChange={handleOnChange}
      />
      <Button 
        className={classes.searchBtn}
        variant="contained"
        color="secondary"
        value="Search"
        type="button"
        startIcon={<SearchIcon/>}
      >
        <Link
          className={classes.textBtn}
          to={"/search/" + kw}
        >搜索</Link>
      </Button>
    </form>
  );
}

export default SearchForm;