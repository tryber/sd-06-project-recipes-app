import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../App.css';
import Context from '../context/Context';
import Cards from '../components/Cards';
// import Checkbox from '../components/Checkbox';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails(props) {
  const {
    getMealDetail,
    getDrinkDetail,
    getRecommendedDrink,
    getRecommendedMeal,
    favorite,
    isFavorite,
    heart,
    setHeart,
    share,
    copied,
    details,
    recommended,
  } = useContext(Context);
  const { match: { path, params, url } } = props;
  const [checked, setChecked] = useState([]);
  const isFood = url.includes('comidas');

  const ZERO = 0;
  const SIX = 6;
  const SLICE = -12;

  useEffect(() => {
    if (path.includes('comidas')) {
      getMealDetail(params.id);
      getRecommendedDrink();
    } else {
      getDrinkDetail(params.id);
      getRecommendedMeal();
    }
    isFavorite(params.id);
    const local = JSON.parse(localStorage.getItem('inProgressRecipe'))
    if (isFood) {
      !local.food[params.id] ?
        localStorage.setItem('inProgressRecipe',
          JSON.stringify({ ...local, food: { ...local.food, [params.id] : [] } }))
        : setChecked(local.food[params.id]);
    } else {
      !local.drink[params.id] ?
        localStorage.setItem('inProgressRecipe',
          JSON.stringify({ ...local, drink: { ...local.drink, [params.id] : [] } }))
        : setChecked(local.drink[params.id]);
    }
  }, [params.id]);

  const isChecked = () => {
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipe'));
    //console.log(inProgress[params.id])
    let newRecipe = {};
    isFood ?
    newRecipe = {
      ...inProgress,
      food: {
        ...inProgress.food,
        [params.id]: [...checked],
      }
    } :
    newRecipe = {
      ...inProgress,
      drink: {
        ...inProgress.drink,
        [params.id]: [...checked],
      }
      
    };
    localStorage.setItem('inProgressRecipe', JSON.stringify(newRecipe));
  };

  useEffect(() => {
    isChecked();
  }, [checked]);

  const handleChecked = (ingredient) => {
    const notChecked = checked.indexOf(ingredient) < ZERO;
    let newChecked = [];

    if (notChecked) newChecked = [...checked, ingredient];
    else newChecked = checked.filter((check) => check !== ingredient);

    setChecked(newChecked);
    //localStorage.setItem('inProgressRecipe', newChecked);
  };

  const getIngredients = (obj, filter) => {
    const keys = [];
    Object.keys(obj).forEach((key) => {
      if (key && filter.test(key) && obj[key] !== '' && obj[key] !== null) {
        keys.push(obj[key]);
      }
    });
    return keys;
  };

  const getVideoId = (link) => link.split('=').pop();

  const favorited = (recipe) => {
    favorite(recipe, path, params.id);
    return heart === 'white' ? setHeart('black') : setHeart('white');
  };

  return (
    <div>
      {!details ? <p>LOADING...</p>
        : details.map((recipe) => (
          <div key={ recipe }>
            <img
              src={ path.includes('comidas') ? recipe.strMealThumb
                : recipe.strDrinkThumb }
              alt="recipe_image"
              className="recipeImage"
              data-testid="recipe-photo"
            />
            <h1 data-testid="recipe-title">
              {path.includes('comidas') ? recipe.strMeal : recipe.strDrink}
            </h1>
            <input
              type="image"
              src={ shareIcon }
              data-testid="share-btn"
              alt="share-icon"
              onClick={ () => (url.includes('in-progress')
                ? share(url.slice(ZERO, SLICE)) : share(url)) }
            />
            { copied ? <span>Link copiado!</span> : '' }
            <input
              type="image"
              src={ heart === 'white' ? whiteHeartIcon : blackHeartIcon }
              data-testid="favorite-btn"
              alt={ heart === 'white' ? 'whiteHeartIcon' : 'blackHeartIcon' }
              onClick={ () => favorited(recipe) }
            />
            <p data-testid="recipe-category">
              {path.includes('comidas') ? recipe.strCategory : recipe.strAlcoholic}
            </p>
            <h2>Ingredients</h2>
            {getIngredients(recipe, /strIngredient/).map((item, index) => {
              const measure = getIngredients(recipe, /strMeasure/);
              if (path.includes('in-progress')) {
                return (
                  <div data-testid="ingredient-step">
                    <label htmlFor={ `step-${index}` }>
                      <input
                        type="checkbox"
                        key={ index }
                        name={ item }
                        checked={ checked.some((ingredient) => ingredient === item) }
                        onChange={ ({ target }) => handleChecked(target.name) }
                        id={ `step-${index}` }
                        data-testid={ `${index}-ingredient-name-and-measure` }
                      />
                      {`- ${item} - ${measure[index]} `}
                    </label>
                  </div>
                );
              }
              return (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`- ${item} - ${measure[index]} `}
                </p>
              );
            })}
            <h2>Intructions</h2>
            <p data-testid="instructions">{ recipe.strInstructions }</p>
            {recipe.strVideo === null || recipe.strYoutube === null
              ? <p />
              : (
                <div>
                  <h2>Video</h2>
                  <iframe
                    src={ `https://www.youtube.com/embed/${getVideoId(recipe.strYoutube)}` }
                    title="Recipe_video"
                    data-testid="video"
                  />
                </div>
              )}
            <h2>Recomendadas</h2>
            <div className="recomendation">
              { !recommended ? <p>LOADING...</p>
                : recommended.slice(ZERO, SIX).map((info, index) => (
                  <Cards
                    key={ index }
                    recipe={ path.includes('comidas') ? 'bebidas' : 'comidas' }
                    info={ info }
                    index={ index }
                    recomendation
                  />
                ))}
            </div>
            {path.includes('in-progress')
              ? (
                <Link to="/receitas-feitas">
                  <button
                    type="button"
                    className="StartRecipe"
                    data-testid="finish-recipe-btn"
                  >
                    Finalizar Receita
                  </button>
                </Link>
              )
              : (
                <Link to={ `${url}/in-progress` }>
                  <button
                    type="button"
                    className="StartRecipe"
                    data-testid="start-recipe-btn"
                  >
                    Iniciar Receita
                  </button>
                </Link>
              )}

          </div>))}
    </div>
  );
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
    params: PropTypes.shape({ id: PropTypes.string }),
    url: PropTypes.string,
  }).isRequired,
};

export default RecipeDetails;
