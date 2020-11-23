import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ComidasIngredientes() {
  return (
    <main>
      <Header pageName="Explorar Ingredientes" renderSearch={ false } />
      ComidasIngredientes Page
      <Footer />
    </main>
  );
}

export default ComidasIngredientes;
