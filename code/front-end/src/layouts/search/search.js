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
const server = "http://1.15.97.64:6636";

const Search = () => {
  const [ results, setResults ] = useState({citiao: [], shuben: [], tupian: []});
  const [ mostKeywords, setMostKeywords ] = useState([]);
  const classes = useStyles();
  const getResults = (res) => {
    setResults(res.data);
  }

  async function mostSearch() {
    let res = await axios.post(`${server}/mostsearching/`);
    let keyword_list = [];
    // for (let i = 0; i < res.length; i++) {

    // }
    setMostKeywords(res.data);
  }

  useEffect(()=>{
    console.log(results);
    // request for most search keywords
    mostSearch();
  })
  
  return (
    <div className={classes.root}>
      <img className={classes.logo} src={LogoImg} alt="百草笺 Logo"></img>
      <div >
        <div className={classes.searchBox}>
          <RealSearch shResult={getResults}/>
        </div>
        <div className={classes.searchBody}>
        <Tabs
          items_citiao={results.citiao}
          items_shuben={results.shuben}
          items_tupian={results.tupian}
          items_news={results.news}
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