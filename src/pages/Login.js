import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logo } from '../images';
import '../style/Login.css';

function Login() {
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputValues, setInputValues] = useState({ email: '', password: '' });
  const { email, password } = inputValues;

  useEffect(() => {
    const checkEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const checkPassword = 6;
    if (password.length > checkPassword && checkEmail) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  const saveEmail = () => {
    localStorage.user = JSON.stringify({ email });
    localStorage.mealsToken = JSON.stringify(1);
    localStorage.cocktailsToken = JSON.stringify(1);
  };

  return (
    <div className="login">
      <form>
        <img
          src={ logo }
          alt="logo"
        />
        <input
          data-testid="email-input"
          type="text"
          name="email"
          placeholder="Digite seu e-mail"
          required
          value={ email }
          onChange={ ({ target }) => setInputValues(
            { ...inputValues, email: target.value },
          ) }
        />
        <br />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          placeholder="Digite sua senha"
          required
          value={ password }
          onChange={ ({ target }) => setInputValues(
            { ...inputValues, password: target.value },
          ) }
        />
        <br />
        <Link to="/comidas">
          <button
            data-testid="login-submit-btn"
            type="submit"
            disabled={ isDisabled }
            onClick={ saveEmail }
          >
            entrar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
