import React from 'react';
import { Header, Footer } from '../Components';
import Explore from '../Components/Explore';

function ExplorarBebidas() {
  return (
    <div>
      <Header pageName="Explorar Bebidas" />
      <h1>Explorar Bebidas</h1>
      <Explore />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
