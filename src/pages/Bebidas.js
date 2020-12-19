import React from 'react';
import { Header, Footer, RecipesList } from '../components';
import '../style/Bebidas.css';

function Bebidas() {
  return (
    <div className="drink">
      <Header title="Bebidas" />
      <RecipesList title="Bebidas" />
      <Footer />
    </div>
  );
}

export default Bebidas;
