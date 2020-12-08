import React from 'react';
import { Header, Footer } from '../Components';
import Explore from '../Components/Explore';

function ExplorarBebidas() {
  return (
    <div className="explore">
      <Header pageName="Explore Drinks" />
      <Explore />
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
