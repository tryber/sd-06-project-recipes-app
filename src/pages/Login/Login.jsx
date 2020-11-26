import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

function Login(props) {
  const [validation, setValidation] = useState(true);
  const { email, setemail } = useContext(Context);
  console.log(email);
  const [password, setPassword] = useState('');

  const loginValidation = () => {
    const emailResult = document.getElementById('input-email');
    const passwordResult = document.getElementById('input-password');
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const six = 6;
    if (regex.test(emailResult.value) === true && passwordResult.value.length > six) {
      setValidation(false);
    } else {
      setValidation(true);
    }
  };

  const handleClick = (e) => {
    const { history } = props;
    e.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  };

  const handleEmail = ({ target }) => {
    setemail(target.value);
    loginValidation();
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
    loginValidation();
  };
  return (
    <div>
      <input
        id="input-email"
        type="text"
        placeholder="inserir email"
        data-testid="email-input"
        onChange={ handleEmail }
        value={ email }
      />
      <input
        id="input-password"
        type="password"
        placeholder="inserir senha"
        data-testid="password-input"
        onChange={ handlePassword }
        value={ password }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleClick }
        disabled={ validation }
      >
        Entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
