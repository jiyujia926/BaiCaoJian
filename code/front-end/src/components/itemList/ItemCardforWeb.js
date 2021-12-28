import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@material-ui/core";
import webStyles from "./webStyles";

const ItemCardforWeb = (props) => {
  const classes = webStyles();
  const { data } = props;

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <div className={classes.newsName}>
          <a className={classes.newsName} href={data.url}>{data.title}</a>
          <p className={classes.addition}>{data.time} 来源: {data.source}</p>
        </div>
        <div className={classes.newsBody}>
            <Typography
              className={classes.abstract}
              variant="body2"
              component="p"
            >
              {data.info === "" ? "暂时没有内容噢" : data.info}
            </Typography>
        </div>
      </CardContent>
    </Card>
  )
};

ItemCardforWeb.propTypes = {
  data: PropTypes.object,
};

export default ItemCardforWeb;
