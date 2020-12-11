import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passIsValid = /^.{7,}$/.test(password);

  const handleClick = () => {
    const objEmail = { email };
    localStorage.setItem('user', JSON.stringify(objEmail));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <form>
      <h1>Login</h1>
      <label htmlFor="email">
        Email:
        <input
          type="email"
          data-testid="email-input"
          id="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          id="password"
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>
      <Link to="/comidas">
        <button
          type="submit"
          disabled={ !emailIsValid || !passIsValid }
          data-testid="login-submit-btn"
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </form>
  );
}

export default Login;
