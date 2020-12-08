import React from 'react';
import { Header, Footer } from '../Components';
import MainScreen from '../Components/MainScreen';

function Comidas() {
  return (
    <div>
      <Header pageName="Foods" />
      <MainScreen />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {};

export default Comidas;
