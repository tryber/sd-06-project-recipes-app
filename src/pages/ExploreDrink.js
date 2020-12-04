import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreDrink() {
  return (
    <>
      <Header title="Explorar Bebidas" />
      <div>
        <button type="button">
          <Link
            to="/explorar/bebidas/ingredientes"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </Link>
        </button>
      </div>

      <div>
        <button type="button">
          <Link
            to="/bebidas/178319"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </Link>
        </button>
      </div>
      <Footer />
    </>
  );
}

export default ExploreDrink;
