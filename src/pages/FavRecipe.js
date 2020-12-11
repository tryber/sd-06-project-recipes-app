import React from 'react';
import Header from '../components/Header';

function FavRecipe() {
  const FALSE = false;
  return (
    <div>
      <Header title="Receitas Favoritas" search={ FALSE } />
    </div>
  );
}

export default FavRecipe;
