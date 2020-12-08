import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import RevenueContext from '../context/RevenueContext';
import ShareIcon from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import RecommendedRecipes from '../components/RecommendedRecipes';

export default function RecipeDetails() {
  const { foods, setSearchParam, inProgress, setInProgress,
    searchParam, fetchApi, isLoading, localStorageDoneRecipes,
    localStorageFavorites, setLocalStorageFavorites,
    localStorageInProgress } = useContext(RevenueContext);

  const location = useLocation();
  const idRecipe = location.pathname.split('/');
  const [heartIcon, setheartIcon] = useState(WhiteHeartIcon);
  const [alertMsg, setAlertMsg] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  if (idRecipe[3] === 'in-progress' && inProgress === false)(setInProgress(!inProgress));
  if (idRecipe[1] === 'comidas') setSearchParam('Meal');
  if (idRecipe[1] === 'bebidas') setSearchParam('Drink');
  const linkRecipeAPI = (searchParam === 'Meal')
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe[2]}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe[2]}`;

  let actualRecipe = [];
  function checkLocalStorageFavorites() {
    if (searchParam === 'Meal') {
      actualRecipe = ([
        {
          id: foods[0].idMeal,
          type: 'comida',
          area: foods[0].strArea,
          category: foods[0].strCategory,
          alcoholicOrNot: '',
          name: foods[0].strMeal,
          image: foods[0].strMealThumb,
        },
      ]);
    }
    if (searchParam === 'Drink') {
      actualRecipe = ([
        {
          id: foods[0].idDrink,
          type: 'bebida',
          area: '',
          category: foods[0].strCategory,
          alcoholicOrNot: foods[0].strAlcoholic,
          name: foods[0].strDrink,
          image: foods[0].strDrinkThumb,
        },
      ]);
    }

    let isFavorite;
    if (localStorageFavorites !== null) {
      isFavorite = localStorageFavorites
        .find((favorite) => favorite.id === actualRecipe[0].id);
    }
    if (isFavorite !== undefined && heartIcon === WhiteHeartIcon) {
      setheartIcon(BlackHeartIcon);
    }
    if (isFavorite === undefined && heartIcon === BlackHeartIcon) {
      setheartIcon(WhiteHeartIcon);
    }

    return actualRecipe;
  }

  function getDateLocaleformat() {
    const date = new Date();
    const actualDate = date.toLocaleDateString();
    return actualDate;
  }

  function saveDoneRecipe() {
    actualRecipe[0].tags = foods[0].strTag ? foods[0].strTag : '';
    actualRecipe[0].doneDate = getDateLocaleformat();

    if (localStorageDoneRecipes) {
      const newLocalStorageDoneRecipes = localStorageDoneRecipes;
      newLocalStorageDoneRecipes.push(actualRecipe[0]);
      setLocalStorageFavorites(newLocalStorageDoneRecipes);
      localStorage
        .setItem('doneRecipes', JSON
          .stringify(localStorageDoneRecipes));
    }
  }

  function shareRecipeLink() {
    const URL = `http://localhost:3000/${idRecipe[1]}/${idRecipe[2]}`;
    navigator.clipboard.writeText(URL);
    const time = 3000;
    setAlertMsg(true);
    setTimeout(() => {
      setAlertMsg(false);
    }, time);
    // alert('Link copiado!');
  }

  function whiteToBlackHeart() {
    if (heartIcon === WhiteHeartIcon) {
      const newLocalStorageFavorites = localStorageFavorites;
      newLocalStorageFavorites.push(actualRecipe[0]);
      setLocalStorageFavorites(newLocalStorageFavorites);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify(localStorageFavorites));
      setheartIcon(BlackHeartIcon);
    } else {
      const newLocalStorageFavorites = localStorageFavorites;
      newLocalStorageFavorites
        .splice(localStorageFavorites
          .indexOf(localStorageFavorites
            .find((favorite) => favorite.id === actualRecipe[0].id)), 1);
      setLocalStorageFavorites(newLocalStorageFavorites);
      localStorage
        .setItem('favoriteRecipes', JSON
          .stringify(localStorageFavorites));
      setheartIcon(WhiteHeartIcon);
    }
  }

  function listContent() {
    const ingredientsMeasureArray = [];
    const VINTE = 20;
    for (let index = 1; index <= VINTE; index += 1) {
      if (foods[0][`strIngredient${index}`]) {
        let measureValue = foods[0][`strMeasure${index}`];
        if (!measureValue) measureValue = '';
        ingredientsMeasureArray
          .push(
            [foods[0][`strIngredient${index}`], measureValue],
          );
      }
    }
    return ingredientsMeasureArray;
  }

  function handleCheckbox({ target }, index) {
    // Carrega aas informações do localStorage in progress na variável localStorageInProgressAux
    let localStorageInProgressAux = JSON
      .parse(localStorage
        .getItem('inProgressRecipes'));
    // Se inProgressRecipes ainda não existir grava primeiro item, bebida ou comida
    if (!localStorageInProgressAux) {
      if (searchParam === 'Meal') {
        localStorageInProgressAux = {
          cocktails: {},
          meals: { [actualRecipe[0].id]: [index] },
        };
      }
      if (searchParam === 'Drink') {
        localStorageInProgressAux = {
          cocktails: { [actualRecipe[0].id]: [index] },
          meals: {},
        };
      }
      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(localStorageInProgressAux));

    // Se inProgressRecipes já existe e verifica se aquela receita já foi iniciada
    // Se a receita já foi iniciada inclui o ítem no array
    // Se a receita ainda não foi iniciada, inclui a receita e seu respectivo array de ítens
    } else {
      if (searchParam === 'Meal') {
        if (localStorageInProgressAux.meals[actualRecipe[0].id]) {
          if (target.checked === true) {
            localStorageInProgressAux.meals[actualRecipe[0].id].push(index);
          } else {
            localStorageInProgressAux.meals[actualRecipe[0].id]
              .splice(localStorageInProgressAux.meals[actualRecipe[0].id]
                .indexOf(index), 1);
          }
        } else {
          localStorageInProgressAux.meals[actualRecipe[0].id] = [index];
        }
      }

      if (searchParam === 'Drink') {
        if (localStorageInProgressAux.cocktails[actualRecipe[0].id]) {
          if (target.checked === true) {
            localStorageInProgressAux.cocktails[actualRecipe[0].id].push(index);
          } else {
            localStorageInProgressAux.cocktails[actualRecipe[0].id]
              .splice(localStorageInProgressAux.cocktails[actualRecipe[0].id]
                .indexOf(index), 1);
          }
        } else {
          localStorageInProgressAux.cocktails[actualRecipe[0].id] = [index];
        }
      }

      localStorage
        .setItem('inProgressRecipes', JSON
          .stringify(localStorageInProgressAux));

      setIsChecked(!isChecked);
    }
    return localStorageInProgressAux;
  }

  const finishButtonEnable = () => {
    const checkedLength = document
      .querySelectorAll('input[type=checkbox]:checked').length;
    const checkboxLength = document.querySelectorAll('input[type=checkbox]').length;
    if (checkedLength === checkboxLength) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    fetchApi(linkRecipeAPI);
  }, [searchParam]);

  useEffect(() => {}, [isChecked]);

  const render = () => {
    const ZERO = 0;
    if (foods.length > ZERO) {
      checkLocalStorageFavorites();
      let videoCode;
      let typeFood;

      const getInProgress = JSON
        .parse(localStorage
          .getItem('inProgressRecipes'));

      if (searchParam === 'Meal') {
        videoCode = (foods[0].strYoutube) ? foods[0].strYoutube.split('=') : undefined;
        typeFood = 'meals';
      } else {
        typeFood = 'cocktails';
      }
      const check = (index) => {
        if (getInProgress) {
          const getInProgressAux = getInProgress;
          if (getInProgressAux[typeFood][actualRecipe[0].id]) {
            return getInProgressAux[typeFood][actualRecipe[0].id]
              .includes(index);
          }
        }
        return false;
      };

      const checkProgress = () => {
        if (localStorageInProgress) {
          const localStorageInProgressAux = localStorageInProgress;
          if (localStorageInProgressAux[typeFood][actualRecipe[0].id]) {
            return 'Continuar Receita';
          }
        }
        return 'Iniciar Receita';
      };

      return (
        <Container>
          <img
            width="360px"
            data-testid="recipe-photo"
            src={ foods[0][`str${searchParam}Thumb`] }
            alt={ foods[0][`str${searchParam}`] }
          />
          <h1 data-testid="recipe-title">{ foods[0][`str${searchParam}`] }</h1>
          <div className="d-flex justify-content-around">
            <a href onClick={ () => shareRecipeLink() }>
              <img src={ ShareIcon } alt="Share Button" data-testid="share-btn" />
              {alertMsg && <span>Link copiado!</span>}
            </a>
            <a href onClick={ () => whiteToBlackHeart() }>
              <img src={ heartIcon } alt="Favorite Button" data-testid="favorite-btn" />
            </a>
          </div>
          <h6 data-testid="recipe-category">
            { searchParam === 'Meal' ? foods[0].strCategory : foods[0].strAlcoholic }
          </h6>
          { }
          <ul data-testid="0-recipe-card">
            { listContent().map((pairArray, index) => (

              inProgress === false
                ? (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {pairArray[0]}
                    { pairArray[1] ? ` - ${pairArray[1]}` : undefined }
                  </li>
                )
                : (
                  <div
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      checked={ check(index) }
                      className="lineThrough"
                      type="checkbox"
                      name={ index }
                      id={ index }
                      onChange={ (e) => {
                        handleCheckbox(e, index, pairArray, typeFood);
                      } }
                    />
                    {' '}
                    <label
                      className="lineThrough"
                      htmlFor={ index }
                    >
                      {pairArray[0] }
                      { pairArray[1] ? ` - ${pairArray[1]}` : undefined }
                    </label>
                  </div>
                )
            )) }
          </ul>
          <h4>INSTRUCTIONS: </h4>
          <p data-testid="instructions" className="text-justify">
            { foods[0].strInstructions }
          </p>
          { (videoCode) && (
            <>
              <h4>VIDEO: </h4>
              <iframe
                data-testid="video"
                className="width360"
                title="video"
                src={ `https://www.youtube.com/embed/${videoCode[1]}` }
                frameBorder="0"
                allow="accelerometer; autoplay;
            clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </>
          ) }
          <h4>RECOMENDED: </h4>
          <div className="width360">
            <RecommendedRecipes />
          </div>
          {(!localStorageDoneRecipes
            .map((e) => e.id)
            .find((e) => e === foods[0][`id${searchParam}`]))
          && (
            <div id="button-area">
              {inProgress === false
                ? (
                  <Link to={ `/${idRecipe[1]}/${idRecipe[2]}/in-progress` }>
                    <button
                      data-testid="start-recipe-btn"
                      className="start-recipe-btn"
                      type="button"
                      onClick={ () => setInProgress(!inProgress) }
                    >
                      {checkProgress()}
                    </button>
                  </Link>
                )
                : (
                  <Link to="/receitas-feitas">
                    <button
                      data-testid="finish-recipe-btn"
                      className="finish-recipe-btn"
                      type="button"
                      onClick={ () => saveDoneRecipe() }
                      disabled={ finishButtonEnable() }
                    >
                      Finalizar Receita
                    </button>
                  </Link>
                )}
            </div>
          )}
        </Container>
      );
    }
  };

  return (
    <div>
      {(isLoading) ? 'Loading...' : render()}
    </div>
  );
}
