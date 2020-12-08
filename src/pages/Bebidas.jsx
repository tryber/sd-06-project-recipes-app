import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardsDrink from '../components/CardsDrink';
import ButtonCategoriesDrink from '../components/ButtonCategoriesDrink';
import '../styles/marginHederAndFooter.css';

function Bebidas() {
  const namePage = 'Bebidas';
  const buttonIs = true;

  return (
    <div className="container-margin-heder container-margin-footer">
      <Header name={ namePage } button={ buttonIs } />
      <ButtonCategoriesDrink />
      <CardsDrink />
      <Footer />
    </div>
  );
}

export default Bebidas;
