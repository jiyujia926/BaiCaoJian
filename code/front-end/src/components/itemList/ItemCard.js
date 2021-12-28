import React, { useEffect } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";
import useStyles from "./styles";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
// TODO: 点击title链接到详情页

const ItemCard = (props) => {
  const classes = useStyles();
  const { data, keyword } = props;
  const raw_url = "http://baicao.zjuers.com/detail/";
  let id = nanoid();
  let url = (raw_url + data.id).replace(/ /, '');
  const highlight = (idvalue, keyword) => {
    var textbox = document.getElementById(idvalue);
    if ("" == keyword) 
      return;
    // get text content
    var temp = textbox.innerHTML;
    // console.log(temp);
    var htmlReg = new RegExp("\<.*?\>", "i");
    var arr = new Array();

    // replace html tags
    for (var i = 0; true; i++) {
      // match html tags 
      var tag = htmlReg.exec(temp);
      if (tag) {
        arr[i] = tag;
      } else {
        break;
      }
      temp = temp.replace(tag, "{[(" + i + ")]}");
    }

    // split keywords into array
    let words = decodeURIComponent(keyword.replace(/\,/g, ' ')).split(/\s+/);

    // replace keywords
    for (let w = 0; w < words.length; w++) {
      var r = new RegExp("(" + words[w].replace(/[(){}.+*?^$|\\\[\]]/g, "\\$&") + ")", "ig");
      temp = temp.replace(r, "<b style='color:Green;'>$1</b>");
    }

    for (var i = 0; i < arr.length; i++) {
      temp = temp.replace("{[(" + i + ")]}", arr[i]);
    }

    textbox.innerHTML = temp;
  }

  useEffect(()=>{
  //  highlight(id, keyword)
  }, []);

  return (
    <Card id={id} className={classes.root}>
      <CardContent >
        <a
          target="_blank"
          className={classes.title}
          href={url}
          >{data.title}
        </a>
        <Typography className={classes.url}>
          {url}
        </Typography>
        <div className={classes.content}>
          <img className={classes.image} src={data.url} alt={data.title + "图片"}></img>
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
  keyword: PropTypes.string,
};

export default ItemCard;