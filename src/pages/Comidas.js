import React from 'react';
import { Header, Footer, RecipesCards } from '../components';
import '../style/ComidaBebida.css';

function Comidas() {
  return (
    <div className="meals">
      <Header title="Comidas" />
      <RecipesCards title="Comidas" />
      <Footer />
    </div>
  );
}

export default Comidas;
