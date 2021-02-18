import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions/LoginActions';
import '../css/login.css';

function Login(props) {
  // const [passWord, setPassword] = useState('');
  // const [email, setEmail] = useState('');
  // const [isDisable, setIsDisable] = useState(true);
  const [state, setState] = useState({
    password: '',
    email: '',
    isDisable: true,
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { password, email } = state;

  const validateLogin = () => {
    const NUM_PASSWORD = 6;

    setState({
      ...state,
      isDisable:

      !((/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)

      && password.length > NUM_PASSWORD),
    });
  };

  useEffect(() => validateLogin(), [state.email, state.password]);

  const handleChange = ({ target }) => {
    setState({ ...state, [target.name]: target.value });
  };

  const setLocalStorageData = () => {
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('cocktailsToken', JSON.stringify(1));
    localStorage.setItem('user', JSON.stringify({ email: state.email }));
  };

  const handleSubmit = () => {
    const {
      dispatchEmail,
    } = props;
    dispatchEmail(email);
    setLocalStorageData();
    setIsLoggedIn(true);
  };

  const renderRedirect = () => <Redirect to="/comidas" />;

  const clearInput = (e) => {
    e.target.value = '';
    setState({
      ...state,
      isDisable: true,
    });
  };

  const render = () => {
    const { isDisable } = state;
    return (
      <div className="login__container-page">
        <div className="login__container-background">

          <div className="login__container-title">
            <p className="login__element-title">
              Trybe Recipes
            </p>
          </div>
          <div className="login__container-forms">
            <h3>Login to start to cook</h3>

            <form className="login__loginForm">
              <label htmlFor="input-gravatar-email" className="login__container-input">
                <input
                  type="text"
                  placeholder="email"
                  className="login__searchInput"
                  onClick={ (e) => clearInput(e) }
                  name="email"
                  value={ email }
                  data-testid="email-input"
                  onChange={ (e) => handleChange(e) }
                />
              </label>
              <label htmlFor="input-player-name" className="login__container-input">
                <input
                  type="password"
                  placeholder="Senha"
                  onClick={ (e) => clearInput(e) }
                  className="login__searchInput"
                  name="password"
                  value={ password }
                  data-testid="password-input"
                  onChange={ (e) => handleChange(e) }
                />
              </label>
              <button
                className={ isDisable ? 'login__loginButton-inactive'
                  : 'login__loginButton-active' }
                type="button"
                data-testid="login-submit-btn"
                disabled={ isDisable }
                onClick={ () => handleSubmit() }
              >
                Entrar
              </button>
              {}
              {/* <Link to="/configuracoes">
            <button
            type="button"
            data-testid="btn-settings"
            >
            Configurações
            </button>
          </Link> */}
            </form>
          </div>
        </div>
      </div>
    );
  };

  return isLoggedIn ? renderRedirect() : render();
}

const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(addEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
