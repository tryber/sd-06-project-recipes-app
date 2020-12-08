import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiDrinkFilterIngredient,
  requestApiDrinkListIngredients,
} from '../services/requestDrink';
import '../styles/marginHederAndFooter.css';
import '../styles/PorComidas.css';

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

  const upToParameter12 = 12;
  const [upToParameter, setUpToParameter] = useState(upToParameter12);

  const onClickMoreFood = () => {
    setUpToParameter(upToParameter + upToParameter12);
  };

  const ofTheFirstParameter = 0;
  const disableButtonMoreResults = true;

  return (
    <div className="container-margin-heder container-margin-footer allcardingredients">
      <Header name="Por Ingredientes" button={ false } />
      {nameIngredientsDrink.slice(ofTheFirstParameter, upToParameter)
        .map((ingredient, index) => (
          <div
            className="cardingredients"
            key={ index }
          >
            <button
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
          </div>
        ))}
      <button
        type="button"
        onClick={ onClickMoreFood }
        className="show-results"
        disabled={ upToParameter > nameIngredientsDrink.length ? disableButtonMoreResults : false }
      >
        Mostrar mais resultados
      </button>
      <Footer />
    </div>
  );
}

BebidasPorIngredientes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default BebidasPorIngredientes;
