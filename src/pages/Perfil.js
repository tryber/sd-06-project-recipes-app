import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  return (
    <main>
      <Header pageName="Perfil" renderSearch={ false } />
      Perfil Page
      <Footer />
    </main>
  );
}

export default Perfil;
