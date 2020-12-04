import React from 'react';
import { Header, Footer, RecipesCards } from '../components';
import '../style/Comidas.css';

function Comidas() {
  return (
    <div className="food">
      <Header title="Comidas" />
      <RecipesCards title="Comidas" />
      <Footer />
    </div>
  );
}

export default Comidas;
