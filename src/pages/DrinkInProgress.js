import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';

function DrinkInProgress(props) {
  const { match: { params: { id } } } = props;
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [copied, setCopied] = useState('none');
  const now = new Date();
  let progressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const zero = 0;
  if (progressRecipes === null) {
    progressRecipes = {
      cocktails: { [id]: [] },
      meals: {},
    };
  }

  const setLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipes = readLocalStorage !== null ? readLocalStorage : [];
    const newRecipe = { id: recipe.idDrink,
      type: 'bebida',
      area: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };
    favoriteRecipes.push(newRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  const copyToClipboard = () => {
    setCopied('block');
    try {
      window.navigator.clipboard
        .writeText(window.location.toString()
          .substr(zero, window.location.toString().length - '/in-progress'.length));
      window.navigator.clipboard
        .writeText(window.location.toString()
          .substr(zero, window.location.toString().length - '/in-progress'.length));
    } catch (error) {
      console.log(error);
    }
  };

  const requestDetailsAPI = async () => {
    const response = await fetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    setRecipe(response.drinks[0]);
  };

  const verifyIngredientsChecked = () => {
    if (progressRecipes.cocktails[id].length === ingredients.length) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const requestIngredients = () => {
    const twentyOne = 21;
    const TheIngredients = [];
    for (let i = 1; i < twentyOne; i += 1) {
      if (recipe.length !== zero
          && recipe[`strIngredient${i}`] !== null
          && recipe[`strIngredient${i}`] !== ''
          && recipe[`strIngredient${i}`] !== undefined
      ) {
        const value = `${recipe[`strMeasure${i}`]}${recipe[`strIngredient${i}`]}`;
        const ingredient = {
          id: i,
          value,
          isChecked: progressRecipes.cocktails[id].some((e) => e === value),
        };
        TheIngredients.push(ingredient);
      }
    }
    setIngredients(TheIngredients);
  };

  const setLocalIngredients = () => {
    if (ingredients.length !== zero) {
      const checkeds = ingredients
        .filter((ingredient) => ingredient.isChecked === true)
        .map((each) => each.value);
      progressRecipes.cocktails[id] = checkeds;
      localStorage.setItem('inProgressRecipes', JSON.stringify(progressRecipes));
      verifyIngredientsChecked();
    }
  };

  const removeIdLocalSotrage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = readLocalStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    verifyIngredientsChecked();
  };

  const getLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idFavorito = readLocalStorage !== null
      ? readLocalStorage.find((element) => element.id === id)
      : undefined;
    if (idFavorito) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const handleCheckedIngredient = (event, index) => {
    const ingredientsChecked = [...ingredients];
    ingredientsChecked[index].isChecked = event.target.checked;
    setIngredients(ingredientsChecked);
    verifyIngredientsChecked();
  };

  const changesFavorites = () => {
    if (isFavorite) {
      removeIdLocalSotrage();
      setIsFavorite(!isFavorite);
    } else {
      setLocalStorage();
      setIsFavorite(!isFavorite);
    }
  };

  useEffect(() => {
    setLocalIngredients();
  }, [ingredients]);

  useEffect(() => {
    requestIngredients();
  }, [recipe]);

  useEffect(() => {
    requestDetailsAPI();
    getLocalStorage();
  }, []);

  const handleFinishedRecipe = (e) => {
    e.preventDefault();
    const finishedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const arrayFinished = finishedRecipes !== null ? finishedRecipes : [];
    arrayFinished.push({
      id,
      type: 'bebida',
      area: '',
      category: '',
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
      doneDate: `Feita em: ${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`,
      tags: '',
    });
    localStorage.setItem('doneRecipes', JSON.stringify(arrayFinished));
    history.push('/receitas-feitas');
  };

  return (
    <div>
      <form onSubmit={ handleFinishedRecipe }>
        <img
          className="picture"
          data-testid="recipe-photo"
          src={ recipe.strDrinkThumb }
          alt={ recipe.strDrink }
        />
        <h1 data-testid="recipe-title">{ recipe.strDrink }</h1>
        <ShareBtn copy={ copyToClipboard } />
        <FavoriteBtn isFavorite={ isFavorite } changesFavorites={ changesFavorites } />
        <span className="link-copy" style={ { display: copied } }>Link copiado!</span>
        <p data-testid="recipe-category">{ recipe.strCategory }</p>
        Ingredientes:
        {ingredients.map((ingredient, index) => (
          <label data-testid={ `${index}-ingredient-step` } key={ index }>
            { ingredient.value }
            { ingredient.isChecked ? (<input
              key={ ingredient.id }
              type="checkbox"
              value={ ingredient.value }
              checked
              onChange={ (ev) => handleCheckedIngredient(ev, index) }
            />) : (<input
              key={ ingredient.id }
              type="checkbox"
              value={ ingredient.value }
              onChange={ (ev) => handleCheckedIngredient(ev, index) }
            />)}
          </label>
        ))}
        <p data-testid="instructions">{ recipe.strInstructions }</p>
        { isDisabled
          ? (
            <button
              className="categ-buttons"
              data-testid="finish-recipe-btn"
              type="submit"
              disabled
            >
              Finalizar receita
            </button>)
          : (
            <button
              className="categ-buttons"
              data-testid="finish-recipe-btn"
              type="submit"
            >
              Finalizar receita
            </button>)}
      </form>
    </div>
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DrinkInProgress;
