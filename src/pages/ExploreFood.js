import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreFood() {
  return (
    <>
      <Header title="Explorar Comidas" />
      <div>
        <button type="button">
          <Link
            to="/explorar/comidas/ingredientes"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </Link>
        </button>
      </div>

      <div>
        <button type="button">
          <Link
            to="/explorar/comidas/area"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </Link>
        </button>
      </div>

      <div>
        <button type="button">
          <Link
            to="/comidas/52771"
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

export default ExploreFood;
