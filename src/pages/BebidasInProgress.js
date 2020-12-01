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
import '../style/RecipesInProgress.css';

function BebidasInProgress(props) {
  const { setMeals, fetchById, setFetchById, doneRecipes } = useContext(ReceitasContext);

  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(true);
  const [isFetching, setFetching] = useState(true);

  const { match: { params: { id } } } = props;

  useEffect(() => {
    async function fetchFood() {
      const foodResponse = await foodAPI();
      const responseAPI = await fetchDrinkAPI(id);

      setMeals(foodResponse);
      setFetchById(responseAPI);

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

  const copyToCB = () => {
    const url = window.location.href;

    copy(url);
    setCopied(true);
  };

  const localVerify = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const {
      idDrink, strCategory, strAlcoholic, strDrink, strDrinkThumb,
    } = fetchById[0];

    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        {
          id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb,
        },
      ]));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
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
      ]));
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
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      ...favoriteRecipes.slice(zero, index),
      ...favoriteRecipes.slice(index + 1, favoriteRecipes.length),
    ]));

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

  const handleClick = (index) => {
    const label = document.querySelectorAll('label')[index];
    if (label.classList.contains('ingredient-not-done')) {
      label.classList.remove('ingredient-not-done');
      label.classList.add('ingredient-done');
    } else {
      label.classList.remove('ingredient-done');
      label.classList.add('ingredient-not-done');
    }
  };

  return ((isFetching)
    ? <div>carregando...</div>
    : (
      <section>
        <Header title="Detalhes Bebidas" />
        {
          fetchById.map((drink, index) => (
            <div key={ index }>
              <img data-testid="recipe-photo" src={ drink.strDrinkThumb } alt="" />
              <h2 data-testid="recipe-title">{drink.strDrink}</h2>
              <div>
                <button
                  data-testid="share-btn"
                  type="button"
                  onClick={ copyToCB }
                >
                  Compartilhar
                </button>
                {copied ? 'Link copiado!' : null}
              </div>
              <button
                type="button"
                onClick={ () => setFavorite(drink.idDrink) }
              >
                <img
                  data-testid="favorite-btn"
                  id="favorite-img"
                  src={ !isFavorite
                    ? whiteHeartIcon
                    : blackHeartIcon }
                  alt=""
                />
              </button>
              <p data-testid="recipe-category">{drink.strAlcoholic}</p>
              <ul>
                {getIngredients(drink, /strIngredient/).map((item, indx) => {
                  const measure = getIngredients(drink, /strMeasure/);
                  return (
                    <li
                      key={ indx }
                      data-testid={ `${indx}-ingredient-step` }
                    >
                      <label
                        htmlFor={ `${indx}-drink` }
                        className="ingredient-not-done"
                      >
                        <input
                          id={ `${indx}-drink` }
                          type="checkbox"
                          onClick={ () => handleClick(indx) }
                        />
                        {`${item} - ${measure[indx]}`}
                      </label>
                    </li>
                  );
                })}
              </ul>
              <p data-testid="instructions">{drink.strInstructions}</p>
              {!doneRecipes.includes(drink.idDrink) && (
                <Link to={ `/bebidas/${drink.idDrink}/in-progress` }>
                  <button
                    className="start-recipe-btn"
                    data-testid="finish-recipe-btn"
                    type="button"
                    // onClick={}
                  >
                    Finalizar Receita!
                  </button>
                </Link>
              )}
            </div>
          ))
        }
      </section>
    ));
}

BebidasInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
  }).isRequired,
};

export default BebidasInProgress;
