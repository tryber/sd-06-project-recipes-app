import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import inProgressContext from '../contexts/inProgressContext';

function IngredientsCheck({ recipe, path, id }) {
  const { ingredients = [], measures = [] } = recipe;
  const [ingredientsCheck, setIngredientsCheck] = useState({});
  const { setDisableButton } = useContext(inProgressContext);

  const toggleIngredientCheck = (event) => {
    const ingredientName = event.target.id;
    const newCheckedIngredients = {
      ...ingredientsCheck,
      [ingredientName]: !ingredientsCheck[ingredientName],
    };
    if (newCheckedIngredients[ingredientName] === false) {
      delete newCheckedIngredients[ingredientName];
    }
    setIngredientsCheck(newCheckedIngredients);
  };

  const getSavedIngredientsFromLocalStorage = () => {
    const key = path === 'comidas' ? 'meals' : 'cocktails';
    const retrievedLocalStorageInfo = JSON.parse(
      localStorage.getItem('inProgressRecipes'),
    );
    if (retrievedLocalStorageInfo === null) {
      console.log('retrievedLocalStorageInfo is null');
    } else if (retrievedLocalStorageInfo[key][id] !== undefined) {
      const savedIngredients = retrievedLocalStorageInfo[key][id];

      const unCheckedIngredients = ingredients.filter((ingredient) => (
        !savedIngredients.includes(ingredient)
      ));

      const ingredientsObj = {};

      unCheckedIngredients.forEach((ingredient) => {
        ingredientsObj[ingredient] = false;
      });

      savedIngredients.forEach((ingredient) => {
        ingredientsObj[ingredient] = true;
      });

      setIngredientsCheck(ingredientsObj);
    }
  };

  const toggleFinishRecipeButton = () => {
    if (Object.keys(ingredientsCheck).length >= 1) {
      const allIngredients = [...ingredients];
      const checkedIngredients = Object.keys({ ...ingredientsCheck });

      if (allIngredients.length === checkedIngredients.length) {
        setDisableButton(false);
      } else {
        setDisableButton(true);
      }
    }
  };

  const saveCheckedToLocalStorage = () => {
    const minLength = 0;
    if (recipe.id !== undefined && (Object.keys(ingredientsCheck)).length >= minLength) {
      if (recipe.id === undefined) return null;
      const settedIngredients = Object.keys(ingredientsCheck);
      const status = Object.values(ingredientsCheck);
      const currentCheckedIngredients = JSON.parse(localStorage.getItem(
        'inProgressRecipes',
      )) || { meals: {}, cocktails: {} };
      const key = path === 'comidas' ? 'meals' : 'cocktails';
      const checkedIngToLocalStorage = settedIngredients.filter((ingredient, index) => (
        status[index]
      ));
      currentCheckedIngredients[key][recipe.id] = checkedIngToLocalStorage;
      localStorage.setItem(
        'inProgressRecipes', JSON.stringify(currentCheckedIngredients),
      );
    }
  };

  useEffect(() => {
    getSavedIngredientsFromLocalStorage();
  }, []);

  useEffect(() => {
    toggleFinishRecipeButton();
  }, [ingredientsCheck, recipe]);

  useEffect(() => {
    saveCheckedToLocalStorage();
  }, [ingredientsCheck]);

  const handleCheckClick = (event) => {
    toggleIngredientCheck(event);
  };

  return (
    <ul className="inProgress-list">
      {ingredients.map((ingredient, index) => (
        <li
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
        >
          <label htmlFor={ `${ingredient}` }>
            <input
              className={ ingredientsCheck[ingredient] && 'checked' }
              type="checkbox"
              id={ `${ingredient}` }
              onClick={ (event) => handleCheckClick(event) }
              checked={ ingredientsCheck[ingredient] }
            />
            <span
              className={ ingredientsCheck[ingredient] && 'checked-text' }
            >
              {`${ingredient} - ${measures[index]}`}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
IngredientsCheck.propTypes = {
  recipe: PropTypes.shape.isRequired,
  path: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default IngredientsCheck;
