import React, { useState, useEffect } from 'react';
import { setValueUser, cocktailsToken, mealsToken } from '../../services/localStorage';
import { logo } from '../../images';
import '../../fonts/font-awesome-4.7.0/css/font-awesome.min.css';
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
      <div className="login-aside">
        <div className="logo">
          <img alt="Logo" height="100%" width="300px" src={ logo } />
        </div>
        {/* <h3 className="page-title">Bem-vindo Chef!</h3> */}
        <form className="form-login">
          <div className="input-wrap">
            <input
              className="form-input"
              type="email"
              data-testid="email-input"
              placeholder="Email"
              id="email"
              onChange={ ({ target }) => setEmail(target.value) }
              required="required"
              value={ email }
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-envelope" aria-hidden="true" />
            </span>
          </div>
          <div className="input-wrap">
            <input
              className="form-input"
              type="password"
              data-testid="password-input"
              placeholder="Digite sua senha"
              id="senha"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
              required="required"
            />
            <span className="focus-input100" />
            <span className="symbol-input100">
              <i className="fa fa-lock" aria-hidden="true" />
            </span>
          </div>
          <div className="div-Button">
            <button
              type="button"
              data-testid="login-submit-btn"
              className="button-login"
              disabled={ isDisabled }
              onClick={ () => handleRedirect() }
            >
              Entrar no aplicativo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
