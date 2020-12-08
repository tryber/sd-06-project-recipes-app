import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import FoodRecomendationCard from './FoodRecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
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
  const [showMessage, setShowMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getDrinkAPI('id-filter', `${id}`);
    getFoodAPI('name-filter', '');
  }, []);

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite !== null) {
      const alreadyFavorite = favorite.some(({ id: recipeId }) => recipeId === id);
      setIsFavorite(alreadyFavorite);
    }
  }, [isFavorite]);

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

  const handleIngredients = () => {
    if (drinkData && drinkData.length === 1) {
      const filteredKeys = Object.keys(currentRecipe);
      const filteredMeasurements = [];
      const filteredIngredients = [];

      filteredKeys.forEach((key) => {
        if (key.includes('strIngredient')
        && (currentRecipe[`${key}`] !== ''
        && currentRecipe[`${key}`] !== null)) {
          filteredIngredients.push(currentRecipe[`${key}`]);
        }
      });
      filteredKeys.forEach((key) => {
        if (key.includes('strMeasure')
        && (currentRecipe[`${key}`] !== ' ' || currentRecipe[`${key}`] !== null)) {
          filteredMeasurements.push(currentRecipe[`${key}`]);
        }
      });

      setIngredients(filteredIngredients);
      setMeasures(filteredMeasurements);
    }
  };

  useEffect(() => {
    handleIngredients();
  }, [drinkData]);

  const addFavorite = () => {
    const currentFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteData = {
      id: currentRecipe.idDrink,
      type: 'bebida',
      area: '',
      category: currentRecipe.strCategory,
      alcoholicOrNot: currentRecipe.strAlcoholic,
      name: currentRecipe.strDrink,
      image: currentRecipe.strDrinkThumb,
    };
    if (currentFavorite !== null) {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([...currentFavorite, favoriteData]));
    } else {
      localStorage
        .setItem('favoriteRecipes', JSON.stringify([favoriteData]));
    }

    setIsFavorite(true);
  };

  const removeFavorite = () => {
    const currentFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavorite = currentFavorite.filter((item) => item.id !== id);

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));

    setIsFavorite(false);
  };

  const handleFavoriteRender = () => {
    if (isFavorite) {
      return (
        <button type="button" onClick={ () => removeFavorite() }>
          <img
            alt="Set this recipe as favorite"
            data-testid="favorite-btn"
            src={ blackHeartIcon }
          />
        </button>
      );
    }

    return (
      <button type="button" onClick={ () => addFavorite() }>
        <img
          alt="Set this recipe as favorite"
          data-testid="favorite-btn"
          src={ whiteHeartIcon }
        />
      </button>
    );
  };

  const toProgress = () => {
    const currentStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (currentStorage !== null && Object.keys(currentStorage).includes('cocktails')) {
      const newStorage = {
        ...currentStorage,
        cocktails: {
          ...currentStorage.cocktails,
          [id]: [],
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

  const CopiedLinkMessage = (
    <div className="copy-message-hidden">
      <span>
        Link copiado!
      </span>
    </div>
  );

  const shareClick = () => {
    const timeToShow = 1500;
    copy(`http://localhost:3000/bebidas/${id}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), timeToShow);
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
              <button type="button" onClick={ shareClick }>
                <img
                  alt="share data"
                  data-testid="share-btn"
                  src={ shareIcon }
                />
              </button>
              { showMessage && CopiedLinkMessage }
              { handleFavoriteRender() }
            </div>
          </div>

          <div className="detail-ingredients-container">
            <div className="datail-ingredients-title">
              <h3>Ingredients</h3>
            </div>

            <div className="datail-ingredients">
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
            <div className="datail-instructions-title">
              <h3>Instructions</h3>
            </div>

            <div className="datail-instructions">
              <p data-testid="instructions">
                { currentRecipe.strInstructions }
              </p>
            </div>

          </div>

          <div className="detail-recomendation-container">
            {handleRecomendations()}
          </div>

          <div>
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
