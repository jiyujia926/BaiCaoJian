import { makeStyles } from "@material-ui/core";

const webStyles = makeStyles((theme)=>({
  root: {
    width: "800px",
    margin: theme.spacing(1),
    marginLeft: "0px",
    boxShadow: "0 0px 0px #fff",
  },
  cardContent: {
    paddingLeft: "0px",
  },
  newsName: {
    fontSize: 20,
    color: "#00796b",
    margin: "0px 0px 0px 0px",
  },
  addition: {
    fontSize: 14,
    color: "#aaa",
    margin: "0 0 0 0",
  },
  newsBody: {
    margin: "10px 0 0 0",
  },
  abstract: {
    fontSize: 15,
    display: "box",
    maxWidth: "100%",
    padding: "0 0 0 0px",
    //height: 15*1.4*3,
    lineHight: 1.4,
    overflow: "hidden",
    textOverflow: "clip",
    boxOrient: "vertical",
    lineClamp: 3
  },
}));

export default webStyles;