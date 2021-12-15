import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import searchBoxStyles from "../searchBox/styles";
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://localhost:8000";
const RealSearch = () => {
  const classes = searchBoxStyles();
  const { register, handleSubmit } = useForm();
  const [ kw , setKw ] = useState();
  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setKw(value);
  }
  const handleOnClick = () => {
    let searchText = document.getElementById("real-search");
    let data = { Keyword: kw };
    searchForKeyword(data);
  }

  useEffect(() => {
    // set default value
    let url = window.location.href;
    let pos = url.search("search/");
    let kw = url.substring(pos+7);
    let searchText = document.getElementById("real-search");
    searchText.value = decodeURI(kw);
    let data = {
      Keyword: decodeURI(kw),
    };
    // TODO: request for search
    searchForKeyword(data);
  }, [])
  async function searchForKeyword(data) {
    console.log(data)
    let res = await axios.post(`${server}/search/`, data);
    console.log(res);
  }
  return (
    <form >
      <TextField
        id="real-search"
        {...register("keyword", {required: true,})}
        className={classes.textField}
        label="请输入关键词"
        onChange={handleOnChange}
      />
      <Button 
        className={classes.searchBtn}
        variant="contained"
        color="secondary"
        onClick={handleOnClick}
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

export default RealSearch;