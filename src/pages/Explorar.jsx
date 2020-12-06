import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../hooks/RecipesAppContext';
import '../styles/Explorar.css';

function Explorar() {
  const { setSearchHeader } = useContext(RecipesAppContext);
  useEffect(() => setSearchHeader(false), []);
  return (
    <>
      <Header name="Explorar" button={ false } />
      <div className="explore-btn">
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
      </div>
      <Footer />
    </>
  );
}

export default Explorar;
