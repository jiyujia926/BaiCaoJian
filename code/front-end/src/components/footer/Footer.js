import React from "react";
import { BottomNavigation } from "@material-ui/core";
import footerStyle from "./footerStyle";

const Footer = () => {
  const classes = footerStyle();

  return (
    <BottomNavigation className={classes.footer}>
      <span>Copyright@BaiCaoJian Developer Team 2021</span>
    </BottomNavigation>

  );
};

export default Footer;