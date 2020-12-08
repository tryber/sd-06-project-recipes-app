import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import findMatchInKeys from '../helpers/assets';

export default function RecipeCard({ recipe, recipeIndex, pathname, id }) {
  const [thumbKey, setthumbKey] = useState();
  const [name, setName] = useState();

  const getMatcherByUrl = () => {
    const nameByurl = {
      '/comidas': 'strMeal',
      '/explorar/comidas/area': 'strMeal',
      '/bebidas': 'strDrink',
    };
    return nameByurl[pathname];
  };

  useEffect(() => {
    setthumbKey(findMatchInKeys(/Thumb/, recipe));
    setName(getMatcherByUrl());
  }, []);

  const renderRecipeImg = () => (
    <img
      src={ recipe[thumbKey] }
      alt="recipe-img"
      className="main__page__recipe-img"
      data-testid={ `${recipeIndex}-card-img` }
    />
  );

  const renderRecipeTextData = () => (
    <p
      data-testid={ `${recipeIndex}-card-name` }
    >
      {recipe[name]}
    </p>
  );

  const renderRecipeDetails = () => (
    <>
      {renderRecipeImg()}
      {renderRecipeTextData()}
    </>
  );

  const render = () => {
    if (thumbKey) {
      if (pathname === '/comidas' || pathname === '/bebidas') {
        return (
          <Link to={ `${pathname}/${id}` } replace>
            <div
              className="main__page__recipe-card"
              data-testid={ `${recipeIndex}-recipe-card` }
            >
              {renderRecipeDetails()}
            </div>
          </Link>
        );
      } return (
        <Link to={ `/comidas/${id}` } replace>
          <div
            className="main__page__recipe-card"
            data-testid={ `${recipeIndex}-recipe-card` }
          >
            {renderRecipeDetails()}
          </div>
        </Link>

      );
    }
    return null;
  };

  return render();
}
