import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';

function ExploreFoodIngredient() {
  const [ingredients, setIngredients] = useState([]);
  const { setMealCategories, setCurrentMealsExplore } = useContext(RecipeContext);

  const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

  useEffect(() => {
    const fecthMeals = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setIngredients(APIResponse.meals);
      }
    };
    fecthMeals();
  }, []);

  const incial = 0;
  const final = 12;

  const handleClickSetCategories = ({ target }) => {
    setMealCategories(target.value);
    setCurrentMealsExplore(true);
    console.log(target);
  };

  return (
    <div className="food-container">
      <Header title="Ingredientes" />
      <div className="mobile-container">
        {
          ingredients.slice(incial, final)
            .map((ingredient, index) => (
              <div key={ index } className="recipe-card">
                <h4
                  data-testid={ `${index}-card-name` }
                  value={ ingredient.strIngredient }
                >
                  {ingredient.strIngredient}
                </h4>
                <img
                  src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
                  alt="ingredient"
                  data-testid={ `${index}-card-img` }
                  value={ ingredient.strIngredient }
                />
                <Link
                  to="/comidas"
                  key={ index }
                  data-testid={ `${index}-ingredient-card` }
                  value={ ingredient.strIngredient }
                  onClick={ handleClickSetCategories }
                >
                  <button
                    type="button"
                    value={ ingredient.strIngredient }
                    onClick={ handleClickSetCategories }
                  >
                    explorar
                  </button>
                </Link>
              </div>
            ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoodIngredient;
