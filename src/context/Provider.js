import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './Context';

function Provider({ children }) {
  const [login, setLogin] = useState({ email: '', password: '', redirect: false });
  const [disabled, setDisabled] = useState(true);
  const [items, setItems] = useState();
  const [filters, setFilters] = useState({
    searchText: '',
    searchType: 'name',
    category: '',
  });

  const contextValue = {
    login,
    setLogin,
    disabled,
    setDisabled,
    items,
    setItems,
    filters,
    setFilters,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      { children }
    </RecipesContext.Provider>
  );
}

export default Provider;

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
