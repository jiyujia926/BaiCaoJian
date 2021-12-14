import { makeStyles } from "@material-ui/core/styles";

const searchBoxStyles = makeStyles((theme)=>({
    textField: {
      width: "600px",
    },
    searchBtn: {
      margin: theme.spacing(1),
    }
}))

export default searchBoxStyles;