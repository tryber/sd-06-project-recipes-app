import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import SecondaryHeader from '../../components/SecondaryHeader';
import RecommendationCard from '../../components/RecommendationCard';
import { fetchMeal } from '../../services/mealAPI';
import './detail.css';

import recipesAppContext from '../../context/recipesAppContext';

function DrinkDetail() {
  const { recipesDrinks, fetchDrinkIngredients } = useContext(recipesAppContext);
  const [recommendations, setRecommendations] = useState([]);
  const [newRecipe, setNewRecipe] = useState(true);
  const { id } = useParams();
  const zero = 0;
  const two = 2;
  const maxRecommendations = 6;
  let ingredientsNumber = zero;

  const fetchRecommendations = async () => {
    const recipesRecommendation = await fetchMeal('name', '');
    setRecommendations(recipesRecommendation.meals);
  };

  useEffect(() => {
    fetchDrinkIngredients(id);
    fetchRecommendations();
  }, []);

  const setIngredientAndMeasure = () => {
    const fifteen = 15;
    const ingredients = [];
    let i = 1;
    for (i = 1; i <= fifteen; i += 1) {
      const keyName = `strIngredient${i}`;
      const measureKeyName = `strMeasure${i}`;
      if (recipesDrinks[keyName] !== '' && recipesDrinks[keyName] !== null) {
        const obj = {
          name: recipesDrinks[keyName],
          measure: recipesDrinks[measureKeyName],
        };
        ingredients.push(obj);
      }
    }

    ingredientsNumber = i;
    return ingredients;
  };

  useEffect(() => {
    setIngredientAndMeasure();
  }, [recipesDrinks]);

  if (Object.keys(recipesDrinks).length === zero) {
    return (
      <div className="loading">
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }

  return (
    <div>
      <SecondaryHeader
        name={ recipesDrinks.strDrink }
        img={ recipesDrinks.strDrinkThumb }
        category={ recipesDrinks.strAlcoholic }
      />
      <div className="ingredients-container">
        <h3>Ingredientes</h3>
        {setIngredientAndMeasure().map((ingredient, index) => {
          if (index < ingredientsNumber) {
            return (
              <div
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`- ${ingredient.name} - ${ingredient.measure}`}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="instructions-container">
        <h3>Instruções</h3>
        <div data-testid="instructions">{recipesDrinks.strInstructions}</div>
      </div>
      <div className="recommendation-container">
        <div className="scroller">
          {
            recommendations.slice(zero, maxRecommendations)
              .map((recommendation, index) => (
                <RecommendationCard
                  className={ index < two ? '' : 'hidden' }
                  key={ index }
                  recommendation={ recommendation }
                  index={ index }
                />
              ))
          }
        </div>
      </div>
      <div className="button-container">
        <Link to={ `/bebidas/${recipesDrinks.idDrink}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe"
          >
            {newRecipe ? 'Iniciar Receita' : (setNewRecipe(false) && 'Continuar Receita')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default DrinkDetail;
