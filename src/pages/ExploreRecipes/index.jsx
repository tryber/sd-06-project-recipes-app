import React, { useMemo, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { useSingleRecipe } from '../../hooks/singleRecipe';

function ExploreRecipes({ pageType }) {
  const isFoodPage = useMemo(() => (pageType === 'comidas'), [pageType]);

  const { loadRandomRecipe } = useSingleRecipe();
  const { push } = useHistory();

  const handleRandomClick = useCallback(async () => {
    const randomRecipeID = await loadRandomRecipe(pageType);

    if (!randomRecipeID) {
      alert('Ocorreu um erro na busca aleatória, tente novamente.');

      return;
    }

    const randomRecipeUrl = `/${pageType}/${randomRecipeID}`;

    push(randomRecipeUrl);
  }, [pageType, loadRandomRecipe, push]);

  return (
    <div className="explore-page">
      <Header pageName={ `Explorar ${pageType}` } />
      <Navbar />

      <Link
        to={ `/explorar/${pageType}/ingredientes` }
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>

      {isFoodPage && (
        <Link
          to={ `/explorar/${pageType}/area` }
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </Link>
      )}

      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ handleRandomClick }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

ExploreRecipes.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default ExploreRecipes;
