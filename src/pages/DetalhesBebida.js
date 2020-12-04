import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import ReceitasContext from '../context/ReceitasContext';
import MealsCard from '../components/MealsCard';
import Header from '../components/Header';
import { fetchDrinkAPI } from '../services/drinkAPI';
import { foodAPI } from '../services/foodAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../style/Detalhes.css';
import load from '../images/load.png';
import '../style/Loading.css';

function DetalhesBebida(props) {
  const {
    meals,
    setMeals,
    fetchById,
    setFetchById,
    beganRecipes,
    setBeganRecipes,
    doneRecipes,
  } = useContext(ReceitasContext);

  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [isFetching, setFetching] = useState(true);

  const {
    match: {
      params: { id },
    },
  } = props;

  const startedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const seis = 6;

  useEffect(() => {
    async function fetchFood() {
      const foodResponse = await foodAPI();
      const responseAPI = await fetchDrinkAPI(id);

      setMeals(foodResponse);
      setFetchById(responseAPI);

      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );

      if (!favoriteRecipes || !favoriteRecipes.length) {
        setIsFavorite(false);
      } else if (favoriteRecipes.some((recipe) => recipe.id === id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }

      setFetching(false);
    }

    fetchFood();
  }, []);

  const getIngredients = (obj, filter) => {
    const keys = [];

    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });
    return keys;
  };

  const startRecipe = (recipeName) => {
    localStorage.setItem(
      'inProgressRecipes',
      JSON.stringify({
        ...startedRecipes,
        cocktails: {
          [recipeName]: fetchById,
        },
      }),
    );

    if (!beganRecipes.includes(recipeName)) {
      setBeganRecipes([...beganRecipes, recipeName]);
    }
  };

  const verifyState = (idDrink) => {
    if (!startedRecipes.cocktails) {
      return 'Iniciar Receita';
    }
    if (!startedRecipes.cocktails[idDrink]) {
      return 'Iniciar Receita';
    }
    return 'Continuar Receita';
  };

  const copyToCB = () => {
    const url = window.location.href;

    copy(url);
    setCopied(true);
  };

  const localVerify = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const {
      idDrink,
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb,
    } = fetchById[0];

    if (!favoriteRecipes) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([
          {
            id: idDrink,
            type: 'bebida',
            area: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb,
          },
        ]),
      );
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([
          ...favoriteRecipes,
          {
            id: idDrink,
            type: 'bebida',
            area: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb,
          },
        ]),
      );
    }

    setIsFavorite(true);
  };

  const removeFavorite = (idRecipe) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    let index;

    favoriteRecipes.forEach((item, i) => {
      if (item.id === idRecipe) {
        index = i;
      }
    });

    const zero = 0;
    localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify([
        ...favoriteRecipes.slice(zero, index),
        ...favoriteRecipes.slice(index + 1, favoriteRecipes.length),
      ]),
    );

    setIsFavorite(false);
  };

  const setFavorite = (idRecipe) => {
    const image = document.getElementById('favorite-img').src;

    if (image.includes(whiteHeartIcon)) {
      localVerify();
    } else {
      removeFavorite(idRecipe);
    }
  };

  return isFetching ? (
    <div className="align-self-center d-flex justify-content-center">
      <img src={ load } alt="loading" className="loading" />
    </div>
  ) : (
    <section>
      <Header title="Detalhes Bebidas" />
      {fetchById.map((drink, index) => (
        <div key={ index }>
          <div className="row justify-content-center p-0">
            <div className="col-6 p-0">
              <img
                data-testid="recipe-photo"
                src={ drink.strDrinkThumb }
                width="100%"
                alt=""
              />
            </div>
          </div>
          <h2 data-testid="recipe-title">{drink.strDrink}</h2>
          <div>
            <button data-testid="share-btn" type="button" onClick={ copyToCB }>
              Compartilhar
            </button>
            {copied ? 'Link copiado!' : null}
          </div>
          <button type="button" onClick={ () => setFavorite(drink.idDrink) }>
            <img
              data-testid="favorite-btn"
              id="favorite-img"
              src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
              alt=""
            />
          </button>
          <p data-testid="recipe-category">{drink.strAlcoholic}</p>
          {getIngredients(drink, /strIngredient/).map((item, indx) => {
            const measure = getIngredients(drink, /strMeasure/);
            return (
              <p key={ indx } data-testid={ `${indx}-ingredient-name-and-measure` }>
                {`- ${item} - ${measure[indx]}`}
              </p>
            );
          })}
          <p data-testid="instructions">{drink.strInstructions}</p>
          <h4>Receitas Recomendadas</h4>
          <div className="carousel">
            {meals.length && meals
              .filter((_, indx) => indx < seis)
              .map((food, i) => (
                <div key={ i } data-testid={ `${i}-recomendation-card` }>
                  <div data-testid={ `${i}-recomendation-title` }>
                    <MealsCard food={ food } index={ i } />
                  </div>
                </div>
              ))}
          </div>
          {!doneRecipes.includes(drink.idDrink) && (
            <Link to={ `/bebidas/${drink.idDrink}/in-progress` }>
              <button
                className="start-recipe-btn btn btn-block btn-success fixed-bottom"
                data-testid="start-recipe-btn"
                type="button"
                onClick={ () => startRecipe(drink.idDrink) }
              >
                {!startedRecipes
                  ? 'Iniciar Receita'
                  : verifyState(drink.idDrink)}
              </button>
            </Link>
          )}
        </div>
      ))}
    </section>
  );
}

DetalhesBebida.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default DetalhesBebida;
