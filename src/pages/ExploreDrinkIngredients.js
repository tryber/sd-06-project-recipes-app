import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import FetchApiDrink from '../services/FetchApiDrink';

import { CardContainer } from '../styles/exploreFoodDrinkIngredients';

function ExploreDrinkIngredients() {
  const {
    setListIngredients,
    listIngredients,
    setFetchDrink,
    setEffectOnLoad,
  } = useContext(RecipesContext);

  useEffect(() => {
    FetchApiDrink('7', setListIngredients);
    setEffectOnLoad(false);
  }, []);

  async function handleCLick(ingredient) {
    await FetchApiDrink('1', setFetchDrink, ingredient);
  }

  const inicio = 0;
  const fim = 12;
  return (
    <div>
      <Header />
      <CardContainer>
        {listIngredients ? listIngredients.map((ingredients, index) => (
          <Link
            onClick={ () => handleCLick(ingredients.strIngredient1) }
            to="/bebidas"
            key={ index }
          >

            <p data-testid={ `${index}-card-name` }>
              {`[ ${ingredients.strIngredient1} ]`}
            </p>

            <div
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredients.strIngredient1}-Small.png` }
                alt="Ingredient-img"
                data-testid={ `${index}-card-img` }
              />
            </div>

          </Link>
        )).splice(inicio, fim) : null}
      </CardContainer>
      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
