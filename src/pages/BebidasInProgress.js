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
import load from '../images/load.png';
import '../style/RecipesInProgress.css';
import '../style/Loading.css';

function BebidasInProgress(props) {
  const { setMeals, fetchById, setFetchById, doneRecipes } = useContext(ReceitasContext);

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

  const storageVerify = () => (
    !recipesLocalStorage[id] ? [] : recipesLocalStorage[id]
  );

  const [checkedIngredients, setCheckedIngredients] = useState(
    !recipesLocalStorage ? [] : storageVerify(),
  );

  useEffect(() => {
    async function fetchFood() {
      const foodResponse = await foodAPI();
      const responseAPI = await fetchDrinkAPI(id);

      setMeals(foodResponse);
      setFetchById(responseAPI);

      const favoriteRecipes = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );

      const localStorageRecipes = JSON.parse(localStorage.getItem('recipes'));

      if (localStorageRecipes) {
        if (localStorageRecipes[id]) {
          setCheckedIngredients(localStorageRecipes[id]);
        }
      }

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

  const copyToCB = () => {
    copy(`http://localhost:3000/bebidas/${id}`);
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
      idDrink,
      strCategory,
      strAlcoholic,
      strDrink,
      strDrinkThumb,
      strTags,
    } = fetchById[0];

    if (!recipesDone) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          {
            id: idDrink,
            type: 'bebida',
            area: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb,
            doneDate: dateTime,
            tags: strTags ? strTags.split(',') : [],
          },
        ]),
      );
    } else if (!recipesDone.some((item) => item.id === idDrink)) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([
          ...recipesDone,
          {
            id: idDrink,
            type: 'bebida',
            area: '',
            category: strCategory,
            alcoholicOrNot: strAlcoholic,
            name: strDrink,
            image: strDrinkThumb,
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
      <Header title="Detalhes Bebidas" />
      {fetchById.map((drink, index) => (
        <div className="justify-content-center" key={ index }>
          <div className="detail-card">
            <img
              data-testid="recipe-photo"
              src={ drink.strDrinkThumb }
              alt="drink"
              width="40%"
              className="rounded"
            />
            <h3 data-testid="recipe-title">{drink.strDrink}</h3>
            <div className="detail-btn my-2">
              <button
                data-testid="share-btn"
                type="button"
                className="btn"
                onClick={ copyToCB }
              >
                <img src={ share } alt="share" />
              </button>
              {copied ? 'Link copiado!' : null}
            </div>
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
            <h5 data-testid="recipe-category">{drink.strAlcoholic}</h5>
            <ul>
              {getIngredients(drink, /strIngredient/).map((item, indx) => {
                const measure = getIngredients(drink, /strMeasure/);
                return (
                  <li key={ indx } data-testid={ `${indx}-ingredient-step` }>
                    <label
                      htmlFor={ `${indx}-drink` }
                      className={
                        checkedIngredients.includes(item)
                          ? 'ingredient-done'
                          : 'ingredient-not-done'
                      }
                    >
                      <input
                        type="checkbox"
                        id={ `${indx}-drink` }
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
              { drink.strInstructions }
            </p>
            {!doneRecipes.includes(drink.idDrink) && (
              <Link to="/receitas-feitas">
                <button
                  data-testid="finish-recipe-btn"
                  type="button"
                  className="btn btn-block fixed-bottom"
                  style={ { background: '#7850B8', color: 'white' } }
                  disabled={ array.length !== checkedIngredients.length }
                  onClick={ handleDoneRecipes }
                >
                  Finalizar Receita!
                </button>
              </Link>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}

BebidasInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default BebidasInProgress;
