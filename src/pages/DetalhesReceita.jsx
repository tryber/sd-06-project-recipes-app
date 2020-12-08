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
import { loadState } from '../services/localStorage';
import '../styles/CardFood.css';

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

  const testRecipeDone = () => {
    const doneRecipe = loadState('doneRecipes', []);
    const arrayDoneRecipe = doneRecipe.filter((element) => element.id === id);
    console.log(arrayDoneRecipe);
    if (arrayDoneRecipe.length !== zero) {
      document.getElementById('inprogress-btn').style.visibility = 'hidden';
    } else {
      document.getElementById('inprogress-btn').style.visibility = 'visible';
    }
  };

  useEffect(() => {
    requestApiFoodDetails(id)
      .then((response) => {
        setDetailsFood(response[0]);
        startRecipeFunc(response[0].idMeal);
        testRecipeDone();
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
    // const newSpan = document.createElement('span');
    // newSpan.innerHTML = 'Link copiado!';
    divBtns.innerHTML = 'Link copiado!';
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
    <div className="container-detalhes">
      <img
        className="detalhes-img"
        data-testid="recipe-photo"
        src={ detailsFood.strMealThumb }
        alt="food-thumb"
      />
      <div className="header-detalhes">
        <div>
          <span className="titulo" data-testid="recipe-title">{detailsFood.strMeal}</span>
          <br />
          <span
            data-testid="recipe-category"
            className="txt-category"
          >
            {detailsFood.strCategory}
          </span>
        </div>
        <div>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ copyBoard }
            className="btn-copy-link"
          >
            <img src={ buttonShare } alt="button-share" />
          </button>
          <FavoriteHeart id={ id } detailsFood={ detailsFood } />
          <br />
          <span id="btns" />
        </div>
      </div>
      <div className="container-conteudo">
        <p className="titulo-2">Ingredients</p>
        <div className="container-conteudo-text">
          {arrayIngredients.map((element, index) => (
            <p
              data-testid={ `${index}-ingredient-name-and-measure` }
              key={ index }
              className="item-list"
            >
              { element }
            </p>
          ))}
        </div>
        <p className="titulo-2">Instructions</p>
        <div className="container-conteudo-text">
          <p
            data-testid="instructions"
            className="instructions-text"
          >
            { detailsFood.strInstructions }
          </p>
        </div>
      </div>
      <iframe
        data-testid="video"
        title="video"
        width="100%"
        height="360"
        src={ `https://www.youtube.com/embed/${embed}` }
        allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
        fs="1"
      />
      <div className="carrossel">
        {recommendFood.map((drink, index) => (
          <div
            className="carrossel-iten"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <div className="card-food">
              <img src={ drink.strDrinkThumb } alt="drink-thumb" />
              <h3 data-testid={ `${index}-recomendation-title` }>{drink.strDrink}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="center-btn-footer">
        <Link to={ `/comidas/${id}/in-progress` }>
          <button
            id="inprogress-btn"
            type="button"
            data-testid="start-recipe-btn"
            className="btn-footer"
          >
            { startRecipe }
          </button>
        </Link>
      </div>
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
