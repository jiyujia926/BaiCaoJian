import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import imgStyles from "./imgStyles";

const ItemCardforImgs = (props) => {
  const classes = imgStyles();
  const { data } = props;
  return (
    <div>
      <Card>
        <CardHeader ></CardHeader>
        <CardContent>
          <p className={classes.imgName}>{data.name}</p>
          <img
            className={classes.imgs}
            src={data.url}
            alt={data.name}
          />
        </CardContent>
      </Card>
    </div>
  )
};

ItemCardforBook.propTypes = {
  data: PropTypes.object,
};

export default ItemCardforImgs;