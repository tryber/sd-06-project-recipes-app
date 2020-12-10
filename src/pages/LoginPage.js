import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [user, setUser] = useState('');

  function handleEmail(e) {
    const typedEmail = e;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(typedEmail);
    setUser(typedEmail);
    return setEmail(regex);
  }

  function handlePassword(e) {
    const typedPassword = e;
    const minLength = 6;
    let validPass = false;
    if (typedPassword.length > minLength) {
      validPass = true;
    }
    return setPassword(validPass);
  }

  function handleClick() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user }));
  }

  return (
    <main>
      <input
        type="email"
        data-testid="email-input"
        required
        placeholder="Digite seu email"
        onChange={ ({ target }) => handleEmail(target.value) }
      />
      <input
        type="password"
        data-testid="password-input"
        required
        minLength="6"
        placeholder="Digite sua senha"
        onChange={ ({ target }) => handlePassword(target.value) }
      />
      <Link to="/comidas">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ !email + !password }
          onClick={ handleClick }
        >
          Entrar
        </button>
      </Link>
    </main>
  );
}

export default LoginPage;
