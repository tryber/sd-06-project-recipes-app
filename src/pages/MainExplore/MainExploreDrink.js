import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchDrink } from '../../services/cocktailAPI';

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
      <div className="explore-area">
        <nav className="navigation">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="btn btn-secondary"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to={ `/bebidas/${randomId}` }>
            <button
              type="button"
              data-testid="explore-surprise"
              className="btn btn-secondary"
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
