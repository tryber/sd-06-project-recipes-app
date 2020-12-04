import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../Components';

function Explorar() {
  return (
    <div style={ { marginTop: '80px' } }>
      <Header pageName="Explorar" />
      <Link to="/explorar/comidas" data-testid="explore-food">Explorar Comidas</Link>
      <Link to="/explorar/bebidas" data-testid="explore-drinks">Explorar Bebidas</Link>
      <Footer />
    </div>
  );
}

export default Explorar;
