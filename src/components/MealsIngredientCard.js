import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import recipesAppContext from '../context/recipesAppContext';
import '../pages/ExploreIngredients/explore-ingredients.css';

function MealsIngredientCard({ ingredient, index }) {
  const imageUrl = `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`;
  const { setFetchMeal } = useContext(recipesAppContext);
  const history = useHistory();

  const handleIngredients = async () => {
    const ingredientName = ingredient.strIngredient.split(' ').join('_');
    console.log('ingredient name', ingredientName);
    await setFetchMeal('ingredient', ingredientName);
    history.push('/comidas');
  };

  return (
    <div
      className="card"
      data-testid={ `${index}-ingredient-card` }
    >
      <input
        data-testid={ `${index}-card-img` }
        className="card-img-top"
        src={ imageUrl }
        alt={ `Filtrar por ingrediente: ${ingredient.strIngredient}` }
        type="image"
        onClick={ handleIngredients }
      />
      <div className="card-body">
        <h5
          className="card-title"
          data-testid={ `${index}-card-name` }
        >
          {ingredient.strIngredient}
        </h5>
      </div>
    </div>
  );
}

MealsIngredientCard.propTypes = {
  ingredient: propTypes.shape({
    strIngredient: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default MealsIngredientCard;
