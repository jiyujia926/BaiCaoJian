import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  root: {
    width: 800,
    marginTop: theme.spacing(1),
    marginLeft: "0px",
    boxShadow: "0 0px 0px #fff",
  },
  cardContent: {
    padding: "16px 16px 0 0px",
  },
  bookName: {
    fontSize: 20,
    color: "#00796b",
    margin: "0px 0px 0px 0px",
  },
  addition: {
    fontSize: 14,
    color: "#aaa",
    margin: "0 0 0 0",
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
  bookContent: {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px",
    padding: "0 0 0 5px",
  },
  basicInfo: {
    display: "box",
    maxWidth: "100%",
    color: "#aaa",
    fontSize: 14,
    margin: "-10px 0 0 0",
  },
  abstract: {
    fontSize: 15,
    display: "box",
    maxWidth: "100%",
    padding: "0 0 0 0px",
    //height: 15*1.4*3,
    lineHight: 1.4,
    overflow: "hidden",
    textOverflow: "clip",
    boxOrient: "vertical",
    lineClamp: 3
  },
  medical_func: {
    fontSize: 15,
  },
  text: {
    padding: "0 0 0 10px",
  },
  image: {
    maxWidth: 100,
    maxHeight: 100,
  },
  bookBody: {
    display: "flex",
  },
}));

export default useStyles;
