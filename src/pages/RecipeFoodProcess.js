import React, { useEffect, useContext, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import RecipesContext from '../context/RecipesAppContext';
import { fetchMealById } from '../services';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../App.css';
import '../Style/Process.css';

function RecipeFoodProcess(props) {
  const { match } = props;
  const { id } = match.params;
  const ZERO = 0;
  const DOIS = 2;
  const VINTE = 20;
  const [arrIngredient, setArrIngredient] = useState([]);
  const [share, setShare] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false);
  const { recipes, setRecipes, isFavorite, setIsFavorite } = useContext(RecipesContext);

  const settingRecipeInProgress = async () => {
    const response = await fetchMealById(id);
    setRecipes(response);
  };

  const renderIngredients = () => {
    const arr = [];
    for (let i = 1; i <= VINTE; i += 1) {
      if (recipes[0][`strIngredient${i}`]) {
        arr.push({ ingredient: recipes[0][`strIngredient${i}`], checked: false });
      } else {
        break;
      }
    }
    setArrIngredient(arr);
  };

  const checkIfIngredientIsSave = () => {
    if ((!localStorage.inProgressRecipes)) {
      const initialStorage = {
        meals: {},
        cocktails: {},
      };
      localStorage.setItem('inProgressRecipes', JSON.stringify(initialStorage));
    }
  };

  const markIngredient = (index, event) => {
    let newStorage = {};
    const copyArrIngredient = [...arrIngredient];
    copyArrIngredient[index].checked = event.target.checked;
    setArrIngredient(copyArrIngredient);

    const response = arrIngredient.filter((item) => item.checked === true)
      .map((name) => name.ingredient);

    const oldStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

    if (Object.keys(oldStorage.meals).length === ZERO) {
      newStorage = {
        ...oldStorage,
        meals: {
          [id]: response,
        },
      };
    } else {
      newStorage = {
        ...oldStorage,
        meals: {
          ...oldStorage.meals,
          [id]: oldStorage.meals[id].concat(response),
        },
      };
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));

    // const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    // if (checkBoxes[index].checked === true) checkBoxes[index].setAttribute('checked', false);
    // if (checkBoxes[index].checked === false) checkBoxes[index].setAttribute('checked', true);
    // checkBoxes[index].setAttribute('checked', !checkBoxes[index].checked);
  };

  const createCheckBoxes = () => (
    arrIngredient.map((ingredient, index) => (
      <label
        htmlFor={ ingredient.ingredient }
        key={ index }
        data-testid={ `${index}-ingredient-step` }
        className={ ingredient.checked ? 'checked' : '' }
      >
        <input
          type="checkbox"
          id={ ingredient.ingredient }
          // checked={ ingredient.checked }
          onClick={ (e) => markIngredient(index, e) }
        />
        { ingredient.ingredient }
      </label>
    ))
  );

  const addToFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const recipe = {
      id,
      type: 'comida',
      area: recipes[0].strArea,
      category: recipes[0].strCategory,
      alcoholicOrNot: '',
      name: recipes[0].strMeal,
      image: recipes[0].strMealThumb,
    };

    const updatedFavoriteRecipes = [
      ...favoriteRecipes,
      recipe,
    ];

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
  };

  const removeFromFavoriteRecipes = () => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const updatedFavoriteRecipes = favoriteRecipes.filter((recipe) => (recipe.id !== id));

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
  };

  const handleFavorites = () => {
    if (isFavorite) removeFromFavoriteRecipes();
    else addToFavoriteRecipes();

    setIsFavorite(!isFavorite);
  };

  const copyClip = async () => {
    setShare(true);
    const url = `http://localhost:3000/comidas/${id}`;
    await copy(url);
  };

  const checkIfRecipeIsFavorite = () => {
    if (!localStorage.favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFavorite = favoriteRecipes.some((recipe) => (recipe.id === id));
    if (isRecipeFavorite) setIsFavorite(true);
  };

  const handleCheckBoxes = () => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]');
    if (checkBoxes.length > ZERO) {
      const savedRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (Object.keys(savedRecipe.meals).length !== ZERO) {
        checkBoxes.forEach((box) => {
          savedRecipe.meals[id].forEach((meal) => {
            console.log(box);
            if (box.id === meal) {
              console.log(box);
              box.setAttribute('checked', true);
            }
          });
        });
      }
    }
  };

  useEffect(() => {
    handleCheckBoxes();
  }, [createCheckBoxes]);

  useEffect(() => {
    settingRecipeInProgress();
    checkIfRecipeIsFavorite();
    checkIfIngredientIsSave();
  }, []);

  const handleEndRecipe = (recipeFinalized) => {
    console.log('o que é recipeFinaled:', recipeFinalized);
    const finalizedDate = new Date();
    const formatDate = `Finalizada em:
      ${finalizedDate.getDate()} /
      ${finalizedDate.getMonth() + 1} /
      ${finalizedDate.getFullYear()}`;

    if (!localStorage.doneRecipes) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    let tagEvaluate = '';
    if (recipeFinalized.strTags) {
      tagEvaluate = recipeFinalized.strTags.split(',').slice(ZERO, DOIS);
    }
    const recipe = {
      id: recipeFinalized.idMeal,
      type: 'comida',
      area: recipeFinalized.strArea || '',
      category: recipeFinalized.strCategory,
      alcoholicOrNot: recipeFinalized.strAlcoholic,
      name: recipeFinalized.strMeal,
      image: recipeFinalized.strMealThumb,
      doneDate: formatDate,
      tags: tagEvaluate,
    };
    const storageRecipe = JSON.parse(localStorage.getItem('doneRecipes'));
    const storageDoneSpread = [...storageRecipe, recipe];
    localStorage.setItem('doneRecipes', JSON.stringify(storageDoneSpread));
    return props.history.push('/receitas-feitas');
  };

  useEffect(() => {
    if (recipes.length > ZERO) renderIngredients();
  }, [recipes]);

  return (
    recipes.length > ZERO
      && (
        <div className="process-container">
          <h1
            data-testid="recipe-title"
            className="title-process"
          >
            { recipes[0].strMeal }
          </h1>
          <img
            data-testid="recipe-photo"
            src={ recipes[0].strMealThumb }
            alt="imagem"
            className="image-process"
          />
          <div>
            <button
              type="button"
              onClick={ handleFavorites }
              className="btn btn-outline-dark-process"
            >
              <img
                data-testid="favorite-btn"
                alt="Favoritar"
                src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
              />
            </button>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ () => copyClip() }
              className="btn btn-outline-dark-process"
            >
              <img
                src={ shareIcon }
                alt="compartilhar"
              />
            </button>
            {share && <span>Link copiado!</span>}
          </div>
          <h5
            data-testid="recipe-category"
          >
            {recipes[0].strCategory}
          </h5>
          <div className="checkbox">
            { createCheckBoxes() }
          </div>
          <div className="description-container-process">
            <p
              data-testid="instructions"
              className="description"
            >
              { recipes[0].strInstructions }
            </p>
          </div>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ () => handleEndRecipe(recipes[0]) }
            disabled={ !arrIngredient.every((item) => item.checked) }
            className="btn btn-process"
          >
            Finalizar Receita
          </button>
        </div>
      )
  );
}

RecipeFoodProcess.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeFoodProcess;
