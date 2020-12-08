import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/MainHeader/Header';
import { fetchDrink } from '../../services/cocktailAPI';
import './style.css';

function MainExploreDrink() {
  const [randomId, setRandomId] = useState();

  const fetchRandom = async () => {
    const randomRecipe = await fetchDrink('random', '');
    setRandomId(randomRecipe.drinks[0].idDrink);
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Bebidas"
      />
      <div className="explore-page-component">
        <nav className="navigation">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="button"
            >
              Explorar Por Ingredientes
            </button>
          </Link>
          <Link to={ `/bebidas/${randomId}` }>
            <button
              type="button"
              data-testid="explore-surprise"
              className="button"
            >
              Me Surpreenda!
            </button>
          </Link>
        </nav>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default MainExploreDrink;
