import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import DrinkRecomendationCard from './DrinkRecomendationCard';
import { handleIngredients } from '../services/functions';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import '../css/Details.css';

function FoodDetail() {
  const {
    getFoodAPI,
    foodData,
    drinkData,
    getDrinkAPI,
  } = useContext(RecipesContext);

  let currentRecipe = {};
  if (foodData) {
    [currentRecipe] = foodData;
  }
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getFoodAPI('id-filter', `${id}`);
    getDrinkAPI('name-filter', '');
  }, []);

  const handleRecomendations = () => {
    const maxSize = 6;
    const startIndex = 0;

    if (drinkData.length > maxSize) {
      return drinkData.slice(startIndex, maxSize).map((item, index) => (

        <DrinkRecomendationCard
          testid={ index }
          key={ `recipe${index}` }
          recipe={ item }
          idDrink={ item.idDrink }
        />
      ));
    }
  };

  useEffect(() => {
    handleIngredients(foodData, setIngredients, setMeasures);
  }, [foodData]);

  function handleUrl(url) {
    if (foodData && foodData.length === 1) {
      if (url && url !== '' && url !== null) {
        const videoId = url.split('=')[1];
        return (
          <div>
            <iframe
              data-testid="video"
              title="video"
              width="360"
              height="315"
              src={ `https://www.youtube.com/embed/${videoId}` }
            />
            <hr />
          </div>
        );
      }
      return <span>No video for YOU!</span>;
    }
  }

  const toProgress = () => {
    const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (currentStorage !== null && Object.keys(currentStorage).includes('meals')) {
      const newStorage = {
        ...currentStorage,
        meals: {
          ...currentStorage.meals,
          [id]: currentStorage.meals[`${id}`] ? [...currentStorage.meals[`${id}`]] : [],
        },
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    } else {
      const newStorage = {
        ...currentStorage,
        meals: {
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

    if (inProgress !== null && Object.keys(inProgress).includes('meals')) {
      isInProgress = Object
        .keys(inProgress.meals).some((recipeId) => recipeId === id);
    }

    if (done !== null) {
      isDone = done.some(({ id: recipeId }) => recipeId === id);
    }

    if (!isDone) {
      return (
        <Link to={ `/comidas/${id}/in-progress` }>
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
    if (foodData && foodData.length === 1) {
      return (
        <div
          className="detail-container"
        >
          <div className="detail-img-container">
            <img
              src={ currentRecipe.strMealThumb }
              alt="Receita"
              data-testid="recipe-photo"
            />
          </div>
          <div className="detail-title-btn-container">
            <div className="detail-title-container">

              <h3 data-testid="recipe-title">
                { currentRecipe.strMeal }
              </h3>

              <div className="detail-category-container">
                <h3 data-testid="recipe-category">{ currentRecipe.strCategory }</h3>
              </div>

            </div>

            <div className="detail-btn-container">
              <ShareBtn id={ id } />
              <FavoriteBtn
                id={ id }
                type="comida"
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

          </div>

          <div className="video-container">
            {handleUrl(currentRecipe.strYoutube)}
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

export default FoodDetail;
