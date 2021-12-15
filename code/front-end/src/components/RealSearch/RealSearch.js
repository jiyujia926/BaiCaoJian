import React, { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import searchBoxStyles from "../searchBox/styles";
import SearchIcon from '@material-ui/icons/Search';
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "http://localhost:8000";
const RealSearch = (props) => {
  const classes = searchBoxStyles();
  // define states
  const { register, handleSubmit } = useForm();
  const [ kw , setKw ] = useState();
  // define props
  const { shResult } = props;

  // handle onchange: update keyword
  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setKw(value);
  }
  // hanlde onclick: request for search
  const handleOnClick = () => {
    // get input and request search
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
    // request for search
    let data = {
      Keyword: decodeURI(kw),
    };
    searchForKeyword(data);
  }, [])

  // request for search keyword
  async function searchForKeyword(data) {
    console.log(data);
    let res = await axios.post(`${server}/search/`, data);
    shResult(res.data);
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
};

RealSearch.propTypes = {
  shResult: PropTypes.func,
};

export default RealSearch;