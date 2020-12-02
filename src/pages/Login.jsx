import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';

export default function Login({ history }) {
  const [valid, setValid] = useState(true);
  const { email, setEmail } = useContext(Context);
  const [pass, setPass] = useState('');

  const validadeLogin = () => {
    const emailInput = document.getElementById('input-email');
    const password = document.getElementById('input-password');
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const six = 6;
    if (regex.test(emailInput.value) === true && password.value.length > six) {
      setValid(false);
    } else {
      setValid(true);
    }
  };

  const handleEmail = ({ target }) => {
    setEmail(target.value);
    const emailStorage = { email };
    localStorage.setItem('user', JSON.stringify(emailStorage));
    validadeLogin();
  };

  const handlePass = ({ target }) => {
    setPass(target.value);
    validadeLogin();
  };

  const handleClick = (e) => {
    e.preventDefault();
    history.push('/comidas');
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div className=" container-sm d-flex flex-column login align-items-center">
      <h1 className="mb-3 text-warning font-weight-bold">App de Receitas</h1>
      <label htmlFor="input-email">
        <input
          type="email"
          id="input-email"
          data-testid="email-input"
          onChange={ handleEmail }
          value={ email }
          className="form-control"
          placeholder="Email"
        />
      </label>
      <label htmlFor="input-password">
        <input
          type="password"
          id="input-password"
          data-testid="password-input"
          onChange={ handlePass }
          value={ pass }
          className="form-control"
          placeholder="Password"
        />
      </label>
      <button
        disabled={ valid }
        type="submit"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        className="btn btn-warning text-dark"
      >
        Entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
