import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import chef from '../images/chef.png';
import arrow from '../images/right-arrow.png';
import '../Style/Login.css';

function Login() {
  const history = useHistory();
  const [buttonDisable, setButtonDisable] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const checkButton = () => {
    const inputPassword = document.getElementById('password-input').value;
    const inputEmail = document.getElementById('email-input').value;
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const six = 6;
    setButtonDisable(inputPassword.length > six && regex.test(inputEmail));
    setUserEmail(inputEmail);
  };

  const handleButton = () => {
    localStorage.mealsToken = JSON.stringify(1);
    localStorage.cocktailsToken = JSON.stringify(1);
    localStorage.user = JSON.stringify({ email: userEmail });
    history.push('/comidas');
  };

  return (
    <div className="login-container">
      <header>
        <h1>Login</h1>
      </header>
      <img src={ chef } className="chef-img" alt="chef" />
      <div className="input-container">
        <input
          type="text"
          data-testid="email-input"
          id="email-input"
          className="email-input"
          placeholder="email"
          onChange={ checkButton }
        />
        <input
          type="password"
          data-testid="password-input"
          id="password-input"
          placeholder="password"
          className="password-input"
          onChange={ checkButton }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ !buttonDisable }
          onClick={ handleButton }
        >
          <img src={ arrow } className="arrow-img" alt="log-in" />
        </button>
      </div>
    </div>
  );
}

export default Login;
