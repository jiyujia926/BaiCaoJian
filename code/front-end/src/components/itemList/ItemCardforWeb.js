import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import webStyles from "./webStyles";
import { Typography } from "@mui/material";

const ItemCardforWeb = (props) => {
  const classes = webStyles();
  const { data } = props;

  return (
    <Card>
      <CardContent>
        <div calssName={classes.newsName}>
          <a className={classes.newsName} href={data.url}>{data.title}</a>
          <p className={classes.addition}>{data.time}】 来源: {data.source}</p>
        </div>
        <div className={classes.newsBody}>
          <div className={classes.bookContent}>
            <Typography
              className={classes.abstract}
              variant="body2"
              component="p"
            >
              {data.info === "" ? "暂时没有内容噢" : data.info}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
};

ItemCardforWeb.propTypes = {
  data: PropTypes.object,
};

export default ItemCardforWeb;
