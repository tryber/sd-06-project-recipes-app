import React, {
  createContext, useCallback, useContext, useState,
} from 'react';
import PropTypes from 'prop-types';

const authContext = createContext();

function AuthProvider({ children }) {
  const [user, setUserData] = useState(() => {
    let previousUserData = JSON.parse(localStorage.getItem('user'));

    const registeredUser = JSON.parse(localStorage.getItem('userNames')) || {};

    if (previousUserData) {
      const userName = registeredUser[previousUserData.email];

      if (userName) {
        previousUserData = { ...previousUserData, name: userName };
      }

      return previousUserData;
    }

    return {};
  });

  const [userToken, setUserToken] = useState(() => {
    const existentMealsToken = localStorage.getItem('mealsToken');

    if (existentMealsToken) {
      return existentMealsToken;
    }

    return '1';
  });

  const signIn = useCallback(({ email }) => {
    const userDataToPersist = { email };
    const AUTH_TOKEN = '1';

    setUserData(userDataToPersist);
    setUserToken(AUTH_TOKEN);

    localStorage.setItem('user', JSON.stringify(userDataToPersist));
    localStorage.setItem('mealsToken', AUTH_TOKEN);
    localStorage.setItem('cocktailsToken', AUTH_TOKEN);
  }, []);

  const signOut = useCallback(() => {
    setUserData({});

    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
  }, []);

  return (
    <authContext.Provider
      value={ {
        user, userToken, signIn, signOut,
      } }
    >
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error('You must use this hook within its provider');
  }

  return context;
}

export { AuthProvider, useAuth };

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
};
