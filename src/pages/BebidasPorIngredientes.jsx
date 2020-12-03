import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiDrinkFilterIngredient,
  requestApiDrinkListIngredients,
} from '../services/requestDrink';

function BebidasPorIngredientes({ history }) {
  const {
    cards: {
      setCardDrink,
    },
  } = useContext(RecipesAppContext);

  const [nameIngredientsDrink, setNameIngredientsDrink] = useState([]);

  useEffect(() => {
    requestApiDrinkListIngredients()
      .then((arrayObjIngredients) => {
        const arrayNameIngredientsDrink = arrayObjIngredients
          .map((objIngredient) => objIngredient.strIngredient1);
        setNameIngredientsDrink(arrayNameIngredientsDrink);
      });
  }, []);

  const onClickIngredient = async (ingredient) => {
    const arrayIngredients = await requestApiDrinkFilterIngredient(ingredient);
    setCardDrink(arrayIngredients);
    history.push('/bebidas');
  };

  const ofTheFirstParameter = 0;
  const upToParameter12 = 12;

  return (
    <>
      <Header name="Explorar Ingredientes" button={ false } />
      {nameIngredientsDrink.slice(ofTheFirstParameter, upToParameter12)
        .map((ingredient, index) => (
          <button
            key={ index }
            type="button"
            data-testid={ `${index}-ingredient-card` }
            onClick={ () => onClickIngredient(ingredient) }
          >
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png` }
              alt={ ingredient }
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              { ingredient }
            </p>
          </button>
        ))}
      <Footer />
    </>
  );
}

BebidasPorIngredientes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default BebidasPorIngredientes;
