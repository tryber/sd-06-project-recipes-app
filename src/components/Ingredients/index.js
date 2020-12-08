import React, { useContext } from 'react';
import ContextAPI from '../../Context/ContextAPI';

const Ingredients = () => {
  const { detailsInfo } = useContext(ContextAPI);

  const getIngredientsOrMeasure = (param) => {
    const path = window.location.href;
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

  const showIngredients = () => {
    const ingredientsList = getIngredientsOrMeasure('strIngredient');
    const measuresList = getIngredientsOrMeasure('strMeasure');

    return (
      <ul>
        {ingredientsList.map((ingred, i) => (
          <li
            data-testid={ `${i}-ingredient-name-and-measure` }
            key={ i }
          >
            {`${ingred} - ${measuresList[i]}`}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="box-ingredients">
      <div
        className="span-ingredients"
      >
        <span>Ingredients</span>
      </div>
      <div className="box-ingredients">
        {showIngredients()}
      </div>
    </div>
  );
};

export default Ingredients;
