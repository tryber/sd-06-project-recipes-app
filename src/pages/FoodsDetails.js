import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetail, fetchRecommendation } from '../helpers/Helper';
import RecipesContext from '../context/Context';

import '../css/scroller.css';
import '../css/itemDetails.css';
import shareIcon from '../images/shareIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import saveFavorite from '../helpers/saveFavorite';

export default function FoodsDetails(props) {
  const { setItems } = useContext(RecipesContext);
  const [recipe, setRecipe] = useState('');
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [concluded, setConcluded] = useState(false);
  const [recommendation, setRecommendation] = useState([]);
  const [btnStartValue, setBtnStartValue] = useState('Iniciar Receita');
  const [copy, setCopy] = useState('');
  const [fav, setFav] = useState(whiteHeart);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    async function fetchData() {
      const currRecipe = await fetchDetail('comidas', id);
      setRecipe(currRecipe);
      const results = await fetchRecommendation('comidas');
      setRecommendation(results);
    }
    fetchData();

    return () => setItems();
  }, []);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgress = (storage) && storage.meals[id];
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const recipeDone = (doneRecipes) && doneRecipes.some((item) => item.id === id);

    if (inProgress) {
      setBtnStartValue('Continuar Receita');
    }

    if (recipeDone) {
      setConcluded(true);
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
                  key={ ingredient[0] }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${ingredient[0]}: ${ingredient[1]}`}
                </p>
              )) }
          </div>
        </div>
      );
    }
  }

  if (recipe.meals) {
    const item = recipe.meals[0];
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

          <iframe
            src={ `https://youtube.com/embed/${item.strYoutube.substring(item.strYoutube.indexOf('=') + 1)}?autoplay=0` }
            frameBorder="0"
            allow="encrypted-media"
            title="video"
            width="360"
            data-testid="video"
          />

          {
            (!concluded) ? (
              <Link
                className="button-start-container"
                to={ `/comidas/${id}/in-progress` }
              >
                <button
                  type="button"
                  data-testid="start-recipe-btn"
                  className="btnStart"
                >
                  <div className="btn-title">
                    {btnStartValue}
                  </div>

                </button>
              </Link>
            ) : null
          }
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
                <p data-testid={ `${index}-recomendation-title` }>{rec.strDrink}</p>
                <img
                  alt="foto da receita"
                  className="item-img"
                  src={ rec.strDrinkThumb }
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

FoodsDetails.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
