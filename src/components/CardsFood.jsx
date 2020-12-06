import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../hooks/RecipesAppContext';
import {
  requestApiFoodFilterName,
} from '../services/requestFood';

function CardsFood() {
  const {
    cards: {
      cardFood,
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  useEffect(() => {
    requestApiFoodFilterName()
      .then((arrayApi) => setCardFood(arrayApi));
  }, []);

  const ofTheFirstParameter = 0;
  const upToParameter12 = 12;

  const arrayVoid = 0;
  return (
    <div>
      {(cardFood.length === arrayVoid) ? <span>Loading...</span> : cardFood
        .slice(ofTheFirstParameter, upToParameter12).map(({
          idMeal,
          strMeal,
          strMealThumb,
        }, index) => (
          <Link
            key={ idMeal }
            to={ `/comidas/${idMeal}` }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ strMealThumb }
                alt={ strMeal }
                data-testid={ `${index}-card-img` }
              />
              <h4
                data-testid={ `${index}-card-name` }
              >
                { strMeal }
              </h4>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default CardsFood;
