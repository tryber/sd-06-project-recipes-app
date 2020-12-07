import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import splitPathname from '../utils/splitPathname';
import recipeDetailsProcessing from '../utils/recipeDetailsProcessing';
import checkRecipeInProgress from '../utils/checkRecipeInProgress';
import checkSavedRecipe from '../utils/checkSavedRecipe';
import checkFavoriteRecipe from '../utils/checkFavoriteRecipe';
import DetailAndProgressBody from '../components/DetailAndProgressBody';
import inProgressContext from '../contexts/inProgressContext';
import formatDoneRecipe from '../utils/formatDoneRecipe';

function ReceitaProgresso(
  { location: { pathname } },
) {
  const [path, id, page] = splitPathname(pathname);
  const [recipe, setRecipe] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [wasStarted, setWasStarted] = useState(false);
  const [wasCopied, setWasCopied] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const buttonsProps = {
    path,
    id,
    isFav,
    wasCopied,
    setIsFav,
    setWasCopied,
  };

  useEffect(() => {
    recipeDetailsProcessing(id, path, setRecipe);
  }, []);

  useEffect(() => {
    checkSavedRecipe(recipe, setDisableButton);
    checkRecipeInProgress(path, recipe, setWasStarted, wasStarted);
    setIsFav(checkFavoriteRecipe(id));
  }, [recipe]);

  const context = {
    disableButton,
    setDisableButton,
  };

  function handleButtonClick() {
    const savedRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
    const formattedRecipe = formatDoneRecipe(recipe, path);
    savedRecipes.push(formattedRecipe);
    localStorage.setItem('doneRecipes', JSON.stringify(savedRecipes));
    setShouldRedirect(true);
  }

  return (
    <div>
      { shouldRedirect && <Redirect to="/receitas-feitas" /> }
      <inProgressContext.Provider value={ context }>
        <main>
          <DetailAndProgressBody
            recipe={ recipe }
            buttonsProps={ buttonsProps }
            recommendations={ [] }
            page={ page }
          />
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="start-recipe-btn"
            disabled={ disableButton }
            onClick={ () => handleButtonClick() }
          >
            Finalizar Receita
          </button>
        </main>
      </inProgressContext.Provider>
    </div>
  );
}

ReceitaProgresso.propTypes = {
  pathname: PropTypes.string.isRequired,
  location: PropTypes.shape.isRequired,
};

export default ReceitaProgresso;
