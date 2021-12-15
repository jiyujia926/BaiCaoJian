import React from "react";
import ItemCard from "../../components/itemList/Item";
import RealSearch from "../../components/RealSearch/RealSearch";
import { useState, useEffect } from "react";
import { render } from "@testing-library/react";

const Search = () => {
  const [ results, setResults ] = useState([]);
  // const forceUpdate = React.useCallback(() => updateState({}), []);
  let listItem = [];
  
  const getResults = (res) => {
    console.log(res);
    console.log(res.data);
    setResults(res.data);
    console.log();
  }
  const Test = (() => {
    console.log(results);
    return (<div>{results.map(result => <ItemCard data={result} />)}</div>);

  });

  useEffect(()=>{
    console.log("use effect");
    console.log(results);
  })
  
  return (
    <div>
      search
      <RealSearch shResult={getResults}/>
      <Test />
      
      <ItemCard
        data={{
          title: "itemcard",
          abstract: "item-abstract test. I'm fine, thank u zju@1897. How are u? Good night and have a nice dream. 这是中文测试，我很好，谢谢您嘞，你咋样？",
          url: "http://www.zhongyoo.com/uploads/allimg/1901/shuangshen.jpg",
        }}
      >
      </ItemCard>
    </div>
    
  );
}

export default Search;