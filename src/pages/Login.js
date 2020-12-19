import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipeContext from '../context/RecipeContext';

export default function Login() {
  const {
    setLoginEmail,
    setLoginPassword,
  } = useContext(RecipeContext);
  const [enableButton, setEnableButton] = useState(true);
  let passwordValid;
  let emailValid;
  function handleChange() {
    passwordValid = document.getElementById('login-password').value;
    emailValid = document.getElementById('login-email').value;
    const validation = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const six = 6;
    if (validation.test(emailValid) === true && passwordValid.length > six) {
      setEnableButton(false);
    } else {
      setEnableButton(true);
    }
  }

  const history = useHistory();

  function setLocalStorage() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    emailValid = document.getElementById('login-email').value;
    const jsonEmail = JSON.stringify({ email: emailValid });
    localStorage.setItem('user', jsonEmail);
  }

  function handleClick(e) {
    e.preventDefault();
    passwordValid = document.getElementById('login-password').value;
    emailValid = document.getElementById('login-email').value;
    setLoginEmail(emailValid);
    setLoginPassword(passwordValid);
    setLocalStorage();
    history.push('/comidas');
  }

  return (
    <div>
      <input
        type="email"
        data-testid="email-input"
        id="login-email"
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        id="login-password"
        onChange={ handleChange }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ enableButton }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </div>
  );
}
