import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function FoodRecomendCard(props) {
  const { element, idx } = props;
  const { strMeal, strMealThumb } = element;
  return (
    <Link
      to={ {
        pathname: `/comidas/${element.idMeal}`,
        state: {
          dataRecipes: element,
        },
      } }
    >
      <div data-testid={ `${idx}-recomendation-card` }>
        <h2 data-testid={ `${idx}-recomendation-title` }>{ strMeal }</h2>
        <img
          src={ strMealThumb }
          alt={ `${strMeal} photograph` }
          data-testid={ `${idx}-card-img` }
        />
      </div>
    </Link>
  );
}

FoodRecomendCard.propTypes = {
  element: PropTypes.objectOf.isRequired,
  idx: PropTypes.number.isRequired,
  strMeal: PropTypes.string.isRequired,
  strMealThumb: PropTypes.string.isRequired,
};

export default FoodRecomendCard;
