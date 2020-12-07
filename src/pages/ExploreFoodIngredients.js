import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipesContext from '../context/RecipesContext';
import FetchApiFood from '../services/FetchApiFood';

import { CardContainer } from '../styles/exploreFoodDrinkIngredients';

function ExploreFoodIngredients() {
  const {
    setListIngredients,
    listIngredients,
    setFetchFood,
    setEffectOnLoad,
  } = useContext(RecipesContext);

  useEffect(() => {
    FetchApiFood('9', setListIngredients);
    setEffectOnLoad(false);
  }, []);

  async function handleCLick(ingredient) {
    await FetchApiFood('1', setFetchFood, ingredient);
  }

  const inicio = 0;
  const fim = 12;
  return (
    <div>
      <Header />
      <CardContainer>
        {listIngredients ? listIngredients.map((ingredients, index) => (
          <Link
            to="/comidas"
            key={ index }
            onClick={ () => handleCLick(ingredients.strIngredient) }
          >

            <p data-testid={ `${index}-card-name` }>
              {`[ ${ingredients.strIngredient} ]`}
            </p>

            <div
              data-testid={ `${index}-ingredient-card` }
              key={ index }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${ingredients.strIngredient}-Small.png` }
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

export default ExploreFoodIngredients;
