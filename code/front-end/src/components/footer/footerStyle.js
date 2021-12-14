import { makeStyles } from "@material-ui/core/styles";

const footerStyle = makeStyles((theme)=> ({
  footer: {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    width: "100%",
    height: "25px",
    backgroundColor: "#00796b",
    zIndex: "9999",
    padding: "3px",
    color: "#fff",
  },
}));

export default footerStyle;