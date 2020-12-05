import React, { useCallback, useMemo, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { FiArrowLeft, FiUser, FiLock, FiInfo } from 'react-icons/fi';

import Input from '../../components/Input';

import loginLogo from '../../images/login-logo.png';
import appLogo from '../../images/app-icon.png';

import './styles.css';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { push } = useHistory();

  const handleSubmit = useCallback((formEvent) => {
    formEvent.preventDefault();

    const previousRegister = JSON.parse(localStorage.getItem('userNames')) || {};

    previousRegister[email] = name;

    localStorage.setItem('userNames', JSON.stringify(previousRegister));

    push('/');
  }, [email, push, name]);

  const handleNameChange = useCallback(({ target }) => {
    const nameTyped = target.value;

    setName(nameTyped);
  }, []);

  const handleEmailChange = useCallback(({ target }) => {
    const emailTyped = target.value;

    setEmail(emailTyped);
  }, []);

  const handlePasswordChange = useCallback(({ target }) => {
    const passwordTyped = target.value;

    setPassword(passwordTyped);
  }, []);

  const userDataIsValid = useMemo(() => {
    const emailRegex = /\w+@(\w+\.)+\w+$/i;
    const emailIsValid = emailRegex.test(email);

    const MIN_PW_LENGTH = 6;
    const passwordIsValid = password.length > MIN_PW_LENGTH;

    return (emailIsValid && passwordIsValid && name);
  }, [email, password, name]);

  return (
    <div className="register-page">
      <div className="register-bg">
        <div className="bg">
          <img src={ loginLogo } alt="alternative recipes logo" />
          <h1>Seu app de receitas</h1>
        </div>
      </div>

      <div className="register-content">
        <img src={ appLogo } alt="Recipes app logo" />

        <form onSubmit={ handleSubmit }>
          <h1>Faça seu Cadastro</h1>

          <Input
            placeholder="Seu nome"
            name="name"
            data-testid="name-input"
            icon={ FiInfo }
            value={ name }
            onChange={ handleNameChange }
          />

          <Input
            placeholder="Seu e-mail"
            name="email"
            data-testid="email-input"
            icon={ FiUser }
            value={ email }
            onChange={ handleEmailChange }
          />

          <Input
            data-testid="password-input"
            type="password"
            name="password"
            placeholder="Sua senha"
            icon={ FiLock }
            value={ password }
            onChange={ handlePasswordChange }
          />

          <button
            type="submit"
            data-testid="register-submit-btn"
            disabled={ !userDataIsValid }
          >
            Registrar
          </button>
        </form>

        <Link
          to="/"
          className="register-fake"
          data-testid="back-link"
        >
          <FiArrowLeft />
          Voltar ao Login
        </Link>
      </div>

    </div>
  );
}

export default Register;
