import React from 'react';
import { Header, Footer } from '../Components';
import MainScreen from '../Components/MainScreen';

function Comidas() {
  return (
    <div>
      <Header pageName="Comidas" />
      <MainScreen />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {};

export default Comidas;
