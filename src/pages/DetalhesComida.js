import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import { drinkAPI } from '../services/drinkAPI';
import { fetchFoodAPI } from '../services/foodAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import share from '../images/shareIcon.svg';
import '../style/Detalhes.css';
import load from '../images/load.png';
import '../style/Loading.css';

function DetalhesComida(props) {
  const {
    drinks,
    setDrinks,
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
    async function fetchDrink() {
      const responseFoodsAPI = await drinkAPI();
      const responseID = await fetchFoodAPI(id);

      setDrinks(responseFoodsAPI);
      setFetchById(responseID);

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

    fetchDrink();
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
        meals: {
          [recipeName]: fetchById,
        },
      }),
    );

    if (!beganRecipes.includes(recipeName)) {
      setBeganRecipes([...beganRecipes, recipeName]);
    }
  };

  const verifyState = (idMeal) => {
    if (!startedRecipes.meals) {
      return 'Iniciar Receita';
    }
    if (!startedRecipes.meals[idMeal]) {
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
      idMeal,
      strArea,
      strCategory,
      strMeal,
      strMealThumb,
    } = fetchById[0];

    if (!favoriteRecipes) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([
          {
            id: idMeal,
            type: 'comida',
            area: strArea,
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
          },
        ]),
      );
    } else {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([
          ...favoriteRecipes,
          {
            id: idMeal,
            type: 'comida',
            area: '',
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
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
      <Header title="Detalhes Comidas" />
      {fetchById.map((meal, index) => (
        <div className="detail-container" key={ index }>
          <div className="detail-card">
            <img
              data-testid="recipe-photo"
              src={ meal.strMealThumb }
              width="40%"
              alt="recipe"
              className="rounded"
            />
            <h3 data-testid="recipe-title">{ meal.strMeal }</h3>
            <div className="detail-btn my-2">
              <button
                className="btn"
                data-testid="share-btn"
                type="button"
                onClick={ copyToCB }
              >
                <img src={ share } alt="" />
              </button>
              {copied ? 'Link copiado!' : null}
              <button
                className="btn"
                type="button"
                onClick={ () => setFavorite(meal.idMeal) }
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
                <h5 data-testid="recipe-category">{ meal.strCategory }</h5>
                <hr className="card-hr" />
                <h5>Ingredientes</h5>
                <div className="flex-wrap d-flex">
                  {getIngredients(meal, /strIngredient/).map((item, indx) => {
                    const measure = getIngredients(meal, /strMeasure/);
                    return (
                      <p
                        className="col-6"
                        key={ indx }
                        data-testid={ `${indx}-ingredient-name-and-measure` }
                      >
                        {`- ${item} - ${measure[indx]} `}
                      </p>
                    );
                  }) }
                </div>
                <h5 className="mt-3">Instructions</h5>
                <div
                  className="text-justify"
                  data-testid="instructions"
                >
                  {meal.strInstructions.split(/[1-9]+\./i).map((inst, i) => (
                    <p key={ i }>{`${i + 1} - ${inst}`}</p>
                  ))}
                </div>
                <iframe
                  data-testid="video"
                  src={ meal.strYoutube.replace('watch?v=', 'embed/') }
                  title="frame"
                />
                <div className="row mb-3">
                  <div className="col">
                    <h5>Recomendadas</h5>
                    <div className="carousel">
                      {drinks
                        .filter((_, indx) => indx < seis)
                        .map((drink, i) => (
                          <div
                            key={ i }
                            data-testid={ `${i}-recomendation-card` }
                          >
                            <div className="card">
                              <img
                                src={ drink.strDrinkThumb }
                                className="card-img-top"
                                alt={ drink.strDrink }
                              />
                              <div className="card-body">
                                <p className="card-subtitle text-muted">
                                  {drink.strAlcoholic}
                                </p>
                                <h5
                                  data-testid={ `${i}-recomendation-title` }
                                  className="card-title text-center fonte"
                                >
                                  {drink.strDrink}
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
            {!doneRecipes.includes(meal.idMeal) && (
              <Link to={ `/comidas/${meal.idMeal}/in-progress` }>
                <button
                  className="btn btn-block fixed-bottom"
                  style={ { background: '#7850B8', color: 'white' } }
                  data-testid="start-recipe-btn"
                  type="button"
                  onClick={ () => startRecipe(meal.idMeal) }
                >
                  {!startedRecipes ? 'Iniciar Receita' : verifyState(meal.idMeal)}
                </button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

DetalhesComida.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default DetalhesComida;
