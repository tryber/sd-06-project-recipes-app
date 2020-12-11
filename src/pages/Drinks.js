import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const TRUE = true;
  return (
    <div>
      <Header title="Bebidas" search={ TRUE } />
      <Footer />
    </div>
  );
}

export default Drinks;
