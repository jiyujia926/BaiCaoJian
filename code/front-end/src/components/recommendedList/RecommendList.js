import React from "react";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";
import Button from '@mui/material/Button';

const RecommendList = (props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>大家都在搜</Typography>
      <ul className={classes.list}>
        {data.map((item) => {
           var url="http://baicao.zjuers.com/search/"+item.key;
           return(
            <Button href={url} underline="hover"><li>📌{item.key}</li></Button>
            )})}
      </ul>
    </div>
  )
};

RecommendList.propTypes = {
  data: PropTypes.array,
};

export default RecommendList;