import React from "react";
import Footer from "../../components/footer/Footer";
import DetialInfo from "../../components/detailinfo/DetialInfo";
import SearchForm from "../../components/searchBox/SearchBox";
import LogoImg from "../../images/LOGO.png";
import useStyles from "./styles";


const Detail = () => {
  const classes = useStyles();


  return (
    <div>
      <div className={classes.searchform}>
        <img className={classes.searchformimg} src={LogoImg} alt="Logo"></img>
        <SearchForm />
      </div>
      <DetialInfo />
      <Footer />
    </div>
  );
}

export default Detail;