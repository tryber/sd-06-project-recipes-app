import React, { useContext } from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import recipesAppContext from '../../context/recipesAppContext';
import './style.css';

function DrinksIngredientCard({ ingredient, index }) {
  const imageUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png`;
  const { setFetchDrink } = useContext(recipesAppContext);
  const history = useHistory();

  const handleIngredients = async () => {
    const ingredientName = ingredient.strIngredient1.split(' ').join('_');
    await setFetchDrink('ingredient', ingredientName);
    history.push('/bebidas');
  };

  return (
    <div
      className="ingredient-card"
      data-testid={ `${index}-ingredient-card` }
    >
      <input
        data-testid={ `${index}-card-img` }
        className="card-img"
        src={ imageUrl }
        type="image"
        alt={ `Filtrar por ingrediente: ${ingredient.strIngredient1}` }
        onClick={ handleIngredients }
      />
      <h5
        data-testid={ `${index}-card-name` }
        className="ingredient-name"
      >
        {ingredient.strIngredient1}
      </h5>
    </div>
  );
}

DrinksIngredientCard.propTypes = {
  ingredient: propTypes.shape({
    strIngredient1: propTypes.string.isRequired,
  }).isRequired,
  index: propTypes.number.isRequired,
};

export default DrinksIngredientCard;
