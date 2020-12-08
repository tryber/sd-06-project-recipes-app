import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ContextAPI from './ContextAPI';

const RecipesProvider = ({ children }) => {
  const [email, setEmail] = useState([]);
  const [searchComponent, setSearchComponent] = useState(false);
  const [pageName, setPageName] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isRecipeFinished, setIsRecipeFinished] = useState(false);
  const [apiValueSearch, setApiValueSearch] = useState({
    foods: [],
    drinks: [],
  });
  const [detailsInfo, setDetailsInfo] = useState({
    foods: {},
    drinks: {},
  });

  const contextState = {
    email,
    setEmail,
    searchComponent,
    setSearchComponent,
    apiValueSearch,
    setApiValueSearch,
    pageName,
    setPageName,
    categories,
    setCategories,
    detailsInfo,
    setDetailsInfo,
    isRecipeFinished,
    setIsRecipeFinished,
  };

  return (
    <ContextAPI.Provider value={ contextState }>
      { children }
    </ContextAPI.Provider>
  );
};

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
