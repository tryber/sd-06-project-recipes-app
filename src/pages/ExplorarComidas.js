import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreDetailsFood from '../components/ExploreDetailsFood';
import '../css/Explorar.css';

function ExplorarComidas() {
  return (
    <div>
      <Header pageTitle="Explorar Comidas" searchAbled={ false } />
      <ExploreDetailsFood />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
