import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explorar() {
  return (
    <main>
      <Header pageName="Explorar" renderSearch={ false } />
      Explorar Page
      <Footer />
    </main>
  );
}

export default Explorar;
