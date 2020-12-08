import React from 'react';
import Header from '../components/Header';
import ExploreIngredients from '../components/ExploreIngredients';
import Footer from '../components/Footer';

function ExplorarIngredientes() {
  const enableSearch = false;
  return (
    <div>
      <Header pageTitle="Explorar Ingredientes" searchAbled={ enableSearch } />
      <ExploreIngredients />
      <Footer />
    </div>
  );
}

export default ExplorarIngredientes;
