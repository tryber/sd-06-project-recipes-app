import React from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

function ExploreIngredients() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Ingredientes"
      />
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreIngredients;
