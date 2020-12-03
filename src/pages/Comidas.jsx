import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardsFood from '../components/CardsFood';
import ButtonCategoriesFood from '../components/ButtonCategoriesFood';

function Comidas() {
  const namePage = 'Comidas';
  const buttonIs = true;

  return (
    <div>
      { function batatinha() { console.log('batatinha'); } }
      <Header name={ namePage } button={ buttonIs } />
      <ButtonCategoriesFood />
      <CardsFood />
      <Footer />
    </div>
  );
}

export default Comidas;
