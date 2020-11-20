import React from 'react';
import Header from '../components/Header';

function IngredientsMeal() {
  const FALSE = false;
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ FALSE } />
    </div>
  );
}

export default IngredientsMeal;
