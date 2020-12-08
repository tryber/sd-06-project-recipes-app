import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import { detailsDrinkById } from '../services/aPI';
import ContextAPI from '../Context/ContextAPI';
import Instructions from '../components/Instructions';
import BasicInfo from '../components/BasicInfo';
import IngredientsCheckbox from '../components/IngredientsCheckbox';
import './ProcessoComida.css';

const ProcessoBebidas = () => {
  const [drinkDetails, setDrinkDetails] = useState();
  const [isRecipeDone, setIsRecipeDone] = useState(false);

  const idDrink = useParams().id;

  const { detailsInfo, setDetailsInfo, isRecipeFinished } = useContext(ContextAPI);

  const getDrinkDetails = async () => {
    const drink = await detailsDrinkById(idDrink);

    setDrinkDetails({
      ...drinkDetails,
      drink: drink.drinks[0],
    });
    setDetailsInfo({ ...detailsInfo, drinks: drink.drinks[0] });
  };

  const loadDoneRecipesFromStorage = () => {
    if (localStorage.getItem('doneRecipes') === null) {
      const doneRecipes = [];
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const isCurrentRecipeDone = doneRecipes.some((key) => key.id === idDrink);

    if (isCurrentRecipeDone) setIsRecipeDone(true);
    else setIsRecipeDone(false);
  };

  useEffect(() => {
    getDrinkDetails();
    loadDoneRecipesFromStorage();
  }, []);

  const removeDrinkFromProgress = () => {
    const progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (progressRecipes !== null) {
      const progressKeys = Object.keys(progressRecipes.cocktails);
      let cocktailsObject = {};
      progressKeys.forEach((key) => {
        if (key !== idDrink) {
          cocktailsObject = { ...cocktailsObject, [key]: progressKeys[key] };
        }
      });
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...progressRecipes,
        cocktails: cocktailsObject,
      }));
    }
  };

  const setDoneRecipes = () => {
    if (drinkDetails) {
      removeDrinkFromProgress();
      setIsRecipeDone(true);

      const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      localStorage.setItem('doneRecipes', JSON.stringify([...doneRecipes, {
        id: drinkDetails.drink.idDrink,
        type: 'bebida',
        area: drinkDetails.drink.strArea,
        category: drinkDetails.drink.strCategory,
        alcoholicOrNot: '',
        name: drinkDetails.drink.strDrink,
        photoFood: drinkDetails.drink.strDrinkThumb,
        doneDate: '',
        tags: drinkDetails.drink.strTags
          ? drinkDetails.drink.strTags
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
      {!drinkDetails
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

export default ProcessoBebidas;
