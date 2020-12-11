import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function IngredientsOrigin() {
  const TRUE = true;
  return (
    <div>
      <Header title="Explorar Origem" search={ TRUE } />
      <Footer />
    </div>
  );
}

export default IngredientsOrigin;
