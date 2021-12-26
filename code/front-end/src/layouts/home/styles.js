import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles(() => ({
  img: {
    width: "100%",
    justifyContent: "center", 
    alignItems: "center",
    display: "flex",  
    display: "-webkit-flex",
  },
  searchform: {
    width: "100%",
    justifyContent: "center", 
    alignItems: "center",
    display: "flex",  
    display: "-webkit-flex",
  },
  wordCloud: {
    margin: "30px 0 0 40%",
    width: "200px",
    height: "200px",
    justifyContent: "center", 
    alignItems: "center",
  },
}));
export default useStyles;