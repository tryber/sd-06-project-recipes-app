import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function AppProvider({ children }) {
  const [header, setHeader] = useState({ page: '', search: true });
  const [options, setOptions] = useState({ text: '', option: '', category: '' });
  const [user, setUser] = useState({ email: '' });
  const [recipe, setRecipe] = useState('');

  const contextValue = {
    header,
    setHeader,
    options,
    setOptions,
    user,
    setUser,
    recipe,
    setRecipe,
  };
  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
