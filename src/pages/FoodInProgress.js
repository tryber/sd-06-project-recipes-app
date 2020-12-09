import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { fetchDetail } from '../helpers/Helper';
import saveInStorage from '../helpers/saveInStorage';
import saveFavorite from '../helpers/saveFavorite';

import '../css/scroller.css';
import '../css/itemDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

export default function FoodInProgress(props) {
  const [recipe, setRecipe] = useState('');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [copy, setCopy] = useState('');
  const [fav, setFav] = useState(whiteHeart);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    async function fetchData() {
      const currRecipe = await fetchDetail('comidas', id);
      setRecipe(currRecipe);

      const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const inProgress = (storage) && storage.meals[id];

      if (inProgress) {
        setCheckedIngredients(inProgress);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const tarefa = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (tarefa.some((item) => item.id === id)) {
        setFav(blackHeart);
      }
    }
  }, []);

  useEffect(() => {
    const empty = 0;
    if (checkedIngredients.length > empty) {
      checkedIngredients.forEach((ingredient) => {
        const checkbox = document.getElementById(ingredient);
        if (checkbox) {
          checkbox.checked = true;
          checkbox.setAttribute('checked', '');
        }
      });
      const inputLength = document.querySelectorAll('input[type=checkbox]').length;
      if (inputLength === checkedIngredients.length) {
        setDisabled(false);
      } else if (inputLength > checkedIngredients.length) {
        setDisabled(true);
      }
    }
  }, [checkedIngredients]);

  function handleCopy() {
    const link = `${window.location.origin}/comidas/${id}`;
    navigator.clipboard.writeText(link);
    setCopy('Link copiado!');
  }

  function handleFav(item) {
    const favObj = {
      id: item.idMeal,
      type: 'comida',
      area: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: '',
      name: item.strMeal,
      image: item.strMealThumb,
    };
    if (fav === blackHeart) {
      setFav(whiteHeart);
      saveFavorite(id, favObj, 'remove');
    }
    if (fav === whiteHeart) {
      setFav(blackHeart);
      saveFavorite(id, favObj, 'add');
    }
  }

  useEffect(() => {
    if (recipe.meals) {
      const currRecipe = { ...recipe.meals[0] };
      const array = [];
      const maxLength = 20;
      for (let counter = 1; counter <= maxLength; counter += 1) {
        array.push(counter);
      }
      const recipeArray = array.map((number) => (
        (currRecipe[`strIngredient${number}`] !== ''
          && currRecipe[`strIngredient${number}`] !== null)
          ? [currRecipe[`strIngredient${number}`], currRecipe[`strMeasure${number}`]]
          : ''
      ));
      setRecipeDetails(recipeArray);
    }
  }, [recipe]);

  function strikeIngredientText(target) {
    if (target.checked) {
      if (!checkedIngredients.includes(target.id)) {
        setCheckedIngredients([...checkedIngredients, target.id]);
      }
      saveInStorage(id, target.id, 'meals', 'add');
    } else if (!target.checked) {
      if (checkedIngredients.includes(target.id)) {
        setCheckedIngredients(checkedIngredients.filter((item) => item !== target.id));
        target.removeAttribute('checked');
      }
      saveInStorage(id, target.id, 'meals', 'remove');
    }
  }

  function renderIngredients() {
    const empty = 0;
    if (recipeDetails.length > empty) {
      return (
        <div>
          <p className="ingredients-title">Ingredients</p>
          <div
            className="ingredients-list"
          >
            { recipeDetails
              .filter((ingredient) => ingredient !== '' && ingredient !== null)
              .map((ingredient, index) => (
                <label
                  htmlFor={ `${ingredient[0]}-{${index}` }
                  key={ ingredient[0] }
                  data-testid={ `${index}-ingredient-step` }
                  className={ checkedIngredients.includes(ingredient[0])
                    ? 'strike-text' : '' }
                >
                  <input
                    type="checkbox"
                    id={ `${ingredient[0]}-{${index}` }
                    onClick={ ({ target }) => strikeIngredientText(target) }
                  />
                  { (ingredient[1] === null)
                    ? ingredient[0]
                    : `${ingredient[0]}: ${(ingredient[1]) && ingredient[1]}` }
                </label>
              )) }
          </div>
        </div>
      );
    }
  }

  function endRecipe(item) {
    const now = new Date();
    const newRecipe = {
      id: item.idMeal,
      type: 'comida',
      area: item.strArea,
      category: item.strCategory,
      alcoholicOrNot: '',
      name: item.strMeal,
      image: item.strMealThumb,
      doneDate: `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`,
      tags: (item.strTags) && item.strTags.split(','),
    };
    const currStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const newStorage = (currStorage)
      ? [...currStorage, newRecipe]
      : [newRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newStorage));
    props.history.push('/receitas-feitas');
  }

  if (recipe.meals) {
    const item = recipe.meals[0];
    console.log(item);
    return (
      <div className="content-details">
        <div key={ item }>
          <img
            data-testid="recipe-photo"
            alt="Foto da receita"
            src={ item.strMealThumb }
            className="item-img"
          />
          <div className="buttons-container">
            <button
              className="btn-details"
              type="button"
              data-testid="share-btn"
              value="Share"
              onClick={ () => handleCopy() }
            >
              <img alt="Share" src={ shareIcon } />
            </button>
            <span>{copy}</span>
            <button
              className="btn-details"
              type="button"
              data-testid="favorite-btn"
              src={ fav }
              onClick={ () => handleFav(item) }
            >
              <img alt="fav" src={ fav } />
            </button>
          </div>
          <p className="recipe-title" data-testid="recipe-title">{item.strMeal}</p>
          <p
            className="recipe-category"
            data-testid="recipe-category"
          >
            {item.strCategory}
          </p>
          <p className="instructions-title">Instructions</p>
          <p
            className="instructions"
            data-testid="instructions"
          >
            {item.strInstructions}
          </p>
          {renderIngredients()}
          <div className="button-start-container">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              className="btnStart"
              disabled={ disabled }
              onClick={ () => endRecipe(item) }
            >
              Finalizar receita
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>Loading ...</div>
  );
}

FoodInProgress.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};
