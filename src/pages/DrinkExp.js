import React from 'react';
import Header from '../components/Header';

function DrinkExp() {
  const FALSE = false;
  return (
    <div>
      <Header title="Explorar Bebidas" search={ FALSE } />
    </div>
  );
}

export default DrinkExp;
