import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiFoodFilterIngredient,
  requestApiFoodListIngredients,
} from '../services/requestFood';

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

  const ofTheFirstParameter = 0;
  const upToParameter12 = 12;

  return (
    <>
      <Header name="Comida por Ingredientes" button={ false } />
      {nameIngredientsFood.slice(ofTheFirstParameter, upToParameter12)
        .map((ingredient, index) => (
          <button
            key={ index }
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
        ))}
      <Footer />
    </>
  );
}

ComidaPorIngredientes.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default ComidaPorIngredientes;
