import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchDetail, fetchRecommendation } from '../helpers/Helper';

import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import saveFavorite from '../helpers/saveFavorite';

import '../css/itemDetails.css';
import '../css/scroller.css';

export default function DrinkDetails(props) {
  const [recipe, setRecipe] = useState({});
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [btnStartValue, setBtnStartValue] = useState('Iniciar Receita');
  const [copy, setCopy] = useState('');
  const [fav, setFav] = useState(whiteHeart);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    async function fetchData() {
      const currRecipe = await fetchDetail('bebidas', id);
      setRecipe(currRecipe);
      const results = await fetchRecommendation('bebidas');
      setRecommendation(results);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    const inProgress = (storage) && storage.cocktails[id];

    if (localStorage.getItem('doneRecipes') !== null) {
      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (doneRecipes.some((item) => item.id === id)) {
        setDisabled(true);
      }
    }

    if (localStorage.getItem('doneRecipes') === null) {
      setDisabled(false);
    }
    if (inProgress) {
      setBtnStartValue('Continuar Receita');
    }
    if (localStorage.getItem('favoriteRecipes') !== null) {
      const tarefa = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (tarefa.some((item) => item.id === id)) {
        setFav(blackHeart);
      }
    }
  }, []);

  function handleCopy() {
    const link = window.location.href;
    navigator.clipboard.writeText(link);
    setCopy('Link copiado!');
  }

  function handleFav(item) {
    const favObj = {
      id: item.idDrink,
      type: 'bebida',
      area: '',
      category: item.strCategory,
      alcoholicOrNot: item.strAlcoholic,
      name: item.strDrink,
      image: item.strDrinkThumb,
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
    if (recipe.drinks) {
      const currRecipe = { ...recipe.drinks[0] };
      const array = [];
      const maxLength = 15;
      for (let counter = 1; counter <= maxLength; counter += 1) {
        array.push(counter);
      }
      const recipeArray = array.map((number) => (
        (currRecipe[`strIngredient${number}`] !== null
          && currRecipe[`strIngredient${number}`] !== '')
          ? [currRecipe[`strIngredient${number}`], currRecipe[`strMeasure${number}`]]
          : ''
      ));
      setRecipeDetails(recipeArray);
    }
  }, [recipe]);

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
                <p
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ ingredient[0] }
                >
                  { (ingredient[1] === null)
                    ? `${ingredient[0]}`
                    : `${ingredient[0]}: ${(ingredient[1]) && ingredient[1]}` }
                </p>
              )) }
          </div>
        </div>
      );
    }
  }

  if (recipe.drinks && recommendation) {
    const item = recipe.drinks[0];
    return (
      <div className="content-details">
        <div key={ item }>
          <img
            data-testid="recipe-photo"
            alt="Foto da receita"
            src={ item.strDrinkThumb }
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
          <p className="recipe-title" data-testid="recipe-title">{item.strDrink}</p>
          <p
            className="recipe-category"
            data-testid="recipe-category"
          >
            {item.strAlcoholic}
          </p>
          <p className="instructions-title">Instructions</p>
          <p
            className="instructions"
            data-testid="instructions"
          >
            {item.strInstructions}
          </p>
          {renderIngredients()}
          <p data-testid="video">{item.strYoutube}</p>
          <Link
            className="button-start-container"
            to={ `/bebidas/${id}/in-progress` }
          >
            { (!disabled)
              ? (
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  className="btnStart"
                  disabled={ disabled }
                >
                  <div>
                    {btnStartValue}
                  </div>
                </button>
              )
              : null }
          </Link>
        </div>
        <div className="testimonials">
          <p className="recommendation">Recommendation</p>
          <div className="scroller">
            {recommendation.map((rec, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
                className="item"
              >
                <p data-testid={ `${index}-recomendation-title` }>{rec.strMeal}</p>
                <img
                  alt="foto da receita"
                  className="item-img"
                  src={ rec.strMealThumb }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>Loading ...</div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
