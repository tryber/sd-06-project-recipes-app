import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchMeal } from '../../services/mealAPI';
import SecondaryHeader from '../../components/SecondaryHeader/SecondaryHeader';
import {
  addRecipeProgress,
  selectedIngredient,
  addDoneRecipe,
} from '../../services/localStorage';
import './style.css';
import recipesAppContext from '../../context/recipesAppContext';

export default function MealInProgress() {
  const { id } = useParams();
  const [recipes, setRecipes] = useState({});
  const zero = 0;
  let ingredientsNumber = zero;
  const { fetchMealIngredients } = useContext(recipesAppContext);

  const fetchIngredients = async () => {
    const recipesByIdApi = await fetchMeal('lookupIngredient', id);
    setRecipes(recipesByIdApi.meals[0]);
  };

  useEffect(() => {
    fetchMealIngredients(id);
    fetchIngredients();
  }, []);

  const setIngredientAndMeasure = () => {
    const twenty = 20;
    const ingredients = [];
    let i = 1;
    for (i = 1; i <= twenty; i += 1) {
      const keyName = `strIngredient${i}`;
      const measureKeyName = `strMeasure${i}`;
      if (recipes[keyName] !== ''
          && recipes[keyName] !== undefined
          && recipes[keyName] !== null
      ) {
        const obj = {
          name: recipes[keyName],
          measure: recipes[measureKeyName],
        };
        ingredients.push(obj);
      }
    }

    ingredientsNumber = i;
    return ingredients;
  };

  const resumeProgress = (ingredients) => {
    ingredients.forEach((ingredient) => {
      const checkIngredient = document.getElementById(ingredient.name);
      if (selectedIngredient(id, ingredient.name)) {
        checkIngredient.classList.add('selected');
        checkIngredient.children[0].setAttribute('checked', 'true');
      } else {
        checkIngredient.classList.remove('selected');
        checkIngredient.children[0].removeAttribute('checked');
      }
    });
  };

  function verifyChecked() {
    const btnFinalizar = document.getElementById('btnFinalizar');
    const checkboxList = Array.from(document.querySelectorAll('input[type=checkbox]'));
    btnFinalizar.disabled = !checkboxList.every((item) => item.checked === true);
  }

  useEffect(() => {
    setIngredientAndMeasure();
    if (document.getElementById('renderizado') !== null) {
      resumeProgress(setIngredientAndMeasure());
      verifyChecked();
    }
  }, [recipes]);

  if (Object.keys(recipes).length === zero) {
    return (
      <div className="loading">
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }

  function selectItem(event) {
    const completedItem = event.target.parentNode;
    addRecipeProgress(id, event.target.name);
    if (selectedIngredient(id, event.target.name)) {
      completedItem.classList.add('selected');
      event.target.setAttribute('checked', 'true');
      verifyChecked();
    } else {
      completedItem.classList.remove('selected');
      event.target.removeAttribute('checked');
      verifyChecked();
    }
  }

  return (
    <div id="renderizado">
      <div>
        <SecondaryHeader
          name={ recipes.strMeal }
          img={ recipes.strMealThumb }
          category={ recipes.strCategory }
        />
      </div>
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
        <ul>
          {setIngredientAndMeasure().map((ingredient, index) => {
            if (index < ingredientsNumber) {
              return (
                <div key={ ingredient.name }>
                  <li>
                    <label
                      data-testid={ `${index}-ingredient-step` }
                      htmlFor={ ingredient.name }
                      name={ ingredient.name }
                      id={ ingredient.name }
                    >
                      <input
                        name={ ingredient.name }
                        type="checkbox"
                        key={ index }
                        onClick={ (e) => selectItem(e) }
                      />
                      { `${ingredient.name} - ${ingredient.measure}` }
                    </label>
                  </li>
                  <br />
                </div>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <div data-testid="instructions">{recipes.strInstructions}</div>
      </div>
      <div className="button-container">
        <Link to="/receitas-feitas">
          <button
            id="btnFinalizar"
            type="button"
            className="start-recipe"
            data-testid="finish-recipe-btn"
            onClick={ () => addDoneRecipe(recipes) }
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </div>
  );
}
