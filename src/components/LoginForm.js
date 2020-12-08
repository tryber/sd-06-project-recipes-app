import React from 'react';
import PropTypes from 'prop-types';

function LoginForm({ handleChanges }) {
  return (
    <form>
      <div className="form-group">
        <label htmlFor="email-input">
          Email:
          <input
            id="email-input"
            type="email"
            data-testid="email-input"
            name="email"
            className="form-control"
            onChange={ (e) => handleChanges(e) }
          />
        </label>
      </div>
      <label htmlFor="password-input">
        Senha:
        <input
          id="password-input"
          type="password"
          data-testid="password-input"
          name="password"
          className="form-control"
          onChange={ (e) => handleChanges(e) }
        />
      </label>
    </form>
  );
}

LoginForm.propTypes = {
  handleChanges: PropTypes.func.isRequired,
};

export default LoginForm;
