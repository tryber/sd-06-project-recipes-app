import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Recipes() {
  const TRUE = true;
  return (
    <div>
      <Header title="Comidas" search={ TRUE } />
      <Footer />
    </div>
  );
}

export default Recipes;
