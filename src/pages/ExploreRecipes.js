import React from 'react';
import { Link } from 'react-router-dom';
import { Footer, HeaderNoSearch } from '../components';

export default function ExploreRecipes() {
  return (
    <div>
      <HeaderNoSearch id="Explorar" />
      <Link to="/explorar/comidas">
        <button
          type="button"
          data-testid="explore-food"
        >
          Explorar Comidas
        </button>
      </Link>
      <Link to="/explorar/bebidas">
        <button
          type="button"
          data-testid="explore-drinks"
        >
          Explorar Bebidas
        </button>
      </Link>
      <Footer />
    </div>
  );
}
