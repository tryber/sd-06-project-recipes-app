import React from 'react';
import Header from '../components/Header';

function DoneRecipe() {
  const FALSE = false;
  return (
    <div>
      <Header title="Receitas Feitas" search={ FALSE } />
    </div>
  );
}

export default DoneRecipe;
