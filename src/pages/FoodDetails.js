import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestDetailsFood, requestDrinks } from '../services/requestsAPI';
import DrinkRecomendCard from '../components/DrinkRecomendCard';
import '../style/FoodAndDrinkDetails.css';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FoodDetails() {
  const url = document.URL;
  const actualId = url.split('/')[4];
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState('');
  const [apiResult, setApiResult] = useState([]);
  const [buttonText, setButtonText] = useState('Iniciar Receita');
  const [spanHidden, setSpanHidden] = useState(true);
  const [favoriteFood, setFavoriteFood] = useState(false);
  const zero = 0;
  const six = 6;

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsFood(actualId);
      const meal = resultsDetails.meals[0];
      setFoodDetails(meal);
      const keysMeal = Object.keys(meal);

      const filterMeal = keysMeal
        .filter((key) => key.toLowerCase().includes('ingredient'));

      const filterMeasure = keysMeal
        .filter((key) => key.toLowerCase().includes('measure'));

      const allIngredients = filterMeal
        .map((item, index) => ({
          ingredient: meal[item], measure: meal[filterMeasure[index]],
        })).filter((item) => item.ingredient !== '' && item.ingredient !== null);

      console.log(allIngredients);
      setIngredients(allIngredients);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await requestDrinks();
      setApiResult(response);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const meuLocal = localStorage.getItem('favoriteRecipes');
    console.log('local2', meuLocal);
    if (meuLocal !== null) {
      const meuLocalArray = JSON.parse(meuLocal);
      console.log(meuLocalArray);
      // const idAtual = actualId[4];
      const findId = meuLocalArray.find((element) => element.id === actualId);
      console.log(findId);
      if (findId !== undefined) {
        setFavoriteFood(true);
      }
    }
  }, []);

  useEffect(() => {
    const meuLocal = localStorage.getItem('inProgressRecipes');
    console.log(meuLocal);
    const meuLocalArray = JSON.parse(meuLocal);
    if (meuLocalArray !== null) {
      const { meals } = meuLocalArray;
      const mealsKeys = (Object.keys(meals));
      if (mealsKeys.find((element) => element === actualId)) {
        setButtonText('Continuar Receita');
      }
    }
  });

  function handleClick() {
    localStorage.setItem('hiddenButtonFood', true);
  }

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(false);
  }

  function handleFavoriteFood() {
    if (favoriteFood === false) {
      setFavoriteFood(true);
      const favoriteObj = [
        {
          id: foodDetails.idMeal,
          type: 'comida',
          area: foodDetails.strArea,
          category: foodDetails.strCategory,
          alcoholicOrNot: '',
          name: foodDetails.strMeal,
          image: foodDetails.strMealThumb,
        },
      ];
      if (localStorage.getItem('favoriteRecipes') === null) {
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteObj));
      } else {
        localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify([
            ...JSON.parse(localStorage.getItem('favoriteRecipes')),
            ...favoriteObj,
          ]),
        );
      }
    }
    if (favoriteFood === true) {
      setFavoriteFood(false);
      const arrayDoStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(arrayDoStorage);

      const novoArray = arrayDoStorage.filter((element) => element.id !== actualId);
      console.log(novoArray);

      localStorage.setItem('favoriteRecipes', JSON.stringify(novoArray));
    }
  }

  return (
    <div className="recipe-details-div">

      <img
        data-testid="recipe-photo"
        src={ foodDetails.strMealThumb }
        alt="Meal"
        className="recipe-details-img"
      />
      <div className="recipe-title-and-share-fav-buttons">
        <h3 data-testid="recipe-title" className="recipe-details-title">
          {foodDetails.strMeal}
        </h3>
        <div className="fav-and-shar-buttons">
          <button
            type="button"
            data-testid="share-btn"
            onClick={ () => copyToClipBoard(document.URL) }
            className="recipe-button"
          >
            <img src={ shareIcon } alt="Share" />
          </button>
          <button
            aria-label="favorite-button"
            type="button"
            data-testid="favorite-btn"
            onClick={ handleFavoriteFood }
            src={ favoriteFood ? blackHeartIcon : whiteHeartIcon }
            className="recipe-button"
          >
            <img alt="bla" src={ favoriteFood ? blackHeartIcon : whiteHeartIcon } />
          </button>

          <span hidden={ spanHidden }>Link copiado!</span>
        </div>
      </div>

      <h4 data-testid="recipe-category" className="recipe-category">
        {foodDetails.strCategory}
      </h4>
      <h3 className="ingredients-title">Ingredients</h3>
      <div id="ingredients-div" className="ingredients-div">
        {ingredients && ingredients.map((item, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${index + 1} ${item.ingredient} - ${item.measure}`}
          </p>
        ))}
      </div>
      <h3 className="intructions-title">Instructions</h3>
      <p data-testid="instructions" className="instructions">
        {foodDetails.strInstructions}
      </p>

      <video className="video" data-testid="video" width="750" height="500" controls>
        <source
          src={ foodDetails.strYoutube }
          type="video/mp4"
        />
        <track src="" kind="captions" />
      </video>

      <div className="carousel">
        { apiResult.drinks && apiResult.drinks.slice(zero, six).map((element, idx) => (
          <div className="carousel-item" key={ idx }>
            <DrinkRecomendCard element={ element } idx={ idx } key={ element.idMeal } />
          </div>
        )) }
      </div>

      <Link
        to={ `/comidas/${foodDetails.idMeal}/in-progress` }
      >
        <button
          type="button"
          className="start-btn"
          data-testid="start-recipe-btn"
          // hidden={ localStorage.getItem('hiddenButtonFood') }
          onClick={ handleClick }
        >
          { buttonText }
        </button>
      </Link>
      <br />
      <br />
      <br />
    </div>
  );
}

export default FoodDetails;
