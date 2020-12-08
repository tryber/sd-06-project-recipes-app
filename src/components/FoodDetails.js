import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import DrinkRecomendationCard from './DrinkRecomendationCard';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
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
  const [showMessage, setShowMessage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    getFoodAPI('id-filter', `${id}`);
    getDrinkAPI('name-filter', '');
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

  const handleIngredients = () => {
    if (foodData && foodData.length === 1) {
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

  const addFavorite = () => {
    const currentFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteData = {
      id: currentRecipe.idMeal,
      type: 'comida',
      area: currentRecipe.strArea,
      category: currentRecipe.strCategory,
      alcoholicOrNot: '',
      name: currentRecipe.strMeal,
      image: currentRecipe.strMealThumb,
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
    if (currentStorage !== null && Object.keys(currentStorage).includes('meals')) {
      const newStorage = {
        ...currentStorage,
        meals: {
          ...currentStorage.meals,
          [id]: [],
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

  const CopiedLinkMessage = (
    <div className="copy-message-hidden">
      <span>
        Link copiado!
      </span>
    </div>
  );

  const shareClick = () => {
    const timeToShow = 1500;
    copy(`http://localhost:3000/comidas/${id}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), timeToShow);
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

          <div className="video-container">
            {handleUrl(currentRecipe.strYoutube)}
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

export default FoodDetail;
