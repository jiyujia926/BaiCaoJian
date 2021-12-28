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
// const server = "http://127.0.0.1:8000";
const server = "http://baicao.zjuers.com:6636"
const SearchForm = () => {
  const classes = searchBoxStyles();
  const { register, handleSubmit } = useForm();
  const [kw, setKw] = useState();
  const [nextUrl, setNextUrl] = useState("");
  const handleOnChange = (event) => {
    let { name, value } = event.target;
    setKw(value);
  }
  const checkKeyword = () => {
    if (kw !== undefined) {
      setNextUrl("/search/" + kw);
    }
  }

  return (
    <form >
      <TextField
        {...register("keyword", { required: true, })}
        className={classes.textField}
        label="请输入关键词"
        onChange={handleOnChange}
      />
      <Link className={classes.textBtn}
        to={nextUrl}>
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
      </Link>
    </form>
  );
}

export default SearchForm;