import React from "react";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const RecommendList = (props) => {
  const classes = {useStyles};
  const { data } = props;

  return (
    <div>
      <Typography>相关内容推荐: </Typography>
      <ul>
        {data.map(item => <li>{item.content}</li>)}
      </ul>
    </div>
    
  )
};

RecommendList.propTypes = {
  data: PropTypes.array,
};

export default RecommendList;