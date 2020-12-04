import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../components';
import '../style/Explorar.css';

function Explorar() {
  return (
    <div className="explore">
      <Header title="Explorar" />
      <div className="div-buttons">
        <Link to="/explorar/comidas">
          <button
            className="button-food-page"
            data-testid="explore-food"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <br />
        <Link to="/explorar/bebidas">
          <button
            className="button-drink-page"
            data-testid="explore-drinks"
            type="button"
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
