import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  root: {
    margin: "0 0 0 20px",
    display: "flex",
  },
  logo: {
    maxWidth: "120px",
    maxHeight: "90px",
    margin: "-10px 10px 0 0",
  },
  searchBox: {
    margin: "0 0 0 25px",
    padding: "12px 0 0 0",
  },
}));

export default useStyles;