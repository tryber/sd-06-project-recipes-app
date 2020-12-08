import React from 'react';
import { Link } from 'react-router-dom';
import HeaderExplorePages from '../components/HeaderExplorePages';
import Footer from '../components/Footer';

function ExplorePage() {
  return (
    <div>
      <HeaderExplorePages pageName="Explorar" />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        <Link to="/explorar/comidas">
          <button
            data-testid="explore-food"
            className="category-button"
            type="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            className="category-button"
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

export default ExplorePage;
