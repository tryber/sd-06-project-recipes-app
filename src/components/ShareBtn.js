import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareBtn({ copy, testid, index }) {
  return (
    <button type="button" onClick={ copy }>
      { testid === 'done'
        ? (
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="shareButton"
          />)
        : (
          <img
            data-testid="share-btn"
            src={ shareIcon }
            alt="shareButton"
          />)}
    </button>
  );
}
ShareBtn.propTypes = {
  copy: PropTypes.func.isRequired,
  testid: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
export default ShareBtn;
