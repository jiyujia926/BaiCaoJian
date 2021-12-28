import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(()=>({
  cardContainer: {
    margin: "-24px",
  },
  tabContainer: {
    marginTop: "8px",
    marginRight: "16px",
  },
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