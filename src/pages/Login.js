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
    localStorage.setItem('inProgressRecipe', JSON.stringify({ food: {}, drink: {} }));
  };

  return (
    <form className="form-login">
      <h1 className="form-title">Minhas receitas</h1>
      <h2>Login</h2>
      <label htmlFor="email" className="form-input">
        Email:
        <input
          type="email"
          data-testid="email-input"
          id="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>
      <label htmlFor="password" className="form-input">
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
          className="button"
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
