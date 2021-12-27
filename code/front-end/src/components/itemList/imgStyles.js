import { makeStyles } from "@material-ui/core";

const imgStyles = makeStyles(()=>({
  root: {
    width: "280px",
    height: "430px",
    margin: "10px",
  },
  content: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  imgName: {
    textAlign: "center",
  },
  imgs: {
    maxWidth: "260px",
    maxHeight: "340px",
  },
}));

export default imgStyles;
