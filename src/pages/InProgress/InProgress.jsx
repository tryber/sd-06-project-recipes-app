import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMealsAPI, getDrinksApi } from '../../services/API';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import './InProgress.css';

const InProgress = () => {
  const [data, setData] = useState([]);
  const [checks, setChecks] = useState('0');
  const [toggleCheck, setToggleCheck] = useState(false);
  const [messageToggle, setMessageToggle] = useState(false);
  const [heartIcon, setHeartIcon] = useState('');

  const path = window.location.pathname.split('/');
  const recipeId = path[2];
  const recipeType = path[1];

  useEffect(() => {
    if (recipeType === 'comidas' && recipeId !== '') {
      getMealsAPI(recipeId, 'details').then((response) => {
        setData(response[0]);
      });
    } else if (recipeType === 'bebidas' && recipeId !== '') {
      getDrinksApi(recipeId, 'details').then((response) => {
        setData(response[0]);
      });
    } else {
      return undefined;
    }
  }, [recipeId, recipeType]);

  useEffect(() => {
    let isFav = false;
    const thisId = data.idMeal || data.idDrink;
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes) {
      isFav = favoriteRecipes.some((r) => r.id === thisId);
    }
    return isFav ? setHeartIcon(blackHeartIcon) : setHeartIcon(whiteHeartIcon);
  }, [data]);

  const showMessage = () => {
    const TWO_SECONDS = 2000;
    setMessageToggle(true);
    setTimeout(() => {
      setMessageToggle(false);
    }, TWO_SECONDS);
  };

  const copyUrlToClipboard = () => {
    const detailsPage = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(detailsPage).then(() => showMessage());
  };

  function ingredientsAmount() {
    const amountArray = [];
    Object.keys(data)
      .filter((key) => key.includes('Ingredient'))
      .map((ingredient) => {
        if (data[ingredient] !== '' && data[ingredient] !== null) {
          amountArray.push(data[ingredient]);
        }
        return undefined;
      });
    return amountArray;
  }

  function enableFinish() {
    let verify = true;
    if (checks === ingredientsAmount().length) {
      verify = false;
      return verify;
    }
    return verify;
  }

  const saveInProgress = (ingredient) => {
    const oldProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const thisId = data.idMeal || data.idDrink;
    const emptyProgress = {
      cocktails: {
        [thisId]: [],
      },
      meals: {
        [thisId]: [],
      },
    };

    if (data.idMeal && oldProgress) {
      const mealItems = (oldProgress.meals[thisId]) ? oldProgress.meals[thisId] : [];
      if (!mealItems.includes(ingredient)) {
        const mealProgress = {
          ...emptyProgress,
          meals: {
            [thisId]: [...mealItems, ingredient],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(mealProgress));
      } else {
        const updatedMealItems = mealItems.filter((m) => m !== ingredient);
        const mealProgress = {
          ...emptyProgress,
          meals: {
            [thisId]: [...updatedMealItems],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(mealProgress));
      }
    }

    if (data.idDrink && oldProgress) {
      const drinkItems = (oldProgress.cocktails[thisId])
        ? oldProgress.cocktails[thisId] : [];
      if (!drinkItems.includes(ingredient)) {
        const drinkProgress = {
          ...emptyProgress,
          cocktails: {
            [thisId]: [...drinkItems, ingredient],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(drinkProgress));
      } else {
        const updatedDrinkItems = drinkItems.filter((d) => d !== ingredient);
        const drinkProgress = {
          ...emptyProgress,
          cocktails: {
            [thisId]: [...updatedDrinkItems],
          },
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(drinkProgress));
      }
    }
  };

  function handleCheck(event, ingredient) {
    const { target } = event;
    target.classList.toggle('checked');
    const getChecks = document.querySelectorAll('.checked').length;
    setChecks(getChecks);
    if (target.className === 'checked') {
      saveInProgress(ingredient);
      setToggleCheck(!toggleCheck);
    }
  }

  function checkIfChecked(ingredient) {
    const oldProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const thisId = data.idMeal || data.idDrink;
    const emptyProgress = {
      cocktails: {
        [thisId]: [],
      },
      meals: {
        [thisId]: [],
      },
    };

    if (!oldProgress) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(emptyProgress));
    }

    const checkedIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const type = (recipeType === 'comidas') ? 'meals' : 'cocktails';
    if (checkedIngredients && checkedIngredients[type][recipeId]) {
      return (checkedIngredients[type][recipeId].includes(ingredient));
    }
    return false;
  }

  function buildTable() {
    return Object.keys(data)
      .filter((keys) => keys.includes('Ingredient'))
      .map((ingredient, index) => {
        if (data[ingredient] !== '' && data[ingredient] !== null) {
          const measure = Object.keys(data)
            .filter((keys) => keys.includes('Measure'));
          const measureIndex = measure[index];
          return (
            <li
              data-testid={ `${index}-ingredient-step` }
              htmlFor={ index }
              key={ index }
            >
              { `${data[ingredient]} - ${data[measureIndex]} `}
              <input
                type="checkbox"
                name={ index }
                value={ ingredient }
                checked={ checkIfChecked(data[ingredient]) }
                onChange={ (e) => handleCheck(e, data[ingredient]) }
              />
            </li>
          );
        }
        return '';
      });
  }

  function getRecipeValues(value) {
    const { idMeal, strAlcoholic } = data;

    switch (value) {
    case 'type':
      return (idMeal) ? 'comida' : 'bebida';
    case 'alcohol':
      return (strAlcoholic) ? 'Alcoholic' : '';
    default:
      return '';
    }
  }

  function handleFavorite() {
    const {
      idMeal,
      idDrink,
      strCategory: category,
      strMeal,
      strDrink,
      strArea,
      strMealThumb,
      strDrinkThumb,
      // doneDate,
      // strTags: tags,
    } = data;

    const newFavRecipe = {
      id: idMeal || idDrink,
      type: getRecipeValues('type'),
      area: strArea || '',
      category,
      alcoholicOrNot: getRecipeValues('alcohol'),
      name: strMeal || strDrink,
      image: strMealThumb || strDrinkThumb,
      // doneDate,
      // tags,
    };

    const oldFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let alreadyFavorited = false;
    if (oldFavRecipes) {
      alreadyFavorited = oldFavRecipes.find((r) => newFavRecipe.id === r.id);
    }
    if (oldFavRecipes && !alreadyFavorited) {
      const updatedRecipes = [...oldFavRecipes, newFavRecipe];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
      return setHeartIcon(blackHeartIcon);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([newFavRecipe]));
    return setHeartIcon(blackHeartIcon);
  }

  const unfavoriteRecipe = () => {
    const oldFavRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const thisId = data.idMeal || data.idDrink;
    if (oldFavRecipes) {
      const updatedRecipes = oldFavRecipes.filter((r) => r.id !== thisId);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedRecipes));
    }
    return setHeartIcon(whiteHeartIcon);
  };

  function toggleFavorite() {
    if (heartIcon === blackHeartIcon) {
      return unfavoriteRecipe();
    }
    return handleFavorite();
  }

  return (
    <div className="recipe-wrapper">
      <nav className="social">
        <button
          type="button"
          data-testid="favorite-btn"
          src={ heartIcon }
          onClick={ () => toggleFavorite() }
        >
          <img
            alt="heart icon"
            src={ heartIcon }
          />
        </button>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => copyUrlToClipboard() }
        >
          Share
        </button>
        {messageToggle && <p>Link copiado!</p>}
      </nav>
      <div className="recipe-info">
        <img
          className="recipe-thumb"
          data-testid="recipe-photo"
          src={ data.strMealThumb || data.strDrinkThumb }
          alt={ data.strMeal || data.strDrink }
        />
        <p
          className="recipe-title"
          data-testid="recipe-title"
        >
          {data.strMeal || data.strDrink}
        </p>
        <p
          className="recipe-category"
          data-testid="recipe-category"
        >
          {data.strCategory}
        </p>
      </div>
      <div className="recipe-steps">
        <div className="recipe-ingredients">
          Ingredients
          <ul>
            { buildTable() }
          </ul>
        </div>
        <p
          className="recipe-instructions"
          data-testid="instructions"
        >
          {data.strInstructions}
        </p>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => ingredientsAmount() }
            disabled={ enableFinish() }
          >
            Finish recipe
          </button>
        </Link>
      </div>
    </div>
  );
};

export default InProgress;
