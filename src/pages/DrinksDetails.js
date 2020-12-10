import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { requestDetailsDrinks, requestFoods } from '../services/requestsAPI';
import FoodRecomendCard from '../components/FoodRecomendCard';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../style/FoodAndDrinkDetails.css';

function DrinkDetails() {
  const url = document.URL;
  const actualId = url.split('/')[4];
  const { drinkDetails, setDrinkDetails } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState('');
  const [apiResult, setApiResult] = useState([]);
  const [buttonText] = useState('Iniciar Receita');
  const [spanHidden, setSpanHidden] = useState(true);
  const [favoriteDrink, setFavoriteDrink] = useState(false);
  const zero = 0;
  const six = 6;

  useEffect(() => {
    async function fetchData() {
      const resultsDetails = await requestDetailsDrinks(actualId);
      const drink = resultsDetails.drinks[0];
      setDrinkDetails(drink);
      const keysDrink = Object.keys(drink);
      const filterDrink = keysDrink
        .filter((key) => key.toLowerCase().includes('ingredient'));
      const filterMeasure = keysDrink.filter((key) => key
        .toLowerCase().includes('measure'));
      const allIngredients = filterDrink
        .map((item, index) => ({
          ingredient: drink[item], measure: drink[filterMeasure[index]],
        }));
      setIngredients(allIngredients);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await requestFoods();
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
        setFavoriteDrink(true);
      }
    }
  }, []);

  function handleClick() {
    localStorage.setItem('hiddenButtonFood', true);
  }

  // function ttt() {
  //   if (localStorage.getItem('hiddenButtonDrink') === true) {
  //     setButtonText('Iniciar Receita');
  //   } setButtonText('Continuar Receita');
  // }

  function copyToClipBoard(text) {
    navigator.clipboard.writeText(text);
    setSpanHidden(false);
  }

  function handleFavoriteDrink() {
    if (favoriteDrink === false) {
      setFavoriteDrink(true);
      const favoriteObj = [
        {
          id: drinkDetails.idDrink,
          type: 'bebida',
          area: '',
          category: drinkDetails.strCategory,
          alcoholicOrNot: drinkDetails.strAlcoholic,
          name: drinkDetails.strDrink,
          image: drinkDetails.strDrinkThumb,
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
    if (favoriteDrink === true) {
      setFavoriteDrink(false);
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
        src={ drinkDetails.strDrinkThumb }
        alt="Drink"
      />

      <h3 data-testid="recipe-title">
        {
          drinkDetails.strDrink
        }
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
        onClick={ handleFavoriteDrink }
        src={ favoriteDrink ? blackHeartIcon : whiteHeartIcon }
      >
        <img alt="bla" src={ favoriteDrink ? blackHeartIcon : whiteHeartIcon } />
      </button>
      <h4 data-testid="recipe-category">
        {drinkDetails.strAlcoholic}
      </h4>

      <div id="ingredients-div">
        {ingredients && ingredients
          .map((item, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
            >
              {
                item.ingredient && item.measure
                  ? `${index + 1} ${item.ingredient} - ${item.measure}`
                  : null
              }
            </p>
          ))}
      </div>

      <p
        data-testid="instructions"
      >
        {drinkDetails.strInstructions}
      </p>

      <div className="carousel">
        { apiResult.meals && apiResult.meals.slice(zero, six).map((element, idx) => (
          <div className="carousel-item" key={ idx }>
            <FoodRecomendCard element={ element } idx={ idx } key={ element.idMeal } />
          </div>
        ))}
      </div>

      <Link
        to={ `/bebidas/${drinkDetails.idDrink}/in-progress` }
      >
        <button
          type="button"
          className="start-btn"
          data-testid="start-recipe-btn"
          hidden={ localStorage.getItem('hiddenButtonDrink') }
          onClick={ handleClick }
        >
          {buttonText}
        </button>
      </Link>

      <span hidden={ spanHidden }>Link copiado!</span>
    </div>
  );
}

export default DrinkDetails;
