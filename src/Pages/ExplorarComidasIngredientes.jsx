import React from 'react';
import { Header, Footer } from '../Components';
import ExploreFoodIngredients from '../Components/ExploreFoodIngredients';

function ExplorarComidasIngredientes() {
  return (
    <div>
      <Header pageName="Explorar Ingredientes" />
      <ExploreFoodIngredients />
      <Footer />
    </div>
  );
}

export default ExplorarComidasIngredientes;
