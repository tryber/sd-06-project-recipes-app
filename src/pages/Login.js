import React, { useContext } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Context
import RecipesContext from '../context/RecipesContext';

export default function Login(props) {
  const {
    login,
    setLogin,
    isValid,
    setValid,
  } = useContext(RecipesContext);

  function validadeInputs() {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const magicNumber = 6;
    if (regex.test(login.email) && login.password.length >= magicNumber) {
      return setValid(false);
    }
    return setValid(true);
  }

  const handleInput = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
    validadeInputs();
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    props.history.push('/comidas');
  };

  return (
    <div>
      <input
        type="email"
        name="email"
        data-testid="email-input"
        onChange={ handleInput }
      />
      <input
        type="password"
        name="password"
        data-testid="password-input"
        onChange={ handleInput }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isValid }
        onClick={ handleClick }
      >
        Login
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
