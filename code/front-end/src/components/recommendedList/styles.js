import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    width: "200px",
    margin: "145px 0 0 80px",
  },
  title: {
    fontSize: "18px",
    color: "rgba(0,121,107,0.86)",
  },
  list: {
    listStyleType: "none",
    padding: "0",
    margin: "8px 0",
    fontWeight: "200",
  },
}));

export default useStyles;