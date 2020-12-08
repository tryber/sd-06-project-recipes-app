import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { showSugestedDrinks, showSugestedFoods } from '../../services/aPI';

const Recomendations = () => {
  const [recomendedRecipes, setRecomendedRecipes] = useState();
  const path = window.location.href;
  const isFoodPage = path.includes('comidas');
  const numberOfRecomendationsShown = 6;

  const getRecomendedRecipes = async () => {
    const sugestions = isFoodPage
      ? await showSugestedDrinks() : await showSugestedFoods();

    setRecomendedRecipes(sugestions);
  };

  useEffect(() => {
    getRecomendedRecipes();
  }, []);

  const getDrinkRecomendations = () => (
    recomendedRecipes.drinks.map((drink, index) => {
      if (index < numberOfRecomendationsShown) {
        return (
          <div
            className="main-scroll"
            key={ drink.strDrink }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>
              {drink.strDrink}
            </p>
            <button type="button" className="button">
              <Link to={ `/bebidas/${drink.idDrink}` }>
                <img
                  className="img-recomendations"
                  width="200"
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </button>
          </div>
        );
      }
      return '';
    })
  );

  const getFoodRecomendations = () => (
    recomendedRecipes.meals.map((meal, index) => {
      if (index < numberOfRecomendationsShown) {
        return (
          <div
            className="main-scroll"
            key={ meal.strMeal }
            data-testid={ `${index}-recomendation-card` }
          >
            <p data-testid={ `${index}-recomendation-title` }>
              {meal.strMeal}
            </p>
            <button type="button" className="button">
              <Link to={ `/comidas/${meal.idMeal}` }>
                <img
                  className="img-recomendations"
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
              </Link>
            </button>
          </div>
        );
      }
      return '';
    })
  );

  return (
    <div>
      <div className="recomendation-span">
        <span>
          Recomendadas
        </span>
      </div>
      <div className="container-recomendations">
        { recomendedRecipes && (isFoodPage ? (getDrinkRecomendations())
          : (getFoodRecomendations()))}
      </div>
    </div>
  );
};

export default Recomendations;
