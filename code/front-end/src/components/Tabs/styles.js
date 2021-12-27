import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme)=>({
  paginator: {
    justifyContent: "center",
    padding: "10px",
  },
  tupian: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    margin: "0 0 40px 0", 
  },
}));

export default useStyles;