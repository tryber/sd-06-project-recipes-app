import React from 'react';
import ExplorarIngredientes from '../components/ExplorarIngredientes';
import Header2 from '../components/Header2';
import MenuInferior from '../components/MenuInferior';

function ComidasIngredientes() {
  return (
    <div>
      <Header2 title="Explorar Ingredientes" />
      <ExplorarIngredientes />
      <MenuInferior />
    </div>
  );
}

export default ComidasIngredientes;
