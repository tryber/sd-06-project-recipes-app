import React from 'react';
import { Header, Footer } from '../Components';
import Explore from '../Components/Explore';

function ExplorarComidas() {
  return (
    <div>
      <Header pageName="Explorar Comidas" />
      <h1>Explorar Comidas</h1>
      <Explore />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
