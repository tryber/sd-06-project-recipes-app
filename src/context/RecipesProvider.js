import React, { useState } from 'react';
import PropTypes from 'prop-types';

import RecipesContext from './RecipesContext';

import useMealApi from '../services/useMealApi';
import { SEARCH_ALL_MEALS } from '../services/mealsKeys';

function RecipesProvider({ children }) {
  const { data, isLoading, error } = useMealApi(SEARCH_ALL_MEALS);
  const [categorie, setCategorie] = useState('');

  const contextState = {
    data,
    isLoading,
    error,
    categorie,
    setCategorie,
  };

  return (
    <RecipesContext.Provider value={ contextState }>
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
