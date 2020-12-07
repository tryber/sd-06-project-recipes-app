import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import formatInProgressLink from '../utils/formatInProgressLink';

function ShareButton({ datatestid, linkToCopy, page = null }) {
  const [message, setMessage] = useState(false);
  function setFeedBackMessage() {
    const resetInterval = 2500;
    setTimeout(() => {
      setMessage(false);
    }, resetInterval);
  }

  function copyToClip() {
    setFeedBackMessage();
    if (linkToCopy) return navigator.clipboard.writeText(`http://localhost:3000${linkToCopy}`);

    let link = window.location.href.toString();

    if (page === 'in-progress') {
      link = formatInProgressLink(page, link);
    }

    navigator.clipboard.writeText(link);
  }

  return (
    <button
      type="button"
      onClick={ () => {
        copyToClip();
        setMessage(true);
      } }
    >
      {message ? <p>Link copiado!</p> : <img
        data-testid={ datatestid || 'share-btn' }
        type="button"
        src={ shareIcon }
        alt="shareIcon"
      />}
    </button>
  );
}

ShareButton.propTypes = {
  datatestid: PropTypes.string.isRequired,
  linkToCopy: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default ShareButton;
