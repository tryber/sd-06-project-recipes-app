import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';

function ReceitasProvider({ children }) {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [hidden, setHidden] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [searchInput, setSearchInput] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [searchType, setSearchType] = useState('ingredient');
  const [disabledProfileIcon, setDisabledProfileIcon] = useState(false);
  const [disabledSearchIcon, setDisabledSearchIcon] = useState(false);
  const [titleHeader, setTitleHeader] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [filterIngredient, setFilterIngredient] = useState('');
  const [filterRecipe, setFilterRecipe] = useState('');
  const [executeFilter, setExecuteFilter] = useState(false);
  const [filterDisabled, setFilterDisabled] = useState(false);
  const [recipeGlobal, setRecipeGlobal] = useState('');

  const [recipesDone, setRecipesDone] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState({
    cocktails: {},
    meals: {},
  });

  const keyProps = { meal: 'Meal', drink: 'Drink' };
  const keyURL = { meal: 'comidas', drink: 'bebidas' };
  const keyObj = { meal: 'meals', drink: 'drinks' };

  // RECOVER====================================================================
  const [isRecovering, setIsRecovering] = useState(true);

  // Mount
  // Adicionar 1 if dentro do Mount para cada estado global necessário
  useEffect(() => {
    // Receitas em progresso
    const recipesInProgLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (recipesInProgLS !== null && isRecovering) setRecipesInProgress(recipesInProgLS);

    // Receitas feitas
    const recipesDoneLS = JSON.parse(localStorage.getItem('doneRecipes'));
    if (recipesDoneLS !== null && isRecovering) setRecipesDone(recipesDoneLS);

    // Receitas favoritas
    const favoriteRecipesLS = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesLS !== null && isRecovering) setFavoriteRecipes(favoriteRecipesLS);

    setIsRecovering(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update
  // Replicar 1 Update para cada estado global necessário

  // Receitas em progresso
  useEffect(() => {
    if (!isRecovering) {
      localStorage.setItem('inProgressRecipes', JSON.stringify(recipesInProgress));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipesInProgress]);

  // Receitas feitas
  useEffect(() => {
    if (!isRecovering) {
      localStorage.setItem('doneRecipes', JSON.stringify(recipesDone));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipesDone]);

  // Receitas favoritas
  useEffect(() => {
    if (!isRecovering) {
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favoriteRecipes]);

  useEffect(() => {
    if (!isRecovering && !login) {
      localStorage.clear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [login]);

  // ===========================================================================

  function renderEmail(param) {
    return (
      <div>
        {param
          ? (
            <p data-testid="profile-email">{email}</p>
          )
          : (
            <h3 data-testid="profile-email">
              {JSON.parse(localStorage.getItem('user')).email}
            </h3>
          )}
      </div>
    );
  }

  const contextValue = {
    login,
    setLogin,
    email,
    setEmail,
    hidden,
    setHidden,
    searchType,
    setSearchType,
    recipes,
    setRecipes,
    disabledProfileIcon,
    setDisabledProfileIcon,
    disabledSearchIcon,
    setDisabledSearchIcon,
    titleHeader,
    setTitleHeader,
    showSearchBar,
    setShowSearchBar,
    searchInput,
    setSearchInput,
    isFetching,
    setIsFetching,
    filterRecipe,
    setFilterRecipe,
    filterIngredient,
    setFilterIngredient,
    executeFilter,
    setExecuteFilter,
    filterDisabled,
    setFilterDisabled,
    recipesDone,
    setRecipesDone,
    recipesInProgress,
    setRecipesInProgress,
    keyProps,
    keyObj,
    keyURL,
    renderEmail,
    favoriteRecipes,
    setFavoriteRecipes,
    isRecovering,
    recipeGlobal,
    setRecipeGlobal,
  };

  return (
    <ReceitasContext.Provider value={ contextValue }>
      {children}
    </ReceitasContext.Provider>
  );
}

ReceitasProvider.propTypes = {
  children: propTypes.node.isRequired,
};

export default ReceitasProvider;
