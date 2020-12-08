import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodList from '../components/FoodList';

function Comidas() {
  const enableSearch = true;
  return (
    <div>
      <Header pageTitle="Comidas" searchAbled={ enableSearch } />
      <FoodList />
      <Footer />
    </div>
  );
}

export default Comidas;
