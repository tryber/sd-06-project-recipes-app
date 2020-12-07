import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import FetchApiDrink from '../services/FetchApiDrink';

function ExploreDrinkIngredients() {
  const {
    setListIngredients,
    listIngredients,
    setFetchDrink,
    setEffectOnLoad,
  } = useContext(RecipesContext);

  useEffect(() => {
    FetchApiDrink('ingredientsCategory', setListIngredients);
    setEffectOnLoad(false);
  }, []);

  async function handleCLick(ingredient) {
    await FetchApiDrink('ingredients', setFetchDrink, ingredient);
  }

  const inicio = 0;
  const fim = 12;
  return (
    <div>
      <Header />
      {listIngredients ? listIngredients.map((ingredients, index) => (
        <Link to="/bebidas" key={ index }>
          <button
            onClick={ () => handleCLick(ingredients.strIngredient1) }
            key={ index }
            type="button"
          >
            <div
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredients.strIngredient1}-Small.png` }
                alt="Ingredient-img"
                data-testid={ `${index}-card-img` }
              />
              <span data-testid={ `${index}-card-name` }>
                {ingredients.strIngredient1}
              </span>
            </div>
          </button>
        </Link>
      )).splice(inicio, fim) : null}
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
