import React from "react";
import Footer from "../../components/footer/Footer";
import DetailInfo from "../../components/detailinfo/DetailInfo";
import SearchForm from "../../components/searchBox/SearchBox";
import LogoImg from "../../images/LOGO.png";
import useStyles from "./styles";


const Detail = () => {
  const classes = useStyles();


  return (
    <div>
      <div className={classes.searchform}>
      <a href="http://baicao.zjuers.com">
        <img className={classes.searchformimg} src={LogoImg} alt="Logo"/></a>
        <SearchForm />
      </div>
      <DetailInfo />
      <Footer />
    </div>
  );
}

export default Detail;