import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  requestApiFoodDetails,
} from '../services/requestFood';
import {
  recommendDrinksList,
} from '../services/requestDrink';
import '../styles/Detalhes.css';
import buttonShare from '../styles/images/shareIcon.svg';
import FavoriteHeart from '../components/FavoriteHeart';
import { loadState, saveState } from '../services/localStorage';
import '../styles/imgBig.css';

function DetalhesReceita({ match: { params: { id } } }) {
  const zero = 0;
  const vinte = 20;
  const seis = 6;
  const [detailsFood, setDetailsFood] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [embed, setEmbed] = useState('');
  const [recommendFood, setRecommendFood] = useState([]);
  const [startRecipe, setStartRecipe] = useState('Iniciar Receita');

  const startRecipeFunc = (compare) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const loadStorage = loadState('inProgressRecipes', '');
      if (loadStorage.meals) {
        if (loadStorage.meals[compare] !== undefined) {
          setStartRecipe('Continuar Receita');
        }
      }
    }
  };

  const clickStartRecipeFunc = () => {
    const loadStorage = loadState('inProgressRecipes', '');
    if (startRecipe === 'Iniciar Receita') {
      saveState('inProgressRecipes', {
        ...loadStorage,
        meals:
          { ...loadStorage.meals, [detailsFood.idMeal]: [...arrayIngredients] },
      });
    }
  };

  useEffect(() => {
    requestApiFoodDetails(id)
      .then((response) => {
        setDetailsFood(response[0]);
        startRecipeFunc(response[0].idMeal);
      });
  }, []);

  const recommendFoodFunction = async () => {
    if (detailsFood.length !== zero) {
      const response = await recommendDrinksList();
      setRecommendFood(response.drinks.slice(zero, seis));
    }
  };

  const embedVideo = () => {
    const youtubeVideo = detailsFood.strYoutube;
    if (youtubeVideo !== undefined) {
      const newYoutube = youtubeVideo.split('=');
      setEmbed(newYoutube[newYoutube.length - 1]);
    }
  };

  const ingredientsFunc = () => {
    if (detailsFood.length !== zero) {
      const array = [];
      for (let i = 1; i <= vinte; i += 1) {
        const detIngredient = `${detailsFood[`strIngredient${i}`]}`;
        const detMeasure = `${detailsFood[`strMeasure${i}`]}`;
        const ingredient = `${detIngredient} ${detMeasure}`;
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== '');
      setArrayIngredients(arrayReturn);
    }
  };

  // refatorar em componente no futuro
  const copyBoard = () => {
    const url = `http://localhost:3000/comidas/${id}`;
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    const divBtns = document.getElementById('btns');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = 'Link copiado!';
    divBtns.appendChild(newSpan);
  };

  useEffect(() => {
    ingredientsFunc();
    embedVideo();
    recommendFoodFunction();
  }, [detailsFood]);

  if (detailsFood.length === zero) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={ detailsFood.strMealThumb } alt="food-thumb" />
      <h2 data-testid="recipe-title">{detailsFood.strMeal}</h2>
      <h3 data-testid="recipe-category">{detailsFood.strCategory}</h3>
      <h4 data-testid="instructions">{detailsFood.strInstructions}</h4>
      <div id="btns">
        <button type="button" data-testid="share-btn" onClick={ copyBoard }>
          <img src={ buttonShare } alt="button-share" />
        </button>
        <FavoriteHeart id={ id } detailsFood={ detailsFood } />
      </div>
      {arrayIngredients.map((element, index) => (
        <h5
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          { element }
        </h5>
      ))}
      <iframe
        data-testid="video"
        title="video"
        width="1042"
        height="586"
        src={ `https://www.youtube.com/embed/${embed}` }
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
      />
      <div className="carrossel">
        {recommendFood.map((drink, index) => (
          <div
            className="carrossel-iten"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ drink.strDrinkThumb } alt="drink-thumb" />
            <h3 data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</h3>
          </div>
        ))}
      </div>
      <Link to={ `/comidas/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="btn-footer"
          onClick={ clickStartRecipeFunc }
        >
          { startRecipe }
        </button>
      </Link>
    </div>
  );
}

DetalhesReceita.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetalhesReceita;
