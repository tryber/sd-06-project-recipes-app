import React from 'react';
import Header from '../components/Header';

function Recipes() {
  const TRUE = true;
  return (
    <div>
      <Header title="Comidas" search={ TRUE } />
    </div>
  );
}

export default Recipes;
