import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreDetailsDrinks from '../components/ExploreDetailsDrinks';
import '../css/Explorar.css';

function ExplorarBebidas() {
  return (
    <div>
      <Header pageTitle="Explorar Bebidas" searchAbled={ false } />
      <ExploreDetailsDrinks />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
