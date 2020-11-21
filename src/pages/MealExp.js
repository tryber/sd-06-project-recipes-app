import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function MealExp() {
  const FALSE = false;
  return (
    <div>
      <Header title="Explorar Comidas" search={ FALSE } />
      <Footer />
    </div>
  );
}

export default MealExp;
