import React from "react";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const RecommendList = (props) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>大家都在搜</Typography>
      <ul className={classes.list}>
        {data.map(item => <li>{item.key}</li>)}
      </ul>
    </div>
    
  )
};

RecommendList.propTypes = {
  data: PropTypes.array,
};

export default RecommendList;