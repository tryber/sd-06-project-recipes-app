import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import FoodRecomendationCard from './FoodRecomendationCard';
import { handleIngredients } from '../services/functions';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import '../css/Details.css';

function DrinkDetail() {
  const {
    getDrinkAPI,
    drinkData,
    foodData,
    getFoodAPI,
  } = useContext(RecipesContext);

  let currentRecipe = {};
  if (drinkData) {
    [currentRecipe] = drinkData;
  }
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getDrinkAPI('id-filter', `${id}`);
    getFoodAPI('name-filter', '');
  }, []);

  const handleRecomendations = () => {
    const maxSize = 6;
    const startIndex = 0;

    if (foodData.length > maxSize) {
      return foodData.slice(startIndex, maxSize).map((item, index) => (

        <FoodRecomendationCard
          testid={ index }
          key={ `recipe${index}` }
          recipe={ item }
          idMeal={ item.idMeal }
        />
      ));
    }
  };

  useEffect(() => {
    handleIngredients(drinkData, setIngredients, setMeasures);
  }, [drinkData]);

  const toProgress = () => {
    const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (currentStorage !== null && Object.keys(currentStorage).includes('cocktails')) {
      const newStorage = {
        ...currentStorage,
        cocktails: {
          ...currentStorage.cocktails,
          [id]: currentStorage.cocktails[`${id}`]
            ? [...currentStorage.cocktails[`${id}`]]
            : [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    } else {
      const newStorage = {
        ...currentStorage,
        cocktails: {
          [id]: [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
  };

  const handleBtnRender = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const done = JSON.parse(localStorage.getItem('doneRecipes'));
    let isInProgress = false;
    let isDone = false;

    if (inProgress !== null && Object.keys(inProgress).includes('cocktails')) {
      isInProgress = Object
        .keys(inProgress.cocktails).some((recipeId) => recipeId === id);
    }

    if (done !== null) {
      isDone = done.some(({ id: recipeId }) => recipeId === id);
    }

    if (!isDone) {
      return (
        <Link to={ `/bebidas/${id}/in-progress` }>
          <button
            type="button"
            className="details-in-progress-btn"
            onClick={ () => toProgress() }
            data-testid="start-recipe-btn"
          >
            { isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
          </button>
        </Link>
      );
    }
  };

  const handleDetails = () => {
    if (drinkData && drinkData.length === 1) {
      return (
        <div
          className="detail-container"
        >
          <div className="detail-img-container">
            <img
              src={ currentRecipe.strDrinkThumb }
              alt="Receita"
              data-testid="recipe-photo"
            />
          </div>
          <div className="detail-title-btn-container">
            <div className="detail-title-container">

              <h3 data-testid="recipe-title">
                { currentRecipe.strDrink }
              </h3>

              <div className="detail-category-container">
                <h3 data-testid="recipe-category">{ currentRecipe.strAlcoholic }</h3>
              </div>

            </div>

            <div className="detail-btn-container">
              <ShareBtn id={ id } />
              <FavoriteBtn
                id={ id }
                type="bebida"
                recipe={ currentRecipe }
              />
            </div>
          </div>

          <div className="detail-ingredients-container">
            <div className="detail-ingredients-title">
              <h3>Ingredients</h3>
            </div>

            <div className="detail-ingredients">
              <ul>
                {ingredients.length && ingredients.map((ingredient, i) => (
                  <li
                    data-testid={ `${i}-ingredient-name-and-measure` }
                    key={ `ingredient-${i}` }
                  >
                    <span>{ingredient}</span>
                    <span>{measures[i]}</span>
                  </li>
                ))}

              </ul>
            </div>

          </div>

          <div className="detail-instructions-container">
            <div className="detail-instructions-title">
              <h3>Instructions</h3>
            </div>

            <div className="detail-instructions">
              <p data-testid="instructions">
                { currentRecipe.strInstructions }
              </p>
            </div>
            <hr />
          </div>

          <div className="detail-recomendation-container">
            {handleRecomendations()}
          </div>

          <div className="in-progress-btn-container">
            { handleBtnRender() }
          </div>

        </div>
      );
    }
    return <span>Loading</span>;
  };

  return (
    <div>
      { handleDetails() }
    </div>

  );
}

export default DrinkDetail;
