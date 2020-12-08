import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkList from '../components/DrinkList';

function Bebidas() {
  const enableSearch = true;
  return (
    <div>
      <Header pageTitle="Bebidas" searchAbled={ enableSearch } />
      <DrinkList />
      <Footer />
    </div>
  );
}

export default Bebidas;
