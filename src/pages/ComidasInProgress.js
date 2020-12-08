import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import ReceitasContext from '../context/ReceitasContext';
import Header from '../components/Header';
import { fetchFoodAPI } from '../services/foodAPI';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import share from '../images/shareIcon.svg';
import '../style/RecipesInProgress.css';
import load from '../images/load.png';
import '../style/Loading.css';

function ComidasInProgress(props) {
  const { fetchById, doneRecipes, setFetchById } = useContext(ReceitasContext);

  const {
    match: {
      params: { id },
    },
  } = props;

  let array;
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [isFetching, setFetching] = useState(true);
  const recipesLocalStorage = JSON.parse(localStorage.getItem('recipes'));

  const verifyState = () => (
    !recipesLocalStorage[id] ? [] : recipesLocalStorage[id]
  );

  const [checkedIngredients, setCheckedIngredients] = useState(
    !recipesLocalStorage ? [] : verifyState(),
  );

  useEffect(() => {
    async function getFavorites() {
      const responseID = await fetchFoodAPI(id);

      setFetchById(responseID);

      const localStorageRecipes = JSON.parse(localStorage.getItem('recipes'));

      if (localStorageRecipes) {
        if (localStorageRecipes[id]) {
          setCheckedIngredients(localStorageRecipes[id]);
        }
      }

      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

      if (!favoriteRecipes || !favoriteRecipes.length) {
        setIsFavorite(false);
      } else if (favoriteRecipes.some((recipe) => recipe.id === id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }

      setFetching(false);
    }

    getFavorites();
  }, []);

  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify({ [id]: checkedIngredients }));
  }, [checkedIngredients]);

  const getIngredients = (obj, filter) => {
    const keys = [];

    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });

    array = keys;
    return keys;
  };

  const getMeasure = (obj, filter) => {
    const keys = [];

    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });
    return keys;
  };

  const copyToCB = () => {
    copy(`http://localhost:3000/comidas/${id}`);
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

  const handleClick = (index, item) => {
    const label = document.querySelectorAll('label')[index];
    if (label.classList.contains('ingredient-not-done')) {
      label.classList.remove('ingredient-not-done');
      label.classList.add('ingredient-done');
    } else {
      label.classList.remove('ingredient-done');
      label.classList.add('ingredient-not-done');
    }

    if (checkedIngredients.includes(item)) {
      const zero = 0;
      let position;
      checkedIngredients.forEach((name, i) => {
        if (name === item) {
          position = i;
        } else {
          return position;
        }
      });
      setCheckedIngredients([
        ...checkedIngredients.slice(zero, position),
        ...checkedIngredients.slice(position + 1, checkedIngredients.length),
      ]);
    } else {
      setCheckedIngredients(checkedIngredients.concat(item));
    }
  };

  const handleDoneRecipes = () => {
    const recipesDone = JSON.parse(localStorage.getItem('doneRecipes'));

    const today = new Date();
    const date = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const dateTime = `${date} ${time}`;

    const {
      idMeal,
      strArea,
      strCategory,
      strMeal,
      strMealThumb,
      strTags,
    } = fetchById[0];

    if (!recipesDone) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          {
            id: idMeal,
            type: 'comida',
            area: strArea,
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
            doneDate: dateTime,
            tags: strTags ? strTags.split(',') : [],
          },
        ]),
      );
    } else if (!recipesDone.some((item) => item.id === idMeal)) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          ...recipesDone,
          {
            id: idMeal,
            type: 'comida',
            area: strArea,
            category: strCategory,
            alcoholicOrNot: '',
            name: strMeal,
            image: strMealThumb,
            doneDate: dateTime,
            tags: strTags ? strTags.split(',') : [],
          },
        ]),
      );
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
        <div className="justify-content-center" key={ index }>
          <div className="detail-card">
            <img
              data-testid="recipe-photo"
              src={ meal.strMealThumb }
              width="40%"
              alt="recipe"
              className="rounded"
            />
            <h3 data-testid="recipe-title">{meal.strMeal}</h3>
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
                onClick={ () => setFavorite(meal.idMeal) }
                className="btn"
              >
                <img
                  data-testid="favorite-btn"
                  id="favorite-img"
                  src={ !isFavorite ? whiteHeartIcon : blackHeartIcon }
                  alt=""
                />
              </button>
            </div>
            <h5 data-testid="recipe-category">{meal.strCategory}</h5>
            <ul id="ingredient-step">
              {getIngredients(meal, /strIngredient/).map((item, indx) => {
                const measure = getMeasure(meal, /strMeasure/);
                return (
                  <li
                    key={ indx }
                    id={ indx }
                    data-testid={ `${indx}-ingredient-step` }
                  >
                    <label
                      htmlFor={ `${indx}-meal` }
                      id={ item }
                      className={
                        checkedIngredients.includes(item)
                          ? 'ingredient-done'
                          : 'ingredient-not-done'
                      }
                    >
                      <input
                        type="checkbox"
                        id={ `${indx}-meal` }
                        checked={ checkedIngredients.includes(item) }
                        onClick={ () => handleClick(indx, item) }
                      />
                      {`${item} - ${measure[indx]}`}
                    </label>
                  </li>
                );
              })}
            </ul>
            <p
              data-testid="instructions"
              className="text-justify"
            >
              <div>
                {meal.strInstructions.split(/[1-9]+\./i).map((inst, i) => (
                  <p key={ `${i}-description` }>{`${i + 1} - ${inst}`}</p>
                ))}
              </div>
            </p>
            {!doneRecipes.includes(meal.idMeal) && (
              <Link to="/receitas-feitas">
                <button
                  className="btn btn-block fixed-bottom"
                  style={ { background: '#7850B8', color: 'white' } }
                  data-testid="finish-recipe-btn"
                  type="button"
                  disabled={ array.length !== checkedIngredients.length }
                  onClick={ handleDoneRecipes }
                >
                  Finalizar Receita!
                </button>
              </Link>
            ) }
          </div>
        </div>
      ))}
    </section>
  );
}

ComidasInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default ComidasInProgress;
