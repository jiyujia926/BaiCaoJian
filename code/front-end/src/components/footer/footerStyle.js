import { makeStyles } from "@material-ui/core/styles";

const footerStyle = makeStyles(()=> ({
  footer: {
    position: "fixed",
    left: "0px",
    bottom: "0px",
    width: "100%",
    height: "25px",
    backgroundColor: "#00796b",
    zIndex: "9999",
    color: "#fff",
  },
}));

export default footerStyle;