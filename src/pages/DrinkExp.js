import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function DrinkExp() {
  const FALSE = false;
  return (
    <div>
      <Header title="Explorar Bebidas" search={ FALSE } />
      <Footer />
    </div>
  );
}

export default DrinkExp;
