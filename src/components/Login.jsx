import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipesAppContext from '../hooks/RecipesAppContext';
import { saveState } from '../services/localStorage';

function Login() {
  const {
    setEmail,
    setPassword,
    email,
    password,
  } = useContext(RecipesAppContext);

  const isEmail = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const { value } = e.target;
    if (emailRegex.test(value)) {
      setEmail(value);
    } else {
      setEmail('');
    }
  };

  const isPassword = (e) => {
    const { value } = e.target;
    const minimumLength = 6;
    if (value.length > minimumLength) {
      setPassword(value);
    } else {
      setPassword('');
    }
  };

  const saveToken = () => {
    saveState('mealsToken', 1);
    saveState('cocktailsToken', 1);
    saveState('user', { email });
  };

  return (
    <form>
      <h2>Login</h2>
      <input type="email" data-testid="email-input" onChange={ isEmail } />
      <input type="password" data-testid="password-input" onChange={ isPassword } />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !email || !password }
          onClick={ saveToken }
        >
          Entrar
        </button>
      </Link>
    </form>
  );
}

export default Login;
