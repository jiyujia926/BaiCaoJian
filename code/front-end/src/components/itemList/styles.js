import { makeStyles } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";

const useStyles = makeStyles((theme)=>({
  root: {
    width: 500,
    margin: theme.spacing(1),
    boxShadow: "0 0px 0px #fff",
  },
  title: {
    fontSize: 20,
    color: "#00796b",
    borderBottom: 10,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
  },
  abstract: {
    fontSize: 14,
    color: "#558b2f",
  },
  image: {
    maxWidth: 80,
    maxHeight: 80,
  }
}));

export default useStyles;