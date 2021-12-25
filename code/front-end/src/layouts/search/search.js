import React from "react";
import RealSearch from "../../components/RealSearch/RealSearch";
import { useState, useEffect } from "react";
import ItemList from "../../components/itemList/ItemList";
import useStyles from "./styles";
import LogoImg from "../../images/LOGO.png";
import Tabs from "../../components/Tabs/Tabs";

const Search = () => {
  const [ results, setResults ] = useState({citiao: [], shuben: []});
  const classes = useStyles();
  const getResults = (res) => {
    setResults(res.data);
  }

  useEffect(()=>{
    console.log(results);
  })
  
  return (
    <div className={classes.root}>
      <img className={classes.logo} src={LogoImg} alt="百草笺 Logo"></img>
      <div >
        <div className={classes.searchBox}>
          <RealSearch shResult={getResults}/>
        </div>
        <Tabs
          items_citiao={results.citiao}
          items_shuben={results.shuben}
          items_news={results.news}
          items_imgs={results.imgs}/>
      </div>

    </div>
  );
}

export default Search;