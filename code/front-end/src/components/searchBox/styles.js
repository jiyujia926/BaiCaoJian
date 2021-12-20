import { makeStyles } from "@material-ui/core/styles";

const searchBoxStyles = makeStyles((theme)=>({
    textField: {
      width: "660px",
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