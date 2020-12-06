import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  requestApiDrinkDetails,
} from '../services/requestDrink';
import {
  recommendFoodsList,
} from '../services/requestFood';
import '../styles/Detalhes.css';
import buttonShare from '../styles/images/shareIcon.svg';

function DetalhesBebida(props) {
  const [detailsDrink, setDetailsDrink] = useState([]);
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recommendDrink, setRecommendDrink] = useState([]);
  const zero = 0;
  const quinze = 15;
  const seis = 6;

  useEffect(() => {
    requestApiDrinkDetails(props.match.params.id)
      .then((response) => {
        setDetailsDrink(response[0]);
        console.log(response);
      });
  }, []);

  const ingredientsFunc = () => {
    if (detailsDrink.length !== zero) {
      const array = [];
      for (let i = 1; i <= quinze; i += 1) {
        const detDrink = `${detailsDrink[`strIngredient${i}`]}`;
        const detMeasure = `${detailsDrink[`strMeasure${i}`]}`;
        const ingredient = `${detDrink} ${detMeasure}`;
        array.push(ingredient);
      }
      const arrayReturn = array.filter((element) => element !== 'null null');
      setArrayIngredients(arrayReturn);
    }
  };

  const recommendDrinkFunction = async () => {
    if (detailsDrink.length !== zero) {
      const response = await recommendFoodsList();
      setRecommendDrink(response.meals.slice(zero, seis));
      console.log(response);
    }
  };

  useEffect(() => {
    ingredientsFunc();
    recommendDrinkFunction();
  }, [detailsDrink]);

  if (detailsDrink.length === zero) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <img data-testid="recipe-photo" src={ detailsDrink.strDrinkThumb } alt="dk aspo" />
      <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
      <div data-testid="recipe-category">
        <h3>{detailsDrink.strAlcoholic}</h3>
        <h3>{detailsDrink.strCategory}</h3>
      </div>
      <h4 data-testid="instructions">{detailsDrink.strInstructions}</h4>
      <button type="button" data-testid="share-btn">
        <img src={ buttonShare } alt="img-button-share" />
      </button>
      <button type="button" data-testid="favorite-btn">Favorite</button>
      {arrayIngredients.map((element, index) => (
        <h5
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {element}
        </h5>
      ))}
      <div data-testid="0-recomendation-card">
        {recommendDrink.map((drink, index) => (
          <div key={ index }>
            <img src={ drink.strMealThumb } alt="drink-thumb" />
            <h3>{drink.strMeal}</h3>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="btn-footer"
      >
        Iniciar receita
      </button>
    </div>
  );
}

DetalhesBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetalhesBebida;
