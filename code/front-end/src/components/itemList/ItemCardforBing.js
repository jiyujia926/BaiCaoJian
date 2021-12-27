import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PropTypes from "prop-types";

const ItemCardforBing = (props) => {
  const classes = useStyles();
  const { data } = props;
  return (
    <Card className={classes.root}>
      <CardContent >
        <a className={classes.title} href={data.url}>{data.title}</a>
        <Typography className={classes.url}>
          {data.url}
        </Typography>
        <div className={classes.content}>
          <Typography
              className={classes.abstract}
              variant="body2"
              component="p"
          >
            {data.abstract}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

ItemCardforBing.propTypes = {
  data: PropTypes.object,
};

export default ItemCardforBing;