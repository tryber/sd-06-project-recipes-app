import React from 'react';
import { Link } from 'react-router-dom';

import './Explorar.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

const Explorar = () => (
  <div>
    <Header />

    <div className="main-explore">
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link
        to="/explorar/bebidas"
      >
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
    </div>
    <Footer />
  </div>
);

export default Explorar;
