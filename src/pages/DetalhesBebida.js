import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import { fetchDrinkAPI } from '../services/drinkAPI';
import { foodAPI } from '../services/foodAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import share from '../images/shareIcon.svg';
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
        <div className="detail-container" key={ index }>
          <div className="detail-card">
            <img
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              width="40%"
              className="rounded"
              alt="drinks"
            />
            <h3 data-testid="recipe-title">{drink.strDrink}</h3>
            <div className="detail-btn my-2">
              <button
                data-testid="share-btn"
                type="button"
                onClick={ copyToCB }
                className="btn"
              >
                <img src={ share } alt="share" />
              </button>
              {copied ? 'Link copiado!' : null}
              <button
                type="button"
                className="btn"
                onClick={ () => setFavorite(drink.idDrink) }
              >
                <img
                  data-testid="favorite-btn"
                  id="favorite-img"
                  src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
                  alt=""
                />
              </button>
            </div>
            <div className="container justify-content-center">
              <div className="text-center">
                <h5 data-testid="recipe-category">{ drink.strAlcoholic }</h5>
                <hr className="card-hr" />
                <h5>Ingredientes</h5>
                <div className="flex-wrap d-flex">
                  {getIngredients(drink, /strIngredient/).map((item, indx) => {
                    const measure = getIngredients(drink, /strMeasure/);
                    return (
                      <p
                        className="col-6"
                        key={ indx }
                        data-testid={ `${indx}-ingredient-name-and-measure` }
                      >
                        {`- ${item} - ${measure[indx]}`}
                      </p>
                    );
                  }) }
                </div>
                <h5 className="mt-3">Instructions</h5>
                <p
                  className="text-center text-justify"
                  data-testid="instructions"
                >
                  { drink.strInstructions }
                </p>
                <div className="row mb-3">
                  <div className="col">
                    <h5>Recomendadas</h5>
                    <div className="carousel">
                      {meals
                        .filter((_, indx) => indx < seis)
                        .map((food, i) => (
                          <div
                            key={ i }
                            data-testid={ `${i}-recomendation-card` }
                          >
                            <div className="card">
                              <img
                                src={ food.strMealThumb }
                                className="card-img-top"
                                alt={ food.strMeal }
                              />
                              <div className="card-body">
                                <p className="card-subtitle text-muted">
                                  {food.strAlcoholic}
                                </p>
                                <h5
                                  data-testid={ `${i}-recomendation-title` }
                                  className="card-title text-center"
                                >
                                  {food.strMeal}
                                </h5>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!doneRecipes.includes(drink.idDrink) && (
              <Link to={ `/bebidas/${drink.idDrink}/in-progress` }>
                <button
                  className="btn btn-block fixed-bottom"
                  style={ { background: '#7850B8', color: 'white' } }
                  data-testid="start-recipe-btn"
                  type="button"
                  onClick={ () => startRecipe(drink.idDrink) }
                >
                  {!startedRecipes
                    ? 'Iniciar Receita'
                    : verifyState(drink.idDrink)}
                </button>
              </Link>
            ) }
          </div>
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
