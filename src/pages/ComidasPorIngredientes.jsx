import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiFoodFilterIngredient,
  requestApiFoodListIngredients,
} from '../services/requestFood';
import '../styles/marginHederAndFooter.css';
import '../styles/PorComidas.css';

function ComidaPorIngredientes({ history }) {
  const {
    cards: {
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  const [nameIngredientsFood, setNameIngredientsFood] = useState([]);

  useEffect(() => {
    requestApiFoodListIngredients()
      .then((arrayObjIngredients) => {
        const arrayNameIngredientsFood = arrayObjIngredients
          .map((objIngredient) => objIngredient.strIngredient);
        setNameIngredientsFood(arrayNameIngredientsFood);
      });
  }, []);

  const onClickIngredient = async (ingredient) => {
    const arrayIngredients = await requestApiFoodFilterIngredient(ingredient);
    setCardFood(arrayIngredients);
    history.push('/comidas');
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
      {nameIngredientsFood.slice(ofTheFirstParameter, upToParameter)
        .map((ingredient, index) => (
          <div
            key={ index }
            className="cardingredients"
          >
            <button
              type="button"
              data-testid={ `${index}-ingredient-card` }
              onClick={ () => onClickIngredient(ingredient) }
            >
              <img
                src={ `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png` }
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
        disabled={ upToParameter > nameIngredientsFood.length ? disableButtonMoreResults : false }
      >
        Mostrar mais resultados
      </button>
      <Footer />
    </div>
  );
}

ComidaPorIngredientes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default ComidaPorIngredientes;
