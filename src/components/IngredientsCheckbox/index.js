import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ContextAPI from '../../Context/ContextAPI';

const IngredientsCheckbox = () => {
  const { detailsInfo, setIsRecipeFinished } = useContext(ContextAPI);
  const [checkedIdList, setCheckedIdList] = useState([]);
  const paramID = useParams().id;
  const path = window.location.href;

  const getIngredientsOrMeasure = (param) => {
    let dataObject = {};
    if (path.includes('comidas')) dataObject = detailsInfo.foods;
    else dataObject = detailsInfo.drinks;

    const dataKeys = Object.keys(dataObject)
      .filter((key) => key.includes(param)
        && dataObject[key] !== '' && dataObject[key] !== ' ' && dataObject[key] !== null);

    const ingredients = dataKeys
      .map((key) => dataObject[key]);

    return ingredients;
  };

  const loadCheckedIngredientsLocalStorage = () => {
    if (localStorage.getItem('checkedIngredients') === null) {
      const checkedIngredients = {
        cocktails: {},
        meals: {},
      };
      localStorage.setItem('checkedIngredients', JSON.stringify(checkedIngredients));
    }

    const checkedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));
    if (path.includes('comidas')) {
      setCheckedIdList(checkedIngredients.meals[paramID] || []);
    } else setCheckedIdList(checkedIngredients.cocktails[paramID] || []);
  };

  const setDoneRecipeBtn = () => {
    const ingredientsList = getIngredientsOrMeasure('strIngredient');

    if (ingredientsList.length === checkedIdList.length) setIsRecipeFinished(true);
    else setIsRecipeFinished(false);
  };

  useEffect(() => {
    loadCheckedIngredientsLocalStorage();
  }, []);

  useEffect(() => {
    setDoneRecipeBtn();
  }, [detailsInfo]);

  const saveCheckedIngredient = (checkedIngredients, target) => {
    const isFoodPage = path.includes('comidas');
    let ingredientsToSave = {};

    if (isFoodPage) {
      ingredientsToSave = {
        ...checkedIngredients,
        meals: {
          ...checkedIngredients.meals,
          [paramID]: checkedIngredients.meals[paramID] ? [
            ...checkedIngredients.meals[paramID],
            target.id,
          ] : [target.id],
        },
      };
    } else {
      ingredientsToSave = {
        ...checkedIngredients,
        cocktails: {
          ...checkedIngredients.cocktails,
          [paramID]: checkedIngredients.cocktails[paramID] ? [
            ...checkedIngredients.cocktails[paramID],
            target.id,
          ] : [target.id],
        },
      };
    }

    localStorage.setItem('checkedIngredients', JSON.stringify(ingredientsToSave));
    const ingredientsChecked = isFoodPage
      ? ingredientsToSave.meals[paramID] : ingredientsToSave.cocktails[paramID];

    setCheckedIdList(ingredientsChecked);
    const ingredientsList = getIngredientsOrMeasure('strIngredient');

    if (ingredientsList.length === ingredientsChecked.length) setIsRecipeFinished(true);
  };

  const removeCheckedIngredient = (checkedIngredients, target) => {
    const isFoodPage = path.includes('comidas');
    let ingredientsToSave = {};

    if (isFoodPage) {
      ingredientsToSave = {
        ...checkedIngredients,
        meals: {
          ...checkedIngredients.meals,
          [paramID]: [
            ...checkedIngredients.meals[paramID].filter((id) => id !== target.id),
          ],
        },
      };
    } else {
      ingredientsToSave = {
        ...checkedIngredients,
        cocktails: {
          ...checkedIngredients.cocktails,
          [paramID]: [
            ...checkedIngredients.cocktails[paramID].filter((id) => id !== target.id),
          ],
        },
      };
    }
    localStorage.setItem('checkedIngredients', JSON.stringify(ingredientsToSave));
    const ingredientsChecked = isFoodPage
      ? ingredientsToSave.meals[paramID] : ingredientsToSave.cocktails[paramID];

    setCheckedIdList(ingredientsChecked);
    const ingredientsList = getIngredientsOrMeasure('strIngredient');

    if (ingredientsList.length !== ingredientsChecked.length) setIsRecipeFinished(false);
  };

  const handleCheckbox = (target) => {
    const checkedIngredients = JSON.parse(localStorage.getItem('checkedIngredients'));

    if (target.checked === true) {
      saveCheckedIngredient(checkedIngredients, target);
    } else {
      removeCheckedIngredient(checkedIngredients, target);
    }

    return target.id;
  };

  const showIngredientsCheckbox = () => {
    const ingredientsList = getIngredientsOrMeasure('strIngredient');
    const measuresList = getIngredientsOrMeasure('strMeasure');

    return (
      ingredientsList.map((ingred, i) => (
        <label
          key={ i }
          htmlFor={ i }
          className="input-checkbox"
          data-testid={ `${i}-ingredient-step` }
        >
          <input
            className="checkbox-input"
            type="checkbox"
            checked={ checkedIdList.includes(i.toString()) }
            id={ i }
            onChange={ (({ target }) => handleCheckbox(target)) }
          />
          {`${ingred} - ${measuresList[i]}`}
        </label>
      ))
    );
  };

  return (
    <div className="box-ingredients">
      <div className="span-ingredients">
        <span>Ingredients</span>
      </div>
      <div className="container-checkbox">
        {showIngredientsCheckbox()}
      </div>
    </div>
  );
};

export default IngredientsCheckbox;
