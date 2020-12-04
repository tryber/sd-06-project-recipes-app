import React from 'react';
import { Header, Footer } from '../Components';
import ExploreDrinkIngredients from '../Components/ExploreDrinkIngredients';

function ExplorarBebidasIngredientes() {
  return (
    <div>
      <Header pageName="Explorar Ingredientes" />
      <ExploreDrinkIngredients />
      <Footer />
    </div>
  );
}

export default ExplorarBebidasIngredientes;
