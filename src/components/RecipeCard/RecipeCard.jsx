import React from 'react';
import PropTypes from 'prop-types';

const RecipeCard = (props) => {
  const { recipe, index } = props;

  return (
    <div
      className="recipe-card"
      data-testid={ `${index}-recipe-card` }
    >
      <div className="img-thumb">
        <img
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          data-testid={ `${index}-card-img` }
          alt="recipe display"
        />
      </div>
      <h3
        className="recipe-title"
        data-testid={ `${index}-card-name` }
      >
        { recipe.strMeal || recipe.strDrink }
      </h3>
    </div>
  );
};

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};
