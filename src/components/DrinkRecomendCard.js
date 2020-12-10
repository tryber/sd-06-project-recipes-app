import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function DrinkRecomendCard(props) {
  const { element, idx } = props;
  const { strDrink, strDrinkThumb } = element;
  return (
    <Link
      to={ {
        pathname: `/bebidas/${element.idDrink}`,
        state: {
          dataRecipes: element,
        },
      } }
    >
      <div data-testid={ `${idx}-recomendation-card` }>
        <h2 data-testid={ `${idx}-recomendation-title` }>{ strDrink }</h2>
        <img
          src={ strDrinkThumb }
          alt={ `${strDrink} photograph` }
          data-testid={ `${idx}-card-img` }
        />
      </div>
    </Link>
  );
}

DrinkRecomendCard.propTypes = {
  element: PropTypes.objectOf.isRequired,
  idx: PropTypes.number.isRequired,
  strDrink: PropTypes.string.isRequired,
  strDrinkThumb: PropTypes.string.isRequired,
};

export default DrinkRecomendCard;
