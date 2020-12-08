import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/MainHeader/Header';
import { fetchMeal } from '../../services/mealAPI';
import './style.css';

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
      <div className="explore-page-component">
        <nav className="navigation">
          <Link to="/explorar/comidas/ingredientes">
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="button"
            >
              Explorar Ingredientes
            </button>
          </Link>
          <Link to="/explorar/comidas/area">
            <button
              type="button"
              data-testid="explore-by-area"
              className="button"
            >
              Explorar Local de Origem
            </button>
          </Link>
          <Link to={ `/comidas/${randomId}` }>
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
      <Footer />
    </div>

  );
}

export default MainExploreFood;
