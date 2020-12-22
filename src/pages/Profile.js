import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Footer, Header } from '../components';

class Profile extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  render() {
    const { history, userEmail } = this.props;
    const localStorageEmail = JSON.parse(localStorage.getItem('user'));

    return (
      <div className="profile-container">
        <Header history={ history } />
        <div className="explore-buttons-div">
          {localStorageEmail
            ? (
              <span
                data-testid="profile-email"
              >
                {localStorageEmail.email}
              </span>
            )
            : (
              <span
                data-testid="profile-email"
              >
                {userEmail}
              </span>
            )}
          <button
            type="button"
            data-testid="profile-done-btn"
            className="explore-button"
            onClick={ () => history.push('/receitas-feitas') }
          >
            Receitas Feitas
          </button>
          <button
            type="button"
            className="explore-button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/receitas-favoritas') }
          >
            Receitas Favoritas
          </button>
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ this.handleClick }
            className="explore-button"
          >
            Sair
          </button>
        </div>
        <Footer history={ history } />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape().isRequired,
  userEmail: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
});

export default connect(mapStateToProps, null)(Profile);
