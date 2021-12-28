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
  }
}));

export default webStyles;