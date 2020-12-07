import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Explore() {
  return (
    <div className="food-container">
      <Header title="Explorar" />

      <div className="body-perfil">
        <div>
          <Link to="/explorar/comidas">
            <button
              type="button"
              data-testid="explore-food"
              className="btn-sub-header"
            >
              Explorar Comidas
            </button>
          </Link>
        </div>
        <div>
          <Link to="/explorar/bebidas">
            <button
              type="button"
              data-testid="explore-drinks"
              className="btn-sub-header"
            >
              Explorar Bebidas
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
