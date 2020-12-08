import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiFoodFilterName,
} from '../services/requestFood';
import '../styles/CardFood.css';

import FavoriteHeart from './FavoriteHeart';

function CardsFood() {
  const {
    cards: {
      cardFood,
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  const arrayVoid = 0;
  useEffect(() => {
    if (cardFood.length === arrayVoid) {
      requestApiFoodFilterName()
        .then((arrayApi) => setCardFood(arrayApi));
    }
  }, []);

  const upToParameter12 = 12;
  const [upToParameter, setUpToParameter] = useState(upToParameter12);

  const onClickMoreFood = () => {
    setUpToParameter(upToParameter + upToParameter12);
  };

  const ofTheFirstParameter = 0;
  const disableButtonMoreResults = true;

  if (cardFood.length === arrayVoid) {
    return (<span>Loading...</span>);
  }

  return (
    <div className="all-card-food">
      {cardFood.slice(ofTheFirstParameter, upToParameter)
        .map((objFood, index) => {
          const {
            idMeal,
            strMeal,
            strMealThumb,
          } = objFood;
          return (
            <div
              key={ idMeal }
              data-testid={ `${index}-recipe-card` }
              className="card-food"
            >
              <FavoriteHeart id={ idMeal } detailsFood={ objFood } card />
              <Link
                to={ `/comidas/${idMeal}` }
              >
                <img
                  src={ strMealThumb }
                  alt={ strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
              <div className="text-btn">
                <Link
                  to={ `/comidas/${idMeal}` }
                >
                  <h4
                    data-testid={ `${index}-card-name` }
                  >
                    { strMeal }
                  </h4>
                </Link>
              </div>
            </div>
          );
        })}
      <button
        type="button"
        onClick={ onClickMoreFood }
        className="show-results"
        disabled={ upToParameter > cardFood.length ? disableButtonMoreResults : false }
      >
        Mostrar mais resultados
      </button>
    </div>
  );
}

export default CardsFood;
