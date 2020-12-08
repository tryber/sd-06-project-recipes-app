import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import '../css/Cards.css';

function DoneRecipeCard({ recipe, index }) {
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
    doneDate,
    tags,
  } = recipe;

  const [showMessage, setShowMessage] = useState(false);

  const CopiedLinkMessage = (
    <div className="copy-message-hidden">
      <span>
        Link copiado!
      </span>
    </div>
  );

  const preTitle = () => {
    if (type === 'bebida') {
      return alcoholicOrNot;
    }
    return `${area} - ${category}`;
  };

  const shareClick = () => {
    const timeToShow = 1500;
    copy(`http://localhost:3000/${type}s/${id}`);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), timeToShow);
  };

  const minTag = 0;
  const maxTag = 2;

  return (
    <div className="done-recipe-card-container">
      <div className="done-recipe-img-container">
        <Link to={ `/${type}s/${id}` }>
          <img
            alt="prato já feito"
            src={ image }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </div>
      { showMessage && CopiedLinkMessage }
      <div className="done-recipe-info-container">
        <div className="done-recipe-title-container">
          <h3 data-testid={ `${index}-horizontal-top-text` }>{ preTitle() }</h3>
          <Link className="Link" to={ `/${type}s/${id}` }>
            <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
          </Link>
        </div>
        <p data-testid={ `${index}-horizontal-done-date` }>{ `Feita em: ${doneDate}` }</p>
        { tags !== null && tags.length >= maxTag
          ? tags.slice(minTag, maxTag).map((tag, i) => (
            <span
              key={ `${i}-tag` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>
          ))
          : tags !== null && tags.map((tag, i) => (
            <span
              key={ `${i}-tag` }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>)) }
      </div>
      <div>
        <button
          className="btn-share"
          type="button"
          onClick={ () => shareClick() }
        >
          <img
            alt="share button"
            className="btn-share-img"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </button>
      </div>
    </div>
  );
}

export default DoneRecipeCard;

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    doneDate: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  index: PropTypes.number.isRequired,
};
