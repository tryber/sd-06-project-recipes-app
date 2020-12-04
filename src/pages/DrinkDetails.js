import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import useRequestFood from '../hooks/useRequestFood';
import fetchRecipes from '../services';
import FavoriteBtn from '../components/FavoriteBtn';
import ShareBtn from '../components/ShareBtn';

function DrinkDetails(props) {
  const { match: { params: { id } }, location: { pathname } } = props;
  const history = useHistory();
  const [requestDetails, setrequestDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [apiResponse, setFilter] = useRequestFood([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [display, setDisplay] = useState('block');
  const [inProgress, setInProgress] = useState(false);
  const textArea = useRef(null);
  const maxShow = 6;

  const copyToClipboard = (e) => {
    textArea.current.select();
    document.execCommand('copy');
    e.target.focus();
    setCopied(true);
  };

  const requestDetailsAPI = async () => {
    const response = await fetchRecipes(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
    setrequestDetails(response.drinks[0]);
  };

  const requestIngredients = () => {
    const twentyOne = 21;
    const zero = 0;
    const TheIngredients = [];
    for (let i = 1; i < twentyOne; i += 1) {
      if (requestDetails.length !== zero
        && requestDetails[`strIngredient${i}`] !== null
        && requestDetails[`strIngredient${i}`] !== ''
        && requestDetails[`strIngredient${i}`] !== undefined
      ) {
        TheIngredients
          .push(`${requestDetails[`strMeasure${i}`]}
            ${requestDetails[`strIngredient${i}`]}`);
      }
    }
    setIngredients(TheIngredients);
  };

  const handleInitRecipe = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const inProgressRecipes = readLocalStorage !== null ? readLocalStorage
      : {
        cocktails: {},
        meals: {},
      };
    if (!inProgressRecipes.cocktails[id]) {
      inProgressRecipes.cocktails[id] = [];
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    history.push(`/bebidas/${id}/in-progress`);
  };

  const removeIdLocalSotrage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = readLocalStorage.filter((element) => element.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
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
    const readInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (readInProgress !== null
      && readInProgress.cocktails !== null && readInProgress.cocktails[id]) {
      setInProgress(true);
    }
  };

  const setLocalStorage = () => {
    const readLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteRecipes = readLocalStorage !== null ? readLocalStorage : [];
    const newRecipe = { id: requestDetails.idDrink,
      type: 'bebida',
      area: '',
      category: requestDetails.strCategory,
      alcoholicOrNot: requestDetails.strAlcoholic,
      name: requestDetails.strDrink,
      image: requestDetails.strDrinkThumb,
    };
    favoriteRecipes.push(newRecipe);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
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

  const verifyButton = () => {
    const finished = JSON.parse(localStorage.getItem('doneRecipes'));
    if (finished !== null && finished.some((e) => e.id === id)) {
      setDisplay('none');
    }
  };

  useEffect(() => {
    requestIngredients();
  }, [requestDetails]);

  useEffect(() => {
    requestDetailsAPI();
    setFilter({ text: '', option: '', category: '' });
    getLocalStorage();
    verifyButton();
  }, []);
  return (
    <div data-testid="drink-details" className="food-details">
      <img
        className="pictureDetail"
        src={ requestDetails.strDrinkThumb }
        alt={ requestDetails.strDrink }
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{requestDetails.strDrink}</h1>
      <ShareBtn copy={ copyToClipboard } />
      <FavoriteBtn isFavorite={ isFavorite } changesFavorites={ changesFavorites } />
      {copied ? (<p className="link-copy">Link copiado!</p>) : ''}
      <p data-testid="recipe-category">{requestDetails.strAlcoholic}</p>
      {ingredients.map((ingredient, index) => (
        <div key={ index }>
          <ul>
            <li data-testid={ `${index}-ingredient-name-and-measure` }>{ingredient}</li>
          </ul>
        </div>
      ))}

      <p data-testid="instructions">{requestDetails.strInstructions}</p>
      <h3>Receitas Recomendadas</h3>
      <div className="recomended">
        {apiResponse.filter((e, index) => e && index < maxShow).map((meal, index) => (
          <div
            className="mini-card"
            key={ index }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>{meal.strMeal}</p>
            <img
              className="mini-picture"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
            />
          </div>))}
      </div>
      <button
        onClick={ handleInitRecipe }
        style={ { position: 'fixed', bottom: '0px', display } }
        data-testid="start-recipe-btn"
        type="button"
      >
        { inProgress ? ('Continuar Receita') : ('Iniciar Receita') }
      </button>
      <textarea
        className="text-area"
        ref={ textArea }
        value={ `http://localhost:3000${pathname}` }
      />
    </div>
  );
}

DrinkDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  location: PropTypes.func.isRequired,
};

export default DrinkDetails;
