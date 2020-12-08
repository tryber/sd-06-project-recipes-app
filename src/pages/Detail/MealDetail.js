import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import SecondaryHeader from '../../components/SecondaryHeader/SecondaryHeader';
import RecommendationCard from '../../components/RecommendationCard';
import { fetchDrink } from '../../services/cocktailAPI';
import './style.css';
import recipesAppContext from '../../context/recipesAppContext';

function MealDetail() {
  const [recommendations, setRecommendations] = useState([]);
  const [newRecipe, setNewRecipe] = useState(true);
  const { recipesMeals, fetchMealIngredients } = useContext(recipesAppContext);
  console.log(recipesMeals.strYoutube);

  const { id } = useParams();
  const zero = 0;
  const two = 2;
  const maxRecommendations = 6;
  let ingredientsNumber = zero;

  const fetchRecommendations = async () => {
    const recipesRecommendation = await fetchDrink('name', '');
    console.log('recommendations por nome', recipesRecommendation);
    setRecommendations(recipesRecommendation.drinks);
  };

  useEffect(() => {
    fetchMealIngredients(id);
    fetchRecommendations();
  }, []);

  const setIngredientAndMeasure = () => {
    const twenty = 20;
    const ingredients = [];
    let i = 1;
    for (i = 1; i <= twenty; i += 1) {
      const keyName = `strIngredient${i}`;
      const measureKeyName = `strMeasure${i}`;
      if (recipesMeals[keyName] !== '' && recipesMeals[keyName] !== null) {
        const obj = {
          name: recipesMeals[keyName],
          measure: recipesMeals[measureKeyName],
        };
        ingredients.push(obj);
      }
    }

    ingredientsNumber = i;
    return ingredients;
  };

  useEffect(() => {
    setIngredientAndMeasure();
  }, [recipesMeals]);

  if (Object.keys(recipesMeals).length === zero) {
    return (
      <div className="loading">
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }

  return (
    <div>
      <SecondaryHeader
        name={ recipesMeals.strMeal }
        img={ recipesMeals.strMealThumb }
        category={ recipesMeals.strCategory }
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
        <div data-testid="instructions">{recipesMeals.strInstructions}</div>
      </div>
      {

      }
      <div className="video-container">
        <iframe
          data-testid="video"
          src={ recipesMeals.strYoutube }
          title={ recipesMeals.strMeal }
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          id="meal-video"
          frameBorder="0"
          width="300"
          height="300"
        />
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
        <Link to={ `/comidas/${recipesMeals.idMeal}/in-progress` }>
          <button
            type="button"
            className="start-recipe"
            data-testid="start-recipe-btn"
          >
            {newRecipe ? 'Iniciar Receita' : (setNewRecipe(false) && 'Continuar Receita')}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default MealDetail;
