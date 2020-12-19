import React from 'react';
import { Header, Footer, RecipesList } from '../components';
import '../style/Comidas.css';

function Comidas() {
  return (
    <div className="food">
      <Header title="Comidas" />
      <RecipesList title="Comidas" />
      <Footer />
    </div>
  );
}

export default Comidas;
