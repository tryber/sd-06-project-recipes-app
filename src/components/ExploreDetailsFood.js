import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import '../css/Explorar.css';

function ExploreDetailsFood() {
  const {
    getFoodAPI,
    foodData,
  } = useContext(RecipesContext);

  useEffect(() => {
    getFoodAPI('random-filter', '');
  }, []);

  const handleRendering = () => {
    if (foodData.length) {
      return (
        <div className="explore-page-container">
          <Link
            className="link-explore"
            to="/explorar/comidas/ingredientes"
          >
            <button
              className="btn-explore-page"
              data-testid="explore-by-ingredient"
              type="button"
            >
              Por Ingredientes
            </button>
          </Link>

          <Link
            to="/explorar/comidas/area"
            className="link-explore"
          >
            <button
              className="btn-explore-page"
              data-testid="explore-by-area"
              type="button"
            >
              Por Local de Origem
            </button>
          </Link>

          <Link
            className="link-explore"
            to={ `/comidas/${foodData[0].idMeal}` }
          >
            <button
              className="btn-explore-page"
              data-testid="explore-surprise"
              type="button"
            >
              Me Surpreenda!
            </button>
          </Link>

        </div>
      );
    }
  };

  return (
    <div>
      { handleRendering() }
    </div>
  );
}

export default ExploreDetailsFood;
