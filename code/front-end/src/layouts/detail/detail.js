import React from "react";
import Footer from "../../components/footer/Footer";
import DetailInfo from "../../components/detailinfo/DetailInfo";
import SearchForm from "../../components/searchBox/SearchBox";
import LogoImg from "../../images/LOGO.png";
import useStyles from "./styles";
import {useNavigate} from "react-router-dom";


const Detail = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <div className={classes.root}>
      <img
        className={classes.logo}
        src={LogoImg}
        alt="Logo"
        onClick={() => {
          navigate('/');
        }}
      />
      <div className={classes.main}>
        <div className={classes.searchForm}>
          <SearchForm />
        </div>
        <DetailInfo />
      </div>
      <Footer />
    </div>
  );
}

export default Detail;