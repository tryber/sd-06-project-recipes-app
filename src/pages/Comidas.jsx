import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardsFood from '../components/CardsFood';
import ButtonCategoriesFood from '../components/ButtonCategoriesFood';
import '../styles/marginHederAndFooter.css';
import '../styles/CardFood.css';

function Comidas() {
  const namePage = 'Comidas';
  const buttonIs = true;

  return (
    <div className="container-margin-heder container-margin-footer div-body">
      <Header name={ namePage } button={ buttonIs } />
      <ButtonCategoriesFood />
      <CardsFood />
      <Footer />
    </div>
  );
}

export default Comidas;
