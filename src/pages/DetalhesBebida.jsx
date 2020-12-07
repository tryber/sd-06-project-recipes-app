import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  requestApiDrinkDetails,
} from '../services/requestDrink';
import {
  requestApiFoodFilterName,
} from '../services/requestFood';
import '../styles/Detalhes.css';
import buttonShare from '../styles/images/shareIcon.svg';
import FavoriteHeart from '../components/FavoriteHeart';
import { loadState } from '../services/localStorage';
import '../styles/imgBig.css';

function DetalhesBebida({ match: { params: { id } } }) {
  const zero = 0;
  const quinze = 15;
  const seis = 6;
  const [detailsDrink, setDetailsDrink] = useState({});
  const [arrayIngredients, setArrayIngredients] = useState([]);
  const [recommendDrink, setRecommendDrink] = useState([]);
  const [startRecipe, setStartRecipe] = useState('Iniciar Receita');

  const startRecipeFunc = (compare) => {
    if (localStorage.getItem('inProgressRecipes')) {
      const loadStorage = loadState('inProgressRecipes', '');
      if (loadStorage.cocktails) {
        if (loadStorage.cocktails[compare] !== undefined) {
          setStartRecipe('Continuar Receita');
        }
      }
    }
  };

  const testRecipeDone = () => {
    const doneRecipe = loadState('doneRecipes', []);
    const arrayDoneRecipe = doneRecipe.filter((element) => element.id === id);
    console.log(arrayDoneRecipe);
    if (arrayDoneRecipe.length !== zero) {
      document.getElementById('inprogress-btn').style.visibility = 'hidden';
    } else {
      document.getElementById('inprogress-btn').style.visibility = 'visible';
    }
  };

  useEffect(() => {
    requestApiDrinkDetails(id)
      .then((response) => {
        setDetailsDrink(response[0]);
        startRecipeFunc(response[0].idDrink);
        testRecipeDone();
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
      const response = await requestApiFoodFilterName();
      setRecommendDrink(response.slice(zero, seis));
    }
  };

  useEffect(() => {
    ingredientsFunc();
    recommendDrinkFunction();
  }, [detailsDrink]);

  // refatorar em componente no futuro
  const copyBoard = () => {
    const url = `http://localhost:3000/bebidas/${id}`;
    const input = document.body.appendChild(document.createElement('input'));
    input.value = url;
    input.select();
    document.execCommand('copy');
    input.parentNode.removeChild(input);
    const divBtns = document.getElementById('btns');
    const newSpan = document.createElement('span');
    newSpan.innerHTML = 'Link copiado!';
    divBtns.appendChild(newSpan);
  };

  if (detailsDrink.length === zero) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img
        className="imgBig"
        data-testid="recipe-photo"
        src={ detailsDrink.strDrinkThumb }
        alt="dk aspo"
      />
      <h2 data-testid="recipe-title">{detailsDrink.strDrink}</h2>
      <div data-testid="recipe-category">
        <h3>{detailsDrink.strAlcoholic}</h3>
        <h3>{detailsDrink.strCategory}</h3>
      </div>
      <h4 data-testid="instructions">{detailsDrink.strInstructions}</h4>
      <div id="btns">
        <button type="button" data-testid="share-btn" onClick={ copyBoard }>
          <img src={ buttonShare } alt="img-button-share" />
        </button>
        <FavoriteHeart id={ id } detailsDrink={ detailsDrink } />
      </div>
      {arrayIngredients.map((element, index) => (
        <h5
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {element}
        </h5>
      ))}
      <div className="carrossel">
        {recommendDrink.map((drink, index) => (
          <div
            className="carrossel-iten"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <img src={ drink.strMealThumb } alt="drink-thumb" />
            <h3 data-testid={ `${index}-recomendation-title` }>{drink.strMeal}</h3>
          </div>
        ))}
      </div>
      <Link to={ `/bebidas/${id}/in-progress` }>
        <button
          id="inprogress-btn"
          type="button"
          data-testid="start-recipe-btn"
          className="btn-footer"
        >
          { startRecipe }
        </button>
      </Link>
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
