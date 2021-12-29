import { makeStyles } from "@material-ui/core/styles";

const searchBoxStyles = makeStyles(()=>({
  root: {
    display: "flex",
    padding: "24px 0",
  },
  paperList: {
    width: "800px",
  },
  itemName: {
    minWidth: "80px",
    fontWeight: "600 !important",
  },
  right: {
    display: "flex",
    width: "400px",
    margin: "0 8px",
    flexDirection: "column",
  },
  paperName: {
    margin: "0 0 8px",
    textAlign: "center",
    padding: "50px 20px",
  },
  paperImg: {
    textAlign: "center",
  },
  dial: {
    position: "absolute",
    bottom: "0px",
    right: "0px",
  },
}))

export default searchBoxStyles;