import React, { useContext } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import '../styles/card.css';

function Card() {
  const { recipes, typeRecipe, setIdRecipe } = useContext(ContextRecipes);
  const history = useHistory();
  const location = useLocation().pathname;
  const MAX_NUMBER_OF_CARDS = 12;
  let name = '';
  let thumb = '';
  let id = '';
  let path = '';

  if (location.includes('comidas')) {
    name = 'strMeal';
    thumb = 'strMealThumb';
    id = 'idMeal';
    path = 'comidas';
  } else {
    name = 'strDrink';
    thumb = 'strDrinkThumb';
    id = 'idDrink';
    path = 'bebidas';
  }

  const goToDetails = ({ target }) => {
    const idRecipe = target.id;
    setIdRecipe(idRecipe);
    history.push(`/${path}/${idRecipe}`);
  };

  return (
    <div className="container-card">
      { recipes.map((recipe, index) => (
        <div
          onClick={ goToDetails }
          id={ recipe[id] }
          onKeyPress={ goToDetails }
          role="button"
          tabIndex="0"
          data-testid={ `${index}-recipe-card` }
          key={ index }
          // className="card"
          className="unit-card"
        >
          <h5
            className="title-card"
            data-testid={ `${index}-card-name` }
            id={ recipe[id] }
          >
            {recipe[name]}
          </h5>
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe[thumb] }
            alt={ typeRecipe }
            id={ recipe[id] }
            aria-hidden="true"
            width="100%"
          />
        </div>
      )).filter((_, index) => index < MAX_NUMBER_OF_CARDS) }
      <br />
      <br />
    </div>
  );
}

export default Card;
