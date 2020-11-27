import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import { getDrinksApi, getMealsAPI } from '../../services/API';
import './InProgress.css';

const InProgress = () => {
  const { inProgressRecipe } = useContext(Context);
  const [recipe, setRecipe] = useState([]);
  const [ingredients, setIngredients] = useState({});

  useEffect(() => {
    if (inProgressRecipe.type === '/comidas') {
      getMealsAPI(`${inProgressRecipe.id}`, 'details')
        .then((data) => {
          setRecipe(data[0]);
        });
    }
    if (inProgressRecipe.type === '/bebidas') {
      getDrinksApi(`${inProgressRecipe.id}`, 'details')
        .then((data) => {
          setRecipe(data[0]);
        });
    }
  }, []);

  useEffect(() => {
    if (recipe) {
      const currRecipe = recipe;
      const array = [];
      const twenty = 20;
      for (let count = 1; count <= twenty; count += 1) {
        array.push(count);
      }
      const recipesArray = array.map((index) => {
        const name = currRecipe[`strIngredient${index}`];
        const value = currRecipe[`strMeasure${index}`];
        const obj = { [name]: value };
        return obj;
      });
      setIngredients(recipesArray);
    }
  }, [recipe]);

  return (
    <div>
      In progress
      <button
        type="button"
        onClick={() => console.log(recipe, ingredients)}
      >
        ViewData
      </button>
      <nav className="social">
        <button data-testid="share-btn" type="button">Share</button>
        <button data-testid="favorite-btn" type="button">Favorite</button>
      </nav>
      <div className="recipe-info-wrapper">
        <img
          src={recipe.strDrinkThumb || recipe.strMealThumb}
          data-testid="recipe-photo"
          className="recipe-pic"
          alt={recipe.strMeal || recipe.strDrink}
        />
        <p data-testid="recipe-title">
          {recipe.strMeal || recipe.strDrink}
        </p>
        <small data-testid="recipe-category">
          {recipe.strCategory}
        </small>
        <div className="process">
          <div className="ingredients">
            <table>
              <thead>
                <tr>
                  <th>Ingredient</th>
                  <th>Check</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th data-testid="1-ingredient-step">{recipe.strIngredient1 + recipe.strMeasure1}</th>
                  <th>
                    <input type="checkbox" />
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <div data-testid="instructions" className="instructions">
            <p>{recipe.strInstructions}</p>
          </div>
          <button
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finish recipe
          </button>
        </div>
      </div>
    </div>
  );
};

export default InProgress;
