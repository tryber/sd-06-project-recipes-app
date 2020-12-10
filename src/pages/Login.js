import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import RevenueContext from '../context/RevenueContext';

export default function Login() {
  const { email, setEmail } = useContext(RevenueContext);
  const { password, setPassword } = useContext(RevenueContext);
  const [disable, setDisable] = useState(true);

  const loginCheck = () => {
    const checkUser = JSON.parse(localStorage.getItem('user'));
    console.log(checkUser);
  };

  const inputValidate = () => {
    const validEmail = (/\S+@\S+\.\S+/).test(email);
    const validPassword = (password && (/.{6}/).test(password));

    if (validEmail && validPassword === true) {
      return setDisable(false);
    }
    return setDisable(true);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    inputValidate();
    loginCheck();
  };

  const setLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <div className="bg-login">
      <h1 className="font-app login-title">
        App
        <br />
        <span className="de-logo">de</span>
        <br />
        Receitas
      </h1>
      <form className="form-login">
        <label htmlFor="email">
          {/* E-mail: */}
          <input
            value={ email }
            name="email"
            type="email"
            data-testid="email-input"
            onChange={ (e) => handleChange(e) }
            placeholder="E-mail"
          />
        </label>
        <label htmlFor="password">
          {/* Password: */}
          <input
            value={ password }
            name="password"
            type="password"
            data-testid="password-input"
            onChange={ (e) => handleChange(e) }
            placeholder="Password"
          />
        </label>
        <Link to="/comidas">
          <button
            data-testid="login-submit-btn"
            disabled={ disable }
            type="button"
            onClick={ setLocalStorage }
            className="bt-login font-app"
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}
