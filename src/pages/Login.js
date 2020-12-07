import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserAlt } from 'react-icons/fa';

function Login() {
  const [isValid, setIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleValidateFields = () => {
    const minLength = 5;
    const validateFields = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    && password.length > minLength;
    return validateFields;
  };

  const handleChangeEmail = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleChangePassword = ({ target: { value } }) => {
    setPassword(value);
    if (handleValidateFields()) setIsValid(true);
  };

  const setLocalStorage = () => {
    const user = { email };
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify(user));
  };

  useEffect(() => {
    document.body.style.backgroundColor = 'rgb(226, 226, 226)';
  }, []);

  return (
    <div className="login-form">
      <h2 className="text-center">Tompero</h2>
      <div className="form">
        <div className="avatar text-center">
          <FaUserAlt className="user-alt" />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ handleChangeEmail }
            placeholder="email"
            className="form-control input-lg"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ handleChangePassword }
            placeholder="senha"
            className="form-control input-lg"
          />
        </div>
        <div className="field">
          <Link to="/comidas">
            <input
              type="submit"
              data-testid="login-submit-btn"
              disabled={ !isValid }
              onClick={ setLocalStorage }
              className="btn btn-primary btn-lg float-right"
            />
          </Link>
        </div>
        <div className="form-group clearfix">
          <label className="float-left form-check-label">
            <input type="checkbox" id="remember-me" />
            Lembrar senha
          </label>
        </div>
      </div>
    </div>
  );
}

export default Login;
