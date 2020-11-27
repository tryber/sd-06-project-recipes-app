import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { foodDetails, drinkDetails, getDrinksApi, getMealsAPI } from '../../services/API';
import Context from '../../context/Context';
import './Details.css';

const Details = (props) => {
  const { details, setdetails } = useContext(Context);
  const { recomendations, setRecomendations } = useContext(Context);
  const { match } = props;
  const { params } = match;
  const { id } = params;
  const idDetails = id;
  const { path } = match;
  const pop = path;
  const RandomDetails = () => {
    if (pop === '/comidas/:id') {
      foodDetails(idDetails).then((data) => {
        setdetails(data[0]);
      });
      getMealsAPI().then((data) => {
        setRecomendations(data[0]);
      });
    } else {
      drinkDetails(idDetails).then((data) => {
        setdetails(data[0]);
      });
      getDrinksApi().then((data) => {
        setRecomendations(data[0]);
      });
    }
  };

  useEffect(() => {
    RandomDetails();
  }, []);

  function getUrl() {
    let url = '/comidas';
    if (details.idDrink) {
      url = '/bebidas';
    }
    return url;
  }

  return (
    <div>
      <img
        src={ details.strDrinkThumb || details.strMealThumb }
        data-testid="recipe-photo"
        alt={ details.strMeal || details.strDrink }
      />

      <h1
        data-testid="recipe-title"
      >
        { details.strDrink || details.strMeal }
      </h1>
      <button
        type="button"
        data-testid="share-btn"
      >
        share
      </button>

      <button
        type="button"
        data-testid="favorite-btn"
      >
        favorite
      </button>

      <div>
        <text
          data-testid="recipe-category"
        >
          { details.strAlcoholic }
          { details.strCategory }
        </text>
      </div>

      <h2>Ingredientes:</h2>
      <ul>
        {
          Object.keys(details)
            .filter((keys) => keys.includes('Ingredient'))
            .map((ingredient, index) => {
              if (details[ingredient] !== '' && details[ingredient] !== null) {
                const measure = Object.keys(details)
                  .filter((keys) => keys.includes('Measure'));
                const measureIndex = measure[index];
                return (
                  <li
                    key={ index }
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    { `${details[ingredient]} - ${details[measureIndex]} `}
                  </li>
                );
              }
              return '';
            })
        }
      </ul>

      <div>
        <text
          data-testid="instructions"
        >
          { details.strInstructions }
        </text>
      </div>
      <div data-testid="video">
        <video
          width="560"
          height="315"
          src={ details.strYoutube }
        >
          <track src="" kind="captions" />
        </video>
      </div>

      <div data-testid="0-recomendation-card">
        <p>
          recomendations
          {recomendations.idMeal}
        </p>
      </div>

      <button
        className="btn-start"
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => console.log(details)}
      >
        <Link to={ `${getUrl()}/${id}/in-progress` }>
          Start recipe
        </Link>
      </button>
    </div>
  );
};
Details.propTypes = {
  // props: PropTypes.shape().isRequired,
  id: PropTypes.shape().isRequired,
  path: PropTypes.shape().isRequired,
  match: PropTypes.shape().isRequired,
};

export default Details;
