import { makeStyles } from "@material-ui/core";

const webStyles = makeStyles(()=>({
  root: {
    width: "800px",
    margin: "10px 0 40px 0",
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