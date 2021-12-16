import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PropTypes from "prop-types";

// TODO: 根据实际数据情况修改style
const ItemCardforBook = (props) =>{
  const classes = {useStyles};
  const { data } = props;
  
  return (
    <Card>
      <CardHeader>
        <p className={classes.title}>{data.title}</p>
        <Typography>{data.date}</Typography>
        <Typography>标签: {data.tags}</Typography>
      </CardHeader>
      <CardContent>
        <img className={classes.image} src={data.url} alt={data.title+"图片"}></img>
        <div className={classes.content}>
          <Typography>作者: {data.author}</Typography>
          <Typography>出版社: {data.public}</Typography>
          <Typography
            className={classes.abstract}
            variant="body2"
            component="p"
          >
            <strong>简介: </strong>
            {data.abstract == "" ? "暂时没有内容噢" : data.abstracy}
          </Typography>
        </div>
      </CardContent>
    </Card>
  )
};

ItemCardforBook.propsTypes = {
  data: PropTypes.string.object,
};

export default ItemCardforBook;
