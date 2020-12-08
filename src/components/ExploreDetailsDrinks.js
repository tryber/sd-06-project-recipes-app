import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';

function ExploreDetailsDrinks() {
  const {
    getDrinkAPI,
    drinkData,
  } = useContext(RecipesContext);

  useEffect(() => {
    getDrinkAPI('random-filter', '');
  }, []);

  const handleRendering = () => {
    if (drinkData.length) {
      return (
        <div className="explore-page-container">
          <Link
            className="link-explore"
            to="/explorar/bebidas/ingredientes"
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
            className="link-explore"
            to={ `/bebidas/${drinkData[0].idDrink}` }
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
export default ExploreDetailsDrinks;
