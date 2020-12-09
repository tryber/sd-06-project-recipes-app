import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Context from '../context/Context';
import Logo from '../images/logo.svg';
import '../css/Login.css';

export default function Login() {
  const {
    login, setLogin, disabled, setDisabled,
  } = useContext(Context);

  const inputValidate = () => {
    const validEmail = (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).test(login.email);
    const min = 5;

    if (validEmail && login.password.length > min) {
      return setDisabled(false);
    }
    return setDisabled(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setLogin({ ...login, [name]: value });
    inputValidate();
  };

  const handleSubmit = () => {
    const user = {
      email: login.email,
    };

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify(user));
    setLogin({ ...login, redirect: true });
  };
  return (
    <div className="content-login">
      {login.redirect ? <Redirect to="/comidas" /> : null}
      <img src={ Logo } alt="Logo" />
      <label htmlFor="email">
        E-mail:
        <input
          type="email"
          name="email"
          id="email"
          data-testid="email-input"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <label htmlFor="senha">
        Senha:
        <input
          type="password"
          name="password"
          id="senha"
          data-testid="password-input"
          onChange={ (e) => handleChange(e) }
        />
      </label>
      <button
        type="button"
        disabled={ disabled }
        data-testid="login-submit-btn"
        onClick={ () => handleSubmit() }
      >
        Entrar
      </button>
    </div>
  );
}
