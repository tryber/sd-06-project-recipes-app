import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function ShareButton({ type, id }) {
  const [messegeShareLink, setMessegeShareLink] = useState('');

  const shareLinkButton = (idRecipe) => {
    if (type === 'meals') {
      navigator.clipboard.writeText(`http://localhost:3000/comidas/${idRecipe}`);
      setMessegeShareLink('Link copiado!');
    } else {
      navigator.clipboard.writeText(`http://localhost:3000/bebidas/${idRecipe}`);
      setMessegeShareLink('Link copiado!');
    }
  };

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => shareLinkButton(id) }
      >
        <img src={ shareIcon } alt="share" />
      </button>
      <p>{messegeShareLink}</p>
    </div>
  );
}

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ShareButton;
