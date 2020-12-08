import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

import { detailsFoodById } from '../services/aPI';
import Instructions from '../components/Instructions';
import ContextAPI from '../Context/ContextAPI';
import BasicInfo from '../components/BasicInfo';
import IngredientsCheckbox from '../components/IngredientsCheckbox';
import './ProcessoComida.css';

const ReceitaProcessoComida = () => {
  const [foodDetails, setFoodDetails] = useState();
  const [isRecipeDone, setIsRecipeDone] = useState(false);

  const idFood = useParams().id;

  const { detailsInfo, setDetailsInfo, isRecipeFinished } = useContext(ContextAPI);

  const getFoodDetails = async () => {
    const food = await detailsFoodById(idFood);

    setFoodDetails({
      ...foodDetails,
      food: food.meals[0],
    });
    setDetailsInfo({ ...detailsInfo, foods: food.meals[0] });
  };

  const loadDoneRecipesFromStorage = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const doneRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isCurrentRecipeDone = doneRecipes.some((key) => key.id === idFood);

    if (isCurrentRecipeDone) setIsRecipeDone(true);
    else setIsRecipeDone(false);
  };

  useEffect(() => {
    getFoodDetails();
    loadDoneRecipesFromStorage();
  }, []);

  const removeFoodFromProgress = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressRecipes !== null) {
      const progressKeys = Object.keys(progressRecipes.meals);
      let mealsObject = {};
      progressKeys.forEach((key) => {
        if (key !== idFood) {
          mealsObject = { ...mealsObject, [key]: progressKeys[key] };
        }
      });
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...progressRecipes,
        meals: mealsObject,
      }));
    }
  };

  const setDoneRecipes = () => {
    if (foodDetails) {
      removeFoodFromProgress();
      setIsRecipeDone(true);

      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, {
        id: foodDetails.food.idMeal,
        type: 'comida',
        area: foodDetails.food.strArea,
        category: foodDetails.food.strCategory,
        alcoholicOrNot: '',
        name: foodDetails.food.strMeal,
        photoFood: foodDetails.food.strMealThumb,
        doneDate: '',
        tags: foodDetails.food.strTags
          ? foodDetails.food.strTags
          : [],
      }]));
    } else return '';
  };

  const showDoneRecipeBtn = () => (
    <Link to="/receitas-feitas">
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ setDoneRecipes }
        disabled={ !(isRecipeFinished) }
      >
        Finalizar Receita
      </button>
    </Link>
  );

  return (

    <div>
      {!foodDetails
        ? <div className="loading">Loading...</div>
        : (
          <div className="body-progress">
            <BasicInfo />
            <IngredientsCheckbox />
            <Instructions />
            <div className="container-button">
              {!isRecipeDone && showDoneRecipeBtn()}
            </div>
          </div>
        )}
    </div>
  );
};

export default ReceitaProcessoComida;
