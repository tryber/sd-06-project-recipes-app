import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ setMessage }) {
  function setFeedBackMessage() {
    setMessage(true);
    const resetInterval = 2500;
    setTimeout(() => {
      setMessage(false);
    }, resetInterval);
  }

  function copyToClip() {
    const link = window.location.href.toString();
    navigator.clipboard.writeText(link);
    setFeedBackMessage();
  }

  return (
    <button data-testid="share-btn" type="button" onClick={ copyToClip }>
      <img src={ shareIcon } alt="shareIcon" />
    </button>
  );
}

ShareButton.propTypes = {
  setMessage: PropTypes.func.isRequired,
};

export default ShareButton;
