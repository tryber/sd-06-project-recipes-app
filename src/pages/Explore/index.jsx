import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

function Explore() {
  return (
    <div className="explore-page">
      <Header pageName="Explorar" />
      <Navbar />

      <Link
        to="/explorar/comidas"
        data-testid="explore-food"
      >
        Explorar Comidas

      </Link>

      <Link
        to="/explorar/bebidas"
        data-testid="explore-drinks"
      >
        Explorar Bebidas

      </Link>
    </div>
  );
}

export default Explore;
