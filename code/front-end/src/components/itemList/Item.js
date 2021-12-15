import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PropTypes from "prop-types";

const ItemCard = (props) => {
    const classes = useStyles();
    const { data } = props;
    return (
      <Card className={classes.root}>
        <CardContent >
            <a className={classes.title} href="www.baidu.com">{data.title}</a>
            <div className={classes.content}>
              <img className={classes.image} src={data.url} alt={data.title+"图片"}></img>
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

ItemCard.propTypes = {
  data: PropTypes.object,
};

export default ItemCard;