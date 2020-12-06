import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../hooks/RecipesAppContext';
import { requestApiDrinkFilterName } from '../services/requestDrink';

function CardsDrink() {
  const {
    cards: {
      cardDrink,
      setCardDrink,
    },
  } = useContext(RecipesAppContext);

  useEffect(() => {
    requestApiDrinkFilterName()
      .then((arrayApi) => setCardDrink(arrayApi));
  }, []);

  const ofTheFirstParameter = 0;
  const upToParameter12 = 12;

  const arrayVoid = 0;
  return (
    <div>
      {(cardDrink.length === arrayVoid) ? <span>Loading...</span> : cardDrink
        .slice(ofTheFirstParameter, upToParameter12).map(({
          idDrink,
          strDrink,
          strDrinkThumb,
        }, index) => (
          <Link
            key={ idDrink }
            to={ `/bebidas/${idDrink}` }
          >
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ strDrinkThumb }
                alt={ strDrink }
                data-testid={ `${index}-card-img` }
              />
              <h4
                data-testid={ `${index}-card-name` }
              >
                { strDrink }
              </h4>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default CardsDrink;
