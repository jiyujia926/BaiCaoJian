import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  root: {
    width: 800,
    margin: theme.spacing(1),
    boxShadow: "0 0px 0px #fff",
  },
  title: {
    fontSize: 20,
    color: "#00796b",
    borderBottom: 10,
  },
  url: {
    fontSize: 14,
    margin: "0 0 0 0",
    color: "#00796b",
  },
  content: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
  },
  abstract: {
    fontSize: 15,
    display: "box",
    maxWidth: "100%",
    color: "#255d00",
    padding: "0 0 0 10px",
    height: 15*1.4*3,
    lineHight: 1.4,
    overflow: "hidden",
    textOverflow: "clip",
    boxOrient: "vertical",
    lineClamp: 3
  },
  medical_func: {
    fontSize: 15,
    color: "#255d00",
    padding: "0 0 0 10px",
  },
  image: {
    maxWidth: 100,
    maxHeight: 100,
  },
}));

export default useStyles;
