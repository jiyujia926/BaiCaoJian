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
    <div>
      <div className={classes.searchform}>
        <img
          className={classes.searchformimg}
          src={LogoImg}
          alt="Logo"
          onClick={() => {
            navigate('/');
          }}
        />
        <SearchForm />
      </div>
      <DetailInfo />
      <Footer />
    </div>
  );
}

export default Detail;