import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PropTypes from "prop-types";

const ItemCard = (props) => {
    const classes = useStyles();
    const { data } = props;
    const raw_url = "http://localhost:3000/detail/";
    return (
      <Card className={classes.root}>
        <CardContent >
            <a className={classes.title} href={raw_url+data.title}>{data.title}</a>
            <Typography className={classes.url}>
              {raw_url+data.title}
            </Typography>
            <div className={classes.content}>
              <img className={classes.image} src={data.url} alt={data.title+"图片"}></img>
              <div>
              <Typography
                className={classes.abstract}
                variant="body2"
                component="p"
              >
                <strong>简介: </strong>{data.abstract}
              </Typography>
              <Typography
                className={classes.medical_func}
                variant="body2"
                component="p"
              >
                <strong>功效: </strong>{data.Medical_function}
              </Typography>
              </div>
            </div>
        </CardContent>
      </Card>
    );
};

ItemCard.propTypes = {
  data: PropTypes.object,
};

export default ItemCard;