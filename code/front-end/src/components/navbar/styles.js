import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  navbar: {
    display: "flex", 
    paddingRight: "5px",  
    color: "green", 
  },
  emptydiv: {
    flex: "1",
  },
  poppers: {
    margin: "2px",
  },
  form_head: {
    textAlign: "center",
    padding: "20px 24px 0",
  },
  form_content: {
    padding: "8px 24px 20px",
  },
  form_button: {
    //color: "green",
  },
  form_option: {
    marginTop: "0.5em",
    justifyContent: "right",
  },
}));
export default useStyles;