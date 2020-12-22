import React from 'react';
import PropTypes, { objectOf } from 'prop-types';
import { connect } from 'react-redux';
import { UserInfo } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      password: '',
      email: '',
      validEmail: false,
      validPassword: false,
    };

    this.changeHandler = this.changeHandler.bind(this);
    this.handleValidator = this.handleValidator.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    const { history, myUserInfo } = this.props;
    const user = {
      email,
    };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    myUserInfo(email, password);
    history.push('/comidas');
  }

  handleValidator() {
    const { email, password } = this.state;
    const validator = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const isValid = validator.test(String(email).toLowerCase());
    const five = 5;
    if (password.length > five) {
      this.setState({ validPassword: true });
    } else {
      this.setState({ validPassword: false });
    }
    if (isValid) {
      this.setState({ validEmail: true });
    } else {
      this.setState({ validEmail: false });
    }
  }

  changeHandler({ target: { name, value } }) {
    this.setState({ [name]: value });
    this.handleValidator();
  }

  render() {
    const {
      email, password, validEmail, validPassword,
    } = this.state;

    return (
      <div className="login-container">
        <header>
          <h1>Login</h1>
        </header>
        <form>
          <div className="login-div">
            <label htmlFor="email">
              <input
                data-testid="email-input"
                id="email"
                type="text"
                required
                name="email"
                placeholder="Digite seu Email"
                value={ email }
                onChange={ this.changeHandler }
              />
            </label>
            <label htmlFor="password">
              <input
                data-testid="password-input"
                id="password"
                type="password"
                required
                name="password"
                placeholder="Digite sua Senha"
                value={ password }
                onChange={ this.changeHandler }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-btn"
              onClick={ this.handleSubmit }
              disabled={ !validEmail || !validPassword }
            >
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  myUserInfo: (email, password) => dispatch(UserInfo(email, password)),
});

Login.propTypes = {
  history: PropTypes.shape(objectOf).isRequired,
  myUserInfo: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
