import React from 'react';
import Header from '../components/Header';

function MealExp() {
  const FALSE = false;
  return (
    <div>
      <Header title="Explorar Comidas" search={ FALSE } />
    </div>
  );
}

export default MealExp;
