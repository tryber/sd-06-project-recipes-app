import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Footer, Header } from '../components';
import RecipesContext from '../context/RecipesContext';
import '../style/PorIngrediente.css';

function ComidasPorIngrediente() {
  const [ingredientsMeal, setIngredientsMeal] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { data, setData } = useContext(RecipesContext);
  const zero = 0;
  const twelve = 12;

  const getMealsByIngredients = (ingredient) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
    return fetch(URL).then((response) => response.json().then((json) => (
      response.ok ? Promise.resolve(json) : Promise.reject(json)
    )));
  };

  const getMealsIngredients = () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    return fetch(URL).then((response) => response.json().then((json) => (
      response.ok ? Promise.resolve(json) : Promise.reject(json)
    )));
  };

  const clickOn = (ingrediente) => {
    getMealsByIngredients(ingrediente).then((meals) => {
      setData([meals, data[1]]);
      setRedirect(true);
    });
  };

  useEffect(() => {
    getMealsIngredients().then((meals) => setIngredientsMeal(meals.meals));
  }, []);

  if (ingredientsMeal.length > twelve) {
    return setIngredientsMeal(ingredientsMeal.slice(zero, twelve));
  }

  if (redirect) return <Redirect to="/comidas" />;

  return (
    <div className="ingredient">
      <Header title="Explorar Ingredientes" />
      <div className="ingredient-cards">
        <div className="ingredient-card">
          { ingredientsMeal.map((ingredients, index) => (
            <button
              key={ ingredients.strIngredient }
              type="button"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => clickOn(ingredients.strIngredient) }
            >
              <img
                data-testid={ `${index}-card-img` }
                src={ `https://www.themealdb.com/images/ingredients/${ingredients.strIngredient}-Small.png` }
                alt={ ingredients.strIngredient }
              />
              <p
                data-testid={ `${index}-card-name` }
              >
                { ingredients.strIngredient }
              </p>
            </button>
          )) }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ComidasPorIngrediente;
