import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import logo from '../images/myfood.png';
import '../style/Login.css';

const Login = () => {
  const history = useHistory();
  const [disabled, setDisabled] = useState(true);
  const [user, setUser] = useState({
    email: '',
    password: 0,
  });

  const inputValues = () => {
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;
    const regexp = /^[a-zA-Z0-9.!#$%&_-]+@[A-Z0-9.-]+\.[A-Z]{3,}$/i;
    const six = 6;

    if (regexp.test(email) && password.length > six) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setUser({
      ...user,
      [name]: value,
    });

    inputValues();
  };

  const setUserOnLocalStorage = () => {
    const { email } = user;

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  const handleClick = () => {
    setUserOnLocalStorage();
    history.push('/comidas');
  };

  return (
    <section className="bg">
      <div className="container h-100">
        <div className="d-flex justify-content-center h-100">
          <div className="user_card">
            <div className="d-flex justify-content-center">
              <div className="brand_logo_container">
                <img src={ logo } className="brand_logo" alt="Logo" />
              </div>
            </div>
            <div className="d-flex justify-content-center form_container">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">@</span>
                  </div>
                  <input
                    id="email-input"
                    placeholder="email"
                    type="text"
                    className="form-control"
                    name="email"
                    data-testid="email-input"
                    onChange={ handleChange }
                  />
                </div>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <span className="input-group-text">#</span>
                  </div>
                  <input
                    id="password-input"
                    placeholder="password"
                    className="form-control"
                    name="password"
                    type="password"
                    data-testid="password-input"
                    onChange={ handleChange }
                  />
                </div>
                <div className="d-flex justify-content-center mt-3 login_container">
                  <div>
                    <button
                      disabled={ disabled }
                      type="button"
                      className="btn login_btn"
                      data-testid="login-submit-btn"
                      onClick={ handleClick }
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
