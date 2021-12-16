import React from "react";
import ItemCard from "../../components/itemList/ItemCard";
import RealSearch from "../../components/RealSearch/RealSearch";
import { useState, useEffect } from "react";
import ItemList from "../../components/itemList/ItemList";
const Search = () => {
  const [ results, setResults ] = useState([]);
  
  const getResults = (res) => {
    setResults(res.data);
  }
  const Items = (() => {
    console.log(results);
    return (<div>{results.map(result => <ItemCard data={result} />)}</div>);
  });

  useEffect(()=>{
    console.log(results);
  })
  
  return (
    <div>
      <div style={{margin: "0 0 0 25px"}}>
      <RealSearch shResult={getResults}/>
      </div>
      
      <ItemList items={results} />
    </div>
    
  );
}

export default Search;