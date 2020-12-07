import React, { useContext } from 'react';

// PropTypes
import PropTypes from 'prop-types';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faEnvelope, faKey, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

// Context
import RecipesContext from '../context/RecipesContext';

// Styled components
import {
  Wrapper,
  Logo,
  LoginContent,
  InputContainer,
  InputLogin,
  Icon,
  LoginButton } from '../styles/loginStyle';

// IMG
import LogoIMG from '../images/logo.png';
import LoginBottomImg from '../images/login-bottom-img.png';

export default function Login(props) {
  const {
    login,
    setLogin,
    isValid,
    setValid,
  } = useContext(RecipesContext);

  function validadeInputs() {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const magicNumber = 6;
    if (regex.test(login.email) && login.password.length >= magicNumber) {
      return setValid(false);
    }
    return setValid(true);
  }

  const handleInput = ({ target: { value, name } }) => {
    setLogin({ ...login, [name]: value });
    validadeInputs();
  };

  const handleClick = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: login.email }));
    props.history.push('/comidas');
  };

  return (
    <Wrapper>
      <Logo>
        <img src={ LogoIMG } alt="Logo" />
      </Logo>

      <LoginContent>
        <InputContainer>
          <Icon>
            <FontAwesomeIcon className="icon" icon={ faEnvelope } size="2x" />
          </Icon>
          <InputLogin
            className="input-login"
            type="email"
            name="email"
            data-testid="email-input"
            placeholder=""
            onChange={ handleInput }
          />
        </InputContainer>

        <InputContainer>
          <Icon>
            <FontAwesomeIcon className="icon" icon={ faKey } size="2x" />
          </Icon>
          <InputLogin
            className="input-login"
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ handleInput }
          />
        </InputContainer>

        <LoginButton
          type="button"
          data-testid="login-submit-btn"
          disabled={ isValid }
          onClick={ handleClick }
        >
          <span>
            <FontAwesomeIcon className="signIn-icon" icon={ faSignInAlt } size="2x" />
          </span>
          LOGIN
        </LoginButton>

        <img className="bottom-img" src={ LoginBottomImg } alt="login-bottom-img" />
      </LoginContent>
    </Wrapper>
  );
}

Login.propTypes = {
  history: PropTypes.func.isRequired,
};
