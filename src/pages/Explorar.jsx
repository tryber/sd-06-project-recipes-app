import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/marginHederAndFooter.css';
import '../styles/Explorar.css';

function Explorar() {
  return (
    <div className="container-margin-heder container-margin-footer">
      <Header name="Explorar" button={ false } />
      <div className="container-big-btn">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="big-btn comida-icon"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="big-btn bebida-icon"
          >
            Explorar Bebidas
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Explorar;
