import React from 'react';
import { Header, Footer, RecipesCards } from '../components';
import '../style/Bebidas.css';

function Bebidas() {
  return (
    <div className="drink">
      <Header title="Bebidas" />
      <RecipesCards title="Bebidas" />
      <Footer />
    </div>
  );
}

export default Bebidas;
