import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/MainHeader/Header';
import Footer from '../../components/Footer/Footer';
import './style.css';

function ExplorePage() {
  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar"
      />
      <div className="explore-page-component">
        <Link to="/explorar/comidas">
          <button
            type="button"
            data-testid="explore-food"
            className="button"
          >
            Explorar Comidas
          </button>
        </Link>
        <Link to="/explorar/bebidas">
          <button
            type="button"
            data-testid="explore-drinks"
            className="button"
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
