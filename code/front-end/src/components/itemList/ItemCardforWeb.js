import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import webStyles from "./webStyles";

const ItemCardforWeb = (props) => {
  const classes = webStyles();
  const { data } = props;

  return (
    <Card>
      <CardContent>
        
      </CardContent>
    </Card>
  )
};

ItemCardforWeb.PropTypes = {
  data: PropTypes.object,
};

export default ItemCardforWeb;
