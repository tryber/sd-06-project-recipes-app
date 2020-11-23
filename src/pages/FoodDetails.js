import React, { useState, useEffect } from 'react';
import fetchRecipes from '../services';

function FoodDetails(props) {
  const { id } = props.match.params;
  const [requestDetails, setrequestDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const fetchFunction = async (response) => {
    await setrequestDetails(response.meals[0]);
  };
  const requestDetailsAPI = async () => {
    const response = await fetchRecipes(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    // setrequestDetails(response.meals[0]);
    await fetchFunction(response);
    const TheIngredients = [];
    for (let i = 1; i < 21; i++) {
      if (requestDetails.length > 0) {
        TheIngredients.push(requestDetails[` strMeasure${i} strIngredients${i}`]);
        console.log(TheIngredients);
      } else {
        break;
      }
    }
    setIngredients(TheIngredients);
  };

  useEffect(() => {
    requestDetailsAPI();
  }, []);
  return (
    <div data-testid="food-details">
      <img
        src={ requestDetails.strMealThumb }
        alt={ requestDetails.strMeal }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{requestDetails.strMeal}</h1>
      <button data-testid="share-btn" type="button">
        Compartilhar
      </button>
      <button data-testid="favorite-btn" type="button">
        Favoritar
      </button>
      <p data-testid="recipe-category">{requestDetails.strCategory}</p>
      {ingredients.map((ingredient, index) => (
        <div key={ index }>
          <ul>
            <li data-testid={ `${index}-ingredient-name-and-measure` }>{ingredient}</li>
          </ul>
        </div>
      ))}

      <p data-testid="instructions">{requestDetails.strInstructions}</p>
      {/* <h1 data-testid="${index}-recomendation-card">Receitas Recomendadas</h1> */}
      <button data-testid="start-recipe-btn" type="button">Iniciar</button>
    </div>

  );
}

export default FoodDetails;
