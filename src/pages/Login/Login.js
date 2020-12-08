import React, { useState, useEffect } from 'react';
import { setValueUser, cocktailsToken, mealsToken } from '../../services/localStorage';
import './style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  useEffect(() => {
    const emailFormat = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(email);
    const six = 6;
    const minPasswordLength = password.length > six;
    if (emailFormat && minPasswordLength) {
      setIsDisabled(false);
    }
  }, [email, password]);

  const handlePath = () => {
    window.location.replace('http://localhost:3000/comidas');
  };

  const handleRedirect = () => {
    setValueUser('user', email);
    mealsToken(1);
    cocktailsToken(1);
    handlePath();
  };

  return (
    <div className="login-container">
      <aside className="login-aside">
        <h1 className="page-title">Bem-vindo chef!</h1>
        <form>
          <div className="form-group">
            <label
              htmlFor="email"
            >
              Email
              <input
                className="form-control"
                type="email"
                data-testid="email-input"
                placeholder="Digite seu email"
                id="email"
                onChange={ ({ target }) => setEmail(target.value) }
                required="required"
                value={ email }
              />
            </label>
          </div>
          <div className="form-group">
            <label
              htmlFor="senha"
            >
              Senha
              <input
                className="form-control"
                type="password"
                data-testid="password-input"
                placeholder="Digite sua senha"
                id="senha"
                value={ password }
                onChange={ ({ target }) => setPassword(target.value) }
                required="required"
              />
            </label>
          </div>
          <button
            type="button"
            data-testid="login-submit-btn"
            className="button"
            disabled={ isDisabled }
            onClick={ () => handleRedirect() }
          >
            Entrar no aplicativo
          </button>
        </form>
      </aside>
    </div>
  );
}

export default Login;
