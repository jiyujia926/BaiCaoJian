import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { useEffect } from "react";

// TODO: 根据实际数据情况修改style
const ItemCardforBook = (props) =>{
  const classes = useStyles();
  const { data } = props;
  useEffect(()=>{
    console.log(data)
  })
  return (
    <Card>
      <CardContent className={classes.root}>
        <div calssName={classes.bookName}>
          <p className={classes.bookName}>{data.title}</p>
          <p className={classes.addition}>【{data.publishdate}】 标签: {data.tag}</p>
        </div>
        <div className={classes.bookBody}>
          <img className={classes.image} src={data.url} alt={data.title+"图片"}></img>
          <div className={classes.bookContent}>
            <Typography
              className={classes.abstract}
              variant="body2"
              component="p"
            >
              <strong>简介: </strong>
              {data.info === "" ? "暂时没有内容噢" : data.info}
            </Typography>
            <div className={classes.basicInfo}>
              <p>作者: {data.author}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <p>出版社: {data.publish}</p>
            </div>
          </div>
          
        </div>
         
      </CardContent>
    </Card>
  )
};

ItemCardforBook.propsTypes = {
  data: PropTypes.object,
};

export default ItemCardforBook;
