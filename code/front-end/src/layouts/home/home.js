import React, { useEffect, useState } from "react";

import Footer from "../../components/footer/Footer";
import SearchForm from "../../components/searchBox/SearchBox";
import LogoImg from "../../images/LOGO.png";
import useStyles from "./styles";
import ReactWordcloud from 'react-wordcloud';

import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
// const server = "http://1.15.97.64:1241/:6636";  
const server = "http://baicao.zjuers.com:6636"

const Home = () => {
  const [ mostKeywords, setMostKeywords ] = useState([]);
  const classes = useStyles();
  const handleClick = () => {
    alert("hello!");
    add()
  };

  async function add() {
    let res = await axios.post(`${server}/add/`)
    alert(res.data)
  }

  async function mostSearch() {
    let res = await axios.post(`${server}/cloud/`);
    let keyword_list = [];
    for (let i = 0; i < res.data.length; i++) {
      let tmp = {};
      tmp.text = res.data[i].key;
      tmp.value = res.data[i].value;
      keyword_list.push(tmp);
    }
    setMostKeywords(keyword_list);
  }

  useEffect(()=>{
    mostSearch();
  }, []);

  return (
    <div className={classes.root}>
      {/* <Button variant="contained" color="primary" onClick={handleClick}>
        button for jaja
      </Button> */}
      <div className={classes.imgBlock}>
        <img src={LogoImg} alt="Logo" className={classes.img}/>
      </div> 
      <div className={classes.searchform}>
        <SearchForm />
      </div>
      <div className={classes.wordCloud}>
        <ReactWordcloud 
          className={classes.wordContent}
          words={mostKeywords}/>
      </div>
      <Footer />
    </div>
  );
}

export default Home;