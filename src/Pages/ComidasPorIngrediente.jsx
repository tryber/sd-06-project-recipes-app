import React, { useEffect, useState } from 'react';

import { exploreByIngredients } from '../services/aPI';
import './ComidasPorIngrediente.css';

import Header from '../components/Header';
import Footer from '../components/Footer';

const ComidasPorIngrediente = () => {
  const [stateIngredients, setStateIngredients] = useState();

  const searchForIngredients = async () => {
    const ingredients = await exploreByIngredients();

    setStateIngredients(ingredients);
  };

  useEffect(() => {
    searchForIngredients();
  }, []);

  const numberOfIngredients = 11;

  return (
    <div>
      <Header />
      <div className="main-ingredients">
        {!stateIngredients ? <div>Loading...</div>
          : stateIngredients.meals.map((ingred, i) => (
            numberOfIngredients >= i
            && (
              <div
                key={ i }
                className="container-ingredients"
                data-testid={ `${i}-ingredient-card` }
              >
                <div className="container-img">
                  <img
                    src={ `https://www.themealdb.com/images/ingredients/${ingred.strIngredient}-Small.png` }
                    data-testid={ `${i}-card-img` }
                    alt="kkk"
                    width="100px"
                  />
                </div>
                <span
                  data-testid={ `${i}-card-name` }
                >
                  {ingred.strIngredient}
                </span>
              </div>
            )
          ))}
      </div>
      <Footer />
    </div>
  );
};

export default ComidasPorIngrediente;
