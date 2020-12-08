import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ExploreFood from '../components/ExploreFood';
import ExploreDrinks from '../components/ExploreDrinks';
import '../css/Explorar.css';

function Explorar() {
  return (
    <div className="explore-container">
      <Header pageTitle="Explorar" searchAbled={ false } />
      <ExploreFood />
      <ExploreDrinks />
      <Footer />
    </div>
  );
}

export default Explorar;
