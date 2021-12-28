import { makeStyles } from "@material-ui/core/styles";

const searchBoxStyles = makeStyles((theme)=>({
  root: {
    display: "flex",
    width: "808px",
  },
  textField: {
    flex: "1",
  },
  searchBtn: {
    margin: theme.spacing(1),
  },
  textBtn: {
    color: "#fff",
    textDecoration: "none",
  },
}))

export default searchBoxStyles;