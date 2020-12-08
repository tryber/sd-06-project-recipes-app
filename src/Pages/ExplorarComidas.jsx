import React from 'react';
import { Header, Footer } from '../Components';
import Explore from '../Components/Explore';

function ExplorarComidas() {
  return (
    <div className="explore">
      <Header pageName="Explore Foods" />
      <Explore />
      <Footer />
    </div>
  );
}

export default ExplorarComidas;
