import React from "react";
import ItemCard from "../../components/itemList/Item";
import RealSearch from "../../components/RealSearch/RealSearch";
import { useState } from "react";

const Search = () => {
  const [ results, setResults ] = useState([]);
  const getResults = (data) => {
    setResults(data);
    console.log(results);
  }
  return (
    <div>
      search
      <RealSearch shResult={getResults}/> 
      
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