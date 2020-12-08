import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { detailsFoodById } from '../services/aPI';
import ContextAPI from '../Context/ContextAPI';
import Instructions from '../components/Instructions';
import Ingredients from '../components/Ingredients';
import BasicInfo from '../components/BasicInfo';
import Recomendations from '../components/Recomendations';
import './DetalhesComida.css';

const DetalhesComida = () => {
  const [foodsInProgress, setFoodsInProgress] = useState({ meals: {} });
  const [isRecipeDone, setIsRecipeDone] = useState(false);

  const currentFoodID = useParams().id;

  const { detailsInfo, setDetailsInfo } = useContext(ContextAPI);

  const handleIdDetails = async () => {
    const food = await detailsFoodById(currentFoodID);

    setDetailsInfo({ ...detailsInfo, foods: food.meals[0] });
  };

  const loadRecipesInProgressFromLocalStorage = () => {
    if (localStorage.getItem('inProgressRecipes') === null) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    }

    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setFoodsInProgress({ meals: progressRecipes.meals });
  };

  const loadDoneRecipesFromStorage = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const doneRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isCurrentRecipeDone = doneRecipes.some((key) => key.id === currentFoodID);

    if (isCurrentRecipeDone) setIsRecipeDone(true);
    else setIsRecipeDone(false);
  };

  useEffect(() => {
    handleIdDetails();
    loadRecipesInProgressFromLocalStorage();
    loadDoneRecipesFromStorage();
  }, []);

  const getIngredientsOrMeasure = (param) => {
    const dataObject = detailsInfo.foods;

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== '' && dataObject[key] !== ' ' && dataObject[key] !== null);

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const progressButton = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const mealProgressID = detailsInfo.foods.idMeal;
    const inProgressRecipes = {
      ...progressRecipes,
      meals: {
        ...progressRecipes.meals,
        [mealProgressID]: getIngredientsOrMeasure('strIngredient'),
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  };

  const getProgressButton = () => (
    <div className="container-button">
      <Link
        className="link-button"
        to={ `/comidas/${detailsInfo.foods.idMeal}/in-progress` }
      >
        <button
          type="button"
          data-testid="start-recipe-btn"
          onClick={ progressButton }
        >

          {foodsInProgress.meals[detailsInfo.foods.idMeal]
            ? 'Continuar Receita' : 'Iniciar Receita'}
        </button>
      </Link>
    </div>
  );

  const getVideo = () => (
    <div>
      <div className="container-span-video">
        <span>Video</span>
      </div>
      <div className="container-video">
        <a
          data-testid="video"
          href={ detailsInfo.foods.strYoutube }
        >
          <img
            src={ detailsInfo.foods.strMealThumb }
            alt={ detailsInfo.foods.strMeal }
          />
        </a>
      </div>
    </div>
  );

  return (
    <div className="body-details">
      {detailsInfo ? (
        <div className="container-main">
          <BasicInfo />
          <Ingredients />
          <Instructions />
          {getVideo()}
          <Recomendations />
          {!isRecipeDone && (getProgressButton())}
        </div>
      ) : <div>Loading...</div>}
    </div>
  );
};

export default DetalhesComida;
