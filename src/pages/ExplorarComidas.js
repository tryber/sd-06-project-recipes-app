import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExplorarComidas() {
  return (
    <main>
      <Header pageName="Explorar Comidas" renderSearch={ false } />
      ExplorarComidas Page
      <Footer />
    </main>
  );
}

export default ExplorarComidas;
