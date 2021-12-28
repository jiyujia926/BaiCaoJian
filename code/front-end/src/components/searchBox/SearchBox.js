import React, { useState } from "react";
import {InputBase, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import searchBoxStyles from "./styles";
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from "react-hook-form";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Paper from "@mui/material/Paper";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://127.0.0.1:8000";
const server = "http://baicao.zjuers.com:6636"
const SearchForm = () => {
  const classes = searchBoxStyles();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [kw, setKw] = useState();
  //const [nextUrl, setNextUrl] = useState("");
  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setKw(value);
  }
  const checkKeyword = () => {
    if (kw !== undefined) {
      //setNextUrl("/search/" + kw);
      navigate("/search/" + kw);
    }
  }

  return (
    <form className={classes.root}>
      <Paper component="form" className={classes.textField}>
        <InputBase
          {...register("keyword", { required: true, })}
          placeholder="请输入关键词"
          onChange={handleOnChange}
          className={classes.input}
          inputProps={{ 'aria-label': 'key' }}
        />
      </Paper>
      <Button
        className={classes.searchBtn}
        variant="contained"
        color="secondary"
        value="Search"
        type="button"
        startIcon={<SearchIcon />}
        onClick={checkKeyword}
      >
        搜索
      </Button>
      {/*<TextField
        {...register("keyword", { required: true, })}
        className={classes.textField}
        onChange={handleOnChange}
      />*/}
    </form>
  );
}

export default SearchForm;