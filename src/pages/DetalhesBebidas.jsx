import React, { useEffect, useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import ShareIcon from '../images/shareIcon.svg';
import * as api from '../services/Api';
import Context from '../context/Context';
import './styles/pages.css';

export default function DetalhesBebidas({ history }) {
  const { id } = useParams();
  const {
    setSelectedDrink,
    selectedDrink,
    loading,
    setLoading,
  } = useContext(Context);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recomendedMeals, setRecomendedMeals] = useState([]);
  const [favoriteImg, setFavoriteImg] = useState(whiteHeart);
  const [sharedURL, setSharedURL] = useState(false);

  const setarBebida = async () => {
    setLoading(true);
    const drink = await api.fetchDrinkbyId(id);
    const meals = await api.fetchFoodByName('');
    setSelectedDrink(drink[0]);
    setRecomendedMeals(meals);
    setLoading(false);
  };

  const favoriteRecipe = {
    id: selectedDrink.idDrink,
    type: 'bebida',
    area: '',
    category: selectedDrink.strCategory,
    alcoholicOrNot: selectedDrink.strAlcoholic,
    name: selectedDrink.strDrink,
    image: selectedDrink.strDrinkThumb,
  };

  const getLocalStorage = () => {
    if (localStorage.favoriteRecipes) {
      const favLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      favLocalStorage.forEach((fav) => {
        if (fav.id === id) {
          setFavoriteImg(blackHeart);
        }
      });
    }
  };

  useEffect(() => {
    setarBebida();
    getLocalStorage();
  }, []);

  const collectIngredients = () => {
    const ingredients = [];
    const maxLenght = 20;
    const noLength = 0;
    for (let index = 1; index <= maxLenght; index += 1) {
      if (selectedDrink.length !== noLength && selectedDrink[`strIngredient${index}`]) {
        ingredients.push(`${selectedDrink[`strIngredient${index}`]} 
        ${selectedDrink[`strMeasure${index}`]}`);
      }
      setArrayIngredients(ingredients);
    }
  };

  useEffect(() => {
    collectIngredients();
  }, [selectedDrink]);

  const clickFavorite = () => {
    const favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favRecipes) {
      if (favoriteImg === whiteHeart) {
        localStorage.setItem('favoriteRecipes',
          JSON.stringify([...favRecipes, favoriteRecipe]));
        return setFavoriteImg(blackHeart);
      }
      const takeOutDrink = favRecipes.filter(
        (drink) => drink.name !== favoriteRecipe.name,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(takeOutDrink));
      return setFavoriteImg(whiteHeart);
    }
    if (favoriteImg === whiteHeart) {
      localStorage.setItem('favoriteRecipes',
        JSON.stringify([favoriteRecipe]));
      return setFavoriteImg(blackHeart);
    }
  };

  const clickDetails = (identidade) => {
    history.push(`/bebidas/${identidade}/in-progress`);
  };

  const urlToClipboard = () => {
    const url = window.location.href;

    copy(url);
    setSharedURL(true);
  };

  const seis = 6;

  return (
    <div>
      <h1>Detalhes Bebidas</h1>
      {loading ? <p>Loading...</p>
        : (
          <div>
            <img
              data-testid="recipe-photo"
              src={ selectedDrink.strDrinkThumb }
              height="200px"
              alt="foto-recipe"
            />
            <h2 data-testid="recipe-title">{selectedDrink.strDrink}</h2>

            <div>
              <button
                type="button"
                alt="compartilhar"
                data-testid="share-btn"
                onClick={ urlToClipboard }
              >
                <img src={ ShareIcon } alt="compartilhar" />
              </button>
              {sharedURL ? <p>Link copiado!</p> : null}
            </div>

            <button
              type="button"
              src={ favoriteImg }
              alt="favoritar"
              data-testid="favorite-btn"
              onClick={ clickFavorite }
            >
              <img src={ favoriteImg } alt="favoritar" />
            </button>
            <h3 data-testid="recipe-category">
              {selectedDrink.strCategory}
              ,
              {selectedDrink.strAlcoholic}
            </h3>
            <h3>Ingredients </h3>
            { arrayIngredients.map((ingredient, index) => (
              <p
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ingredient }
              </p>
            )) }
            <p data-testid="instructions">
              Instructions
              { selectedDrink.strInstructions }
            </p>
            <p data-testid="video"><a href={ selectedDrink.strVideo }>Vídeo</a></p>
            <h3>Recomendadas</h3>
            { recomendedMeals.filter((meal, index) => meal && index < seis)
              .map((meal, index) => (
                <div key={ index } data-testid={ `${index}-recomendation-card` }>
                  <p data-testid={ `${index}-recomendation-title` }>{meal.strMeal}</p>
                  <img src={ meal.strMealThumb } alt={ index } width="200px" />
                </div>))}
            <button
              type="button"
              className="iniciar-receita"
              data-testid="start-recipe-btn"
              onClick={ () => clickDetails(selectedDrink.idDrink) }
            >
              Iniciar Receita
            </button>
          </div>
        )}
    </div>
  );
}

DetalhesBebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
