import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import imgStyles from "./imgStyles";

const ItemCardforImgs = (props) => {
  const classes = imgStyles();
  const { data } = props;
  return (
      <Card className={classes.root}>
        <CardContent classesName={classes.content}>
          <p className={classes.imgName}>{data.name}</p>
          <img
            className={classes.imgs}
            src={data.url}
            alt={data.name}
          />
        </CardContent>
      </Card>
  )
};

ItemCardforImgs.propTypes = {
  data: PropTypes.object,
};

export default ItemCardforImgs;