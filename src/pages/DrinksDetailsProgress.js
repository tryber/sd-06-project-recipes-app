import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { requestDetailsDrinks } from '../services/requestsAPI';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksDetailsProgress() {
  const url = document.URL;
  const actualId = url.split('/')[4];
  const { drinkDetails, setDrinkDetails } = useContext(RecipesContext);
  const [ingredients, setIngredients] = useState('');
  const [spanHidden, setSpanHidden] = useState(true);
  const [favoriteDrink, setFavoriteDrink] = useState(false);
  const [checkedIngredients] = useState([]);
  const [stateButton, setStateButton] = useState(true);

  function verifyLocalStorage() {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const recipesInProgress = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
  }

  function enableButton() {
    setStateButton(true);
    const markedCheckboxes = document.querySelectorAll('input:checked');
    const checkboxes = document.getElementsByClassName('check');
    console.log('check1', markedCheckboxes.length);
    console.log('check2', checkboxes.length);
    if (checkboxes.length === markedCheckboxes.length) {
      setStateButton(false);
    }
  }

  function handleProgress(e) {
    checkedIngredients.push((e.target.value));
    const localStorageRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    localStorageRecipes.cocktails[drinkDetails.idDrink] = checkedIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(localStorageRecipes));
    localStorage.setItem(e.target.value, e.target.checked);
    enableButton();
  }

  useEffect(() => {
    verifyLocalStorage();
  }, []);

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
        })).filter((item) => item.ingredient !== '' && item.ingredient !== null);
      console.log(allIngredients);
      setIngredients(allIngredients);
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

  function copyToClipBoard(text) {
    const textSplice = text.split('/in-progress');
    const finalText = textSplice.join('');
    navigator.clipboard.writeText(finalText);
    setSpanHidden(false);
  }

  function handleFavoriteDrink() {
    setFavoriteDrink(!favoriteDrink);
    if (favoriteDrink === false) {
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
      if (favoriteDrink === true) {
        setFavoriteDrink(false);
        const arrayDoStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
        console.log(arrayDoStorage);
        const novoArray = arrayDoStorage.filter((element) => element.id !== actualId);
        console.log(novoArray);
        localStorage.setItem('favoriteRecipes', JSON.stringify(novoArray));
      }
    }
  }

  function handleClickEnd() {
    const time = new Date();
    const object = [
      {
        id: drinkDetails.idDrink,
        type: 'bebida',
        area: '',
        category: drinkDetails.strCategory,
        alcoholicOrNot: drinkDetails.strAlcoholic,
        name: drinkDetails.strDrink,
        image: drinkDetails.strDrinkThumb,
        doneDate: time,
        tags: drinkDetails.strTags,
      },
    ];

    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify(object));
    } else {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('doneRecipes')),
          ...object,
        ]),
      );
    }
  }

  return (
    <div className="recipe-details-div">

      <img
        data-testid="recipe-photo"
        width="100px"
        src={ drinkDetails.strDrinkThumb }
        alt="Drink"
        className="recipe-details-img"
      />

      <div className="recipe-title-and-share-fav-buttons">
        <h3 data-testid="recipe-title" className="recipe-details-title">
          {
            drinkDetails.strDrink
          }
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
            // className={ whiteHeartIcon }
            onClick={ handleFavoriteDrink }
            src={ favoriteDrink ? blackHeartIcon : whiteHeartIcon }
            className="recipe-button"
          >
            <img alt="bla" src={ favoriteDrink ? blackHeartIcon : whiteHeartIcon } />
          </button>
          <span hidden={ spanHidden }>Link copiado!</span>
        </div>

      </div>

      <h4 data-testid="recipe-category" className="recipe-category">
        {
          drinkDetails.strCategory
        }
      </h4>

      <h4 className="recipe-stralcoholic">
        {
          drinkDetails.strAlcoholic
        }
      </h4>
      <h3 className="ingredients-title">Ingredients</h3>
      <div id="ingredients-div" className="ingredients-div">
        {ingredients && ingredients
          .map((item, index) => (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <label htmlFor={ item.ingredient }>
                <input
                  type="checkbox"
                  className="check"
                  id={ item.ingredient }
                  key={ item.ingredient }
                  name={ item.ingredient }
                  value={ item.ingredient }
                  checked={ JSON.parse(localStorage.getItem(item.ingredient)) }
                  onChange={ (e) => handleProgress(e) }
                />
                {
                  `${index + 1} - ${item.ingredient}: ${item.measure}`
                }
              </label>
            </div>
          ))}
      </div>
      <h3 className="intructions-title">Instructions</h3>
      <p
        data-testid="instructions"
        className="instructions"
      >
        {drinkDetails.strInstructions}
      </p>

      <span hidden={ spanHidden }>Link copiado!</span>
      <Link
        to={
          { pathname: '/receitas-feitas', state: { drinkDoneCard: drinkDetails } }
        }
      >
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ stateButton }
          onClick={ handleClickEnd }
          className="start-btn"
        >
          Finalizar receita
        </button>
      </Link>
    </div>
  );
}

export default DrinksDetailsProgress;
