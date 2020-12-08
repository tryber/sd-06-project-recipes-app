import React, { useEffect, useState } from 'react';

import { exploreDrinksByIngredients } from '../services/aPI';
import './ComidasPorIngrediente.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

const BebidasPorIngrediente = () => {
  const [stateIngredients, setStateIngredients] = useState();

  const searchForIngredients = async () => {
    const ingredients = await exploreDrinksByIngredients();

    setStateIngredients(ingredients);
  };

  useEffect(() => {
    searchForIngredients();
  }, []);

  const numberOfIngredients = 11;

  return (
    <div>
      <Header />
      {stateIngredients && console.log(stateIngredients)}
      <div className="main-ingredients">
        {!stateIngredients ? <div>Loading...</div>
          : stateIngredients.drinks.map((ingred, i) => (
            numberOfIngredients >= i
            && (
              <div
                key={ i }
                className="container-ingredients"
                data-testid={ `${i}-ingredient-card` }
              >
                <div className="container-img">
                  <img
                    src={ `https://www.thecocktaildb.com/images/ingredients/${ingred.strIngredient1}-Small.png` }
                    data-testid={ `${i}-card-img` }
                    alt="kkk"
                    width="100px"
                  />
                </div>
                <span
                  data-testid={ `${i}-card-name` }
                >
                  {ingred.strIngredient1}
                </span>
              </div>
            )
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default BebidasPorIngrediente;
