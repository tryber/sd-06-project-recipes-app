import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import panela from '../images/panela.jpeg';
import '../styles/login.css';
import '../App.css';

function Login() {
  const {
    setUser,
    setBtnDisable,
    btnDisable,
  } = useContext(ContextRecipes);

  const validateInputs = () => {
    const email = document.getElementById('email-input').value;
    const senha = document.getElementById('password-input').value;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
    const tamMinimSenha = 6;
    if (senha.length > tamMinimSenha && regex.test(email)) {
      setBtnDisable(false);
    } else {
      setBtnDisable(true);
    }
  };

  const handleClick = () => {
    const email = document.getElementById('email-input').value;
    setUser({ email });
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
  };

  return (
    <div className="main-container">
      <div>
        <img src={ panela } alt="panela" width="220px" />
      </div>
      <br />
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email-input">
            Email:
            <input
              className="form-control"
              type="email"
              data-testid="email-input"
              name="email-input"
              id="email-input"
              onChange={ validateInputs }
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="password-input">
            Password:
            <input
              className="form-control"
              type="password"
              data-testid="password-input"
              name="password-input"
              id="password-input"
              onChange={ validateInputs }
            />
          </label>
        </div>
        <Link to="/comidas">
          <button
            type="button"
            className="btn btn-secondary"
            data-testid="login-submit-btn"
            disabled={ btnDisable }
            onClick={ handleClick }
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
}

export default Login;
