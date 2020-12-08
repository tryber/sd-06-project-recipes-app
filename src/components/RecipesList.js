import React from 'react';
import { Redirect } from 'react-router-dom';
import RecipeCard from './RecipeCard';
import findMatchInKeys from '../helpers/assets';

export default function RecipesList(props) {
  const { pathname,
    recipes, title, recipeConfig, isLoading, filter } = props;
  console.log('filterActive', filter[title],
    title, recipeConfig, isLoading, 'recipe', recipes);

  const renderRecipesResults = () => {
    const maxRecipesNumber = 12;
    console.log(recipes);
    if (recipes && recipes.length > 1) {
      return (
        recipes.filter((_recipe, index) => index < maxRecipesNumber)
          .map((recipe, index) => (<RecipeCard
            pathname={ pathname }
            recipe={ recipe }
            key={ recipe[findMatchInKeys('id', recipe)] }
            id={ recipe[findMatchInKeys('id', recipe)] }
            recipeIndex={ index }
          />))
      );
    }
  };

  const renderRedirectToSingleResult = () => {
    const results = recipes;
    const recipe = results[0];
    if (recipes.length === 1 && !filter[title]) {
      const id = findMatchInKeys('id', recipe);
      if (title === 'Comidas' || title === 'Bebidas') {
        return <Redirect to={ `${title.toLowerCase()}/${recipe[id]}` } />;
      }
      return <Redirect to={ `comidas/${recipe[id]}` } replace />;
    }
    if (recipes.length === 1) {
      return (
        <RecipeCard
          pathname={ pathname }
          recipe={ recipe }
          recipeIndex={ 0 }
          id={ recipe[findMatchInKeys('id', recipe)] }
        />);
    }
  };

  const renderSearchResults = () => (
    <>
      {renderRedirectToSingleResult()}
      {renderRecipesResults()}
    </>

  );

  const render = () => {
    const zero = 0;
    if (!isLoading && recipes && recipes.length > zero) {
      return renderSearchResults();
    }
    return <p>is loading</p>;
  };

  return render();
}
