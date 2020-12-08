import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import tryLogo from '../images/logo-try.png';
import foodLogo from '../images/logo-food.png';
import '../css/Login.css';

function Login() {
  const [localState, setLocalState] = useState({
    email: '',
    password: '',
    isDisabled: true,
  });
  const { email, password, isDisabled } = localState;
  const onChange = ({ target }) => {
    const { value, name } = target;
    setLocalState({
      ...localState,
      [name]: value,
    });
  };
  const onClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage
      .setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
    localStorage
      .setItem('favoriteRecipes', JSON.stringify([]));
    localStorage
      .setItem('doneRecipes', JSON.stringify([]));
  };

  const validateLoginInfo = () => {
    const minLength = 0;
    const minPassChar = 6;
    const emailExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validated = password.length > minPassChar
      && password.length !== minLength
      && emailExp.test(email);
    if (validated) {
      setLocalState({
        ...localState,
        isDisabled: false,
      });
    } else {
      setLocalState({
        ...localState,
        isDisabled: true,
      });
    }
  };

  useEffect(() => {
    validateLoginInfo();
  }, [email, password, isDisabled]);

  return (
    <div className="Login-body">
      <div className="bg"></div>
      <div className="bg bg2"></div>
      <div className="bg bg3"></div>
      <div className="Login-logo">
        <img src={ tryLogo } alt="logo" className="try-logo" />
        <img src={ foodLogo } alt="logo" className="food-logo" />
      </div>
      <form className="Login-form">
        <label htmlFor="email-input">
          <input
            data-testid="email-input"
            id="email-input"
            name="email"
            onChange={ onChange }
            placeholder="E-mail"
            type="text"
            value={ email }
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="password-input"
            id="password-input"
            name="password"
            onChange={ onChange }
            placeholder="Password"
            type="password"
            value={ password }
          />
        </label>
        <Link
          to="/comidas"
          className="link-food"
        >
          <button
            data-testid="login-submit-btn"
            className="btn-login"
            disabled={ isDisabled }
            onClick={ onClick }
            type="button"
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
