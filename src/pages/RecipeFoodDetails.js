import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import StartButton from '../components/StartButton';
import RecipesContext from '../context/RecipesAppContext';
import FavoriteButton from '../components/FavoriteButton';
import shareIcon from '../images/shareIcon.svg';
import '../Style/Details.css';

function RecipeFoodDetails(props) {
  const { match } = props;
  const { title } = props;
  const { id } = match.params;
  const { recipes, setRecipes } = useContext(RecipesContext);
  const [recomendation, setRecomendation] = useState([]);
  const [share, setShare] = useState(false);
  let arrIngredient = [];
  let arrMeasure = [];
  const ZERO = 0;
  const TWENTY = 20;
  const SEIS = 6;
  const API = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
  const positionButton = { position: 'fixed' };

  const fetchDetailRecipeFoodByID = async () => {
    const response = await fetch(`${API}${id}`);
    const json = await response.json();
    return setRecipes(json.meals);
  };

  const fetchRecomendationsDrinks = async () => {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const json = await response.json();
    return setRecomendation(json.drinks);
  };

  useEffect(() => {
    fetchDetailRecipeFoodByID();
    fetchRecomendationsDrinks();
  }, []);

  if (recipes.length !== ZERO) {
    const renderIngredients = () => {
      for (let i = 1; i <= TWENTY; i += 1) {
        if (recipes[0][`strIngredient${i}`]) {
          arrIngredient = arrIngredient.concat(recipes[0][`strIngredient${i}`]);
        } else {
          break;
        }
      }
    };

    const renderMeasure = () => {
      for (let i = 1; i <= TWENTY; i += 1) {
        if ((recipes[0][`strMeasure${i}`]).length > 1) {
          console.log(recipes[0][`strMeasure${i}`]);
          console.log((recipes[0][`strMeasure${i}`]).length);
          arrMeasure = arrMeasure.concat(recipes[0][`strMeasure${i}`]);
        } else {
          break;
        }
      }
    };

    const copyClip = async () => {
      const { location: { pathname } } = props;
      setShare(true);
      const url = `http://localhost:3000${pathname}`;
      await copy(url);
    };
    renderMeasure();
    renderIngredients();

    return (
      <div className="container-detail">
        <h1
          data-testid="recipe-title"
          className="title-detail"
        >
          {' '}
          { recipes[0].strMeal }
          {' '}
        </h1>
        <div className="image-container">
          <img
            data-testid="recipe-photo"
            src={ recipes[0].strMealThumb }
            alt={ recipes[0].strMeal }
            className="image-detail"
          />
          <div className="details-container">
            <FavoriteButton
              id={ id }
              title={ title }
              data-testid="favorite-btn"
            />
            <button
              type="button"
              className="btn btn-outline-dark-detail"
              onClick={ () => copyClip() }
              data-testid="share-btn"
            >
              <img
                src={ shareIcon }
                alt="Compartilhar"
              />
            </button>
            {share && <span>Link copiado!</span>}
          </div>
          <p data-testid="recipe-category">{recipes[0].strCategory}</p>
          <ul>
            {arrIngredient.map((ingredient, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { ingredient }
              </li>
            ))}
          </ul>
          <ul>
            {arrMeasure.map((measure, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                { measure }
              </li>
            ))}
          </ul>
          <div className="description-container">
            <p
              data-testid="instructions"
              className="description"
            >
              { recipes[0].strInstructions }
            </p>
          </div>
          <iframe
            title="Este é um titulo unico"
            data-testid="video"
            width="280"
            height="150"
            src={ recipes[0].strYoutube }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media"
            allowFullScreen
          />

          <div className="scrollmenu">
            <div>
              {recomendation.slice(ZERO, SEIS).map((element, index) => (
                <div key={ index } className="scrollmenu-child">
                  <img
                    data-testid={ `${index}-recomendation-card` }
                    src={ element.strDrinkThumb }
                    alt={ element.strDrink }
                  />
                  <p data-testid={ `${index}-recomendation-title` }>{ element.strDrink }</p>
                </div>
              ))}
            </div>
            <div style={ positionButton }>
              <StartButton id={ id } title={ title } />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <span>Ops...</span>;
}

RecipeFoodDetails.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default RecipeFoodDetails;
