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
    <>
      <Header title="Explorar Ingredientes" />
      {
        ingredients.slice(incial, final)
          .map((ingredient, index) => (
            <>
              <h3
                data-testid={ `${index}-card-name` }
                value={ ingredient.strIngredient }
              >
                {ingredient.strIngredient}
              </h3>
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
            </>
          ))
      }
      <Footer />
    </>
  );
}

export default ExploreFoodIngredient;
