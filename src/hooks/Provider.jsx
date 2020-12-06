import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesAppContext from './RecipesAppContext';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchHeader, setSearchHeader] = useState(false);

  const [cardFood, setCardFood] = useState([]);
  const [cardDrink, setCardDrink] = useState([]);

  const contextValue = {
    email,
    setEmail,
    password,
    setPassword,
    searchHeader,
    setSearchHeader,
    cards: {
      cardFood,
      setCardFood,
      cardDrink,
      setCardDrink,
    },
  };

  return (
    <RecipesAppContext.Provider value={ contextValue }>
      {children}
    </RecipesAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
