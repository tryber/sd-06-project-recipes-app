import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class NotFound extends React.Component {
  redirect({ target }) {
    const { history } = this.props;
    if (target.innerText === 'Comidas') history.push('/comidas');
    else history.push('/bebidas');
  }

  render() {
    return (
      <div className="not-found-container">
        <input
          type="image"
          alt="not-found-gif"
          src="https://www.moes.com/assets/moes/img/testing/404/CryingChip404.gif"
          width="100%px"
        />
        {/* <p>
          {
            'Page not Found :('
            + ''
          }
        </p> */}
        <p>Not Found</p>
        <p>But you can also check:</p>
        <div>
          <button
            type="button"
            className="explore-button not-found-button"
            onClick={ (event) => this.redirect(event) }
          >
            Comidas
          </button>
          <button
            type="button"
            className="explore-button not-found-button"
            onClick={ (event) => this.redirect(event) }
          >
            Bebidas
          </button>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default connect(null, null)(NotFound);
