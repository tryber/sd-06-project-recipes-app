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
      <h1 className="bg-warning pl-3 pb-1">Detalhes Bebidas</h1>
      {loading ? <p>Loading...</p>
        : (
          <div className="d-flex flex-column">
            <img
              className="rounded align-self-center"
              data-testid="recipe-photo"
              src={ selectedDrink.strDrinkThumb }
              height="200px"
              alt="foto-recipe"
            />
            <h2 className="text-warning align-self-center font-weight-bold" data-testid="recipe-title">{selectedDrink.strDrink}</h2>

            <div className="d-flex">
              <button
                className="btn btn-warning"
                type="button"
                alt="compartilhar"
                data-testid="share-btn"
                onClick={ urlToClipboard }
              >
                <img src={ ShareIcon } alt="compartilhar" />
              </button>
              <button
                className="btn btn-warning"
                type="button"
                src={ favoriteImg }
                alt="favoritar"
                data-testid="favorite-btn"
                onClick={ clickFavorite }
              >
                <img src={ favoriteImg } alt="favoritar" />
              </button>
            </div>
            {sharedURL ? <p className="text-warning" >Link copiado!</p> : null}
            <h3 className="text-warning mt-2 font-weight-bold" data-testid="recipe-category">
              {selectedDrink.strCategory}
              ,
              {selectedDrink.strAlcoholic}
            </h3>
            <h3 className="text-warning align-self-center font-weight-bold">Ingredients </h3>
            <div className="bg-warning ml-3 mr-3 rounded">
              { arrayIngredients.map((ingredient, index) => (
                <p
                  className="font-weight-bold"
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { ingredient }
                </p>
              )) }
            </div>
            <h3 className="text-warning align-self-center font-weight-bold mt-2">Instructions</h3>
            <div className="bg-warning ml-3 mr-3 rounded">
              <p data-testid="instructions">
                { selectedDrink.strInstructions }
              </p>
            </div>
            <p className="mt-3 btn btn-danger ml-3 mr-3" data-testid="video"><a href={ selectedDrink.strVideo }>Vídeo</a></p>
            <h3>Recomendadas</h3>
            { recomendedMeals.filter((meal, index) => meal && index < seis)
              .map((meal, index) => (
                <div className="align-self-center border-warning border mb-1 rounded" key={ index } data-testid={ `${index}-recomendation-card` }>
                  <p className="text-warning" data-testid={ `${index}-recomendation-title` }>{meal.strMeal}</p>
                  <img src={ meal.strMealThumb } alt={ index } width="100px" />
                </div>))}
            <button
              type="button"
              className="btn btn-warning iniciar-receita border border-dark"
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
