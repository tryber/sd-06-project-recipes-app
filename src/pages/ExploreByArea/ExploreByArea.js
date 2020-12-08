import React from 'react';
import Header from '../../components/MainHeader/Header';
import BtnSearchBar from '../../components/MainHeader/BtnSearchBar';
import Footer from '../../components/Footer/Footer';

function ExploreByArea() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Origem"
        BtnSearchBar={ BtnSearchBar }
      />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreByArea;
