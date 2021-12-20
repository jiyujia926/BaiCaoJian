import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  paginator: {
    justifyContent: "center",
    padding: "10px",
  }
}));

export default useStyles;