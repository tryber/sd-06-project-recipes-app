import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { fetchMeal } from '../../services/mealAPI';

function MainExploreFood() {
  const [randomId, setRandomId] = useState();

  const fetchRandom = async () => {
    const randomRecipe = await fetchMeal('random', '');
    setRandomId(randomRecipe.meals[0].idMeal);
  };

  useEffect(() => {
    fetchRandom();
  }, []);

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Comidas"
      />
      <div className="explore-area">
        <nav className="navigation">
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="btn btn-secondary"
            >
              Por Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              data-testid="explore-by-area"
              className="btn btn-secondary"
            >
              Por Local de Origem
            </button>
          </Link>
          <Link to={ `/comidas/${randomId}` }>
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

export default MainExploreFood;
