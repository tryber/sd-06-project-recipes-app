import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';

function Login(props) {
  const [splash, setSplash] = useState(true);
  const [validation, setValidation] = useState(true);
  const { email, setemail } = useContext(Context);
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

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  const renderSplash = () => (<div className="splash" />);

  return splash ? renderSplash() : (
    <div>
      <div className="logo" />
      <div className="center">
        <label className="label" htmlFor="input-email">
          Email address
          <input
            className="input"
            id="input-email"
            type="text"
            data-testid="email-input"
            onChange={ handleEmail }
            value={ email }
          />
        </label>
        <label className="label" htmlFor="input-password">
          Password
          <input
            className="input pass"
            id="input-password"
            type="password"
            data-testid="password-input"
            onChange={ handlePassword }
            value={ password }
          />
        </label>
        <p className="forgot">Forgot password?</p>
        <button
          className="btn btn-big btn-active"
          type="button"
          data-testid="login-submit-btn"
          onClick={ handleClick }
          disabled={ validation }
        >
          Login
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default Login;
