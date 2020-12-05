import React, { useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useExplore } from '../../hooks/explore';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import getIngredientUrl from './utils/ingredientImageUrl';
import { useSearch } from '../../hooks/search';

function ExploreRecipes({ pageType }) {
  const { loadIngredients, ingredientsSearched, loadingIngredients } = useExplore();
  const { updateSearch } = useSearch();

  useEffect(() => {
    loadIngredients(pageType);
  }, []);

  const handleIngredientClick = useCallback((value) => {
    const option = 'ingredients';

    const search = { option, value };

    updateSearch(pageType, search);
  }, [pageType, updateSearch]);

  if (loadingIngredients) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <div className="explore-ingredients-page">
      <Header pageName="Explorar Ingredientes" />
      <Navbar />

      <div className="ingredients-container">
        {ingredientsSearched.map((ingredient, index) => (
          <Link
            to={ `/${pageType}` }
            onClick={ () => handleIngredientClick(ingredient) }
            data-testid={ `${index}-ingredient-card` }
            className="ingredient-card"
            key={ ingredient }
          >
            <img
              data-testid={ `${index}-card-img` }
              src={ getIngredientUrl(pageType, ingredient) }
              alt={ ingredient }
            />
            <strong data-testid={ `${index}-card-name` }>{ingredient}</strong>
          </Link>
        ))}
      </div>

    </div>
  );
}

ExploreRecipes.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default ExploreRecipes;
