import React from "react";
import ItemCard from "../../components/itemList/ItemCard";
import RealSearch from "../../components/RealSearch/RealSearch";
import { useState, useEffect } from "react";

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
      search
      <RealSearch shResult={getResults}/>
      <Items />
    </div>
    
  );
}

export default Search;