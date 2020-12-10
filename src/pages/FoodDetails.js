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
        }));

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
            favoriteObj,
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
    <div>

      <img
        data-testid="recipe-photo"
        width="100px"
        src={ foodDetails.strMealThumb }
        alt="Meal"
      />

      <h3 data-testid="recipe-title">
        {foodDetails.strMeal}
      </h3>

      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => copyToClipBoard(document.URL) }
      >
        <img src={ shareIcon } alt="Share" />
      </button>

      <span hidden={ spanHidden }>Link copiado!</span>

      <button
        aria-label="favorite-button"
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteFood }
        src={ favoriteFood ? blackHeartIcon : whiteHeartIcon }
      >
        <img alt="bla" src={ favoriteFood ? blackHeartIcon : whiteHeartIcon } />
      </button>

      <h4 data-testid="recipe-category">
        {foodDetails.strCategory}
      </h4>

      <div id="ingredients-div">
        {ingredients && ingredients.map((item, index) => (
          <p
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${index + 1} ${item.ingredient} - ${item.measure}`}
          </p>
        ))}
      </div>

      <p data-testid="instructions">
        {foodDetails.strInstructions}
      </p>

      <video data-testid="video" width="750" height="500" controls>
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
          hidden={ localStorage.getItem('hiddenButtonFood') }
          onClick={ handleClick }
        >
          Iniciar Receita
        </button>
      </Link>
      <br />
      <br />
      <br />
    </div>
  );
}

export default FoodDetails;
