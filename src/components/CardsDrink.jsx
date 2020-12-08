import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import { requestApiDrinkFilterName } from '../services/requestDrink';
import FavoriteHeart from './FavoriteHeart';
import '../styles/CardFood.css';

function CardsDrink() {
  const {
    cards: {
      cardDrink,
      setCardDrink,
    },
  } = useContext(RecipesAppContext);

  const arrayVoid = 0;
  useEffect(() => {
    if (cardDrink.length === arrayVoid) {
      requestApiDrinkFilterName()
        .then((arrayApi) => setCardDrink(arrayApi));
    }
  }, []);

  const upToParameter12 = 12;
  const [upToParameter, setUpToParameter] = useState(upToParameter12);

  const onClickMoreDrink = () => {
    setUpToParameter(upToParameter + upToParameter12);
  };

  const ofTheFirstParameter = 0;
  const disableButtonMoreResults = true;

  if (cardDrink.length === arrayVoid) {
    return (<span>Loading...</span>);
  }

  return (
    <div className="all-card-food">
      {cardDrink.slice(ofTheFirstParameter, upToParameter)
        .map((objDrink, index) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
          } = objDrink;
          return (
            <div
              key={ idDrink }
              data-testid={ `${index}-recipe-card` }
              className="card-food"
            >
              <FavoriteHeart id={ idDrink } detailsDrink={ objDrink } card />
              <Link
                to={ `/bebidas/${idDrink}` }
              >
                <img
                  className="imgBig"
                  src={ strDrinkThumb }
                  alt={ strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
              <div className="text-btn">
                <Link
                  to={ `/bebidas/${idDrink}` }
                >
                  <h4
                    data-testid={ `${index}-card-name` }
                  >
                    { strDrink }
                  </h4>
                </Link>
              </div>
            </div>
          );
        })}
      <button
        type="button"
        className="show-results"
        onClick={ onClickMoreDrink }
        disabled={ upToParameter > cardDrink.length ? disableButtonMoreResults : false }
      >
        Mostrar mais resultados
      </button>
    </div>
  );
}

export default CardsDrink;
