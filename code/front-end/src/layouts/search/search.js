import React from "react";
import RealSearch from "../../components/RealSearch/RealSearch";
import { useState, useEffect } from "react";
import ItemList from "../../components/itemList/ItemList";
import useStyles from "./styles";
import LogoImg from "../../images/LOGO.png";
import Tabs from "../../components/Tabs/Tabs";
import axios from "axios";
import RecommendList from "../../components/recommendedList/RecommendList";

axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
const server = "https://baicao.zjuers.com:6636"

const Search = () => {
  const [ results, setResults ] = useState({citiao: [], shuben: [], tupian: [], xinwen: [], wangye: []});
  const [ keyword, setKeyword ] = useState("");
  const [ mostKeywords, setMostKeywords ] = useState([]);
  const classes = useStyles();
  const getResults = (res) => {
    setResults(res.data);
    console.log(res.data);
  }
  const getKeyword = (key) => {
    setKeyword(key);
    console.log(key);
  };

  async function mostSearch() {
    let res = await axios.post(`${server}/mostsearching/`);
    setMostKeywords(res.data);
  }

  useEffect(()=>{
    mostSearch();
  }, [])
  
  return (
    <div className={classes.root}>
      <img className={classes.logo} src={LogoImg} alt="百草笺 Logo" />
      <div >
        <div className={classes.searchBox}>
          <RealSearch
            shResult={getResults}
            shKeyword={getKeyword}/>
        </div>
        <div className={classes.searchBody}>
        <Tabs
          keyword = {keyword}
          items_citiao={results.citiao}
          items_shuben={results.shuben}
          items_tupian={results.tupian}
          items_xinwen={results.xinwen}
          items_wangye={results.wangye}
          />
        <RecommendList 
          data = {mostKeywords}
        />
        </div>
      </div>
    </div>
  );
}

export default Search;