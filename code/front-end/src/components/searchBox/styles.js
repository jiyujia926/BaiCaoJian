import { makeStyles } from "@material-ui/core/styles";

const searchBoxStyles = makeStyles(()=>({
  root: {
    display: "flex",
    width: "808px",
    height: "40px",
  },
  textField: {
    flex: "1",
    display: "flex",
    borderRadius: "20px !important",
    boxShadow: "0 0 0 1px rgb(0 0 0 / 5%), 0 2px 4px 1px rgb(0 0 0 / 9%) !important",
    "&:hover,&:focus": {
      boxShadow: "0 0 0 1px rgb(0 0 0 / 10%), 0 2px 4px 1px rgb(0 0 0 / 18%) !important",
    },
  },
  input: {
    padding: "0 20px",
    width: "100%",
  },
  searchBtn: {
    borderRadius: "20px",
    margin: "0 0 0 12px",
  },
  textBtn: {
    color: "#fff",
    textDecoration: "none",
  },
}))

export default searchBoxStyles;