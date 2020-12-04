import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

function DoneCard({ recipe, index }) {
  const [copied, setCopied] = useState(false);

  const {
    alcoholicOrNot,
    area,
    category,
    doneDate,
    id,
    image,
    name,
    tags,
    type,
  } = recipe;

  const isFood = (type === 'comida');

  function handleShareClick(itemId) {
    clipboardCopy(`http://localhost:3000/${type}s/${itemId}`);
    const seconds = 5000;
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, seconds);
  }

  return (
    <div className="recipe-card">
      <Link to={ `/${type}s/${id}` }>
        <img
          className="card-img"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt={ name }
        />
        <h4 data-testid={ `${index}-horizontal-name` }>{name}</h4>
      </Link>
      {(isFood) && (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {`${area} - ${category}`}
        </p>
      )}
      {(!isFood) && (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          {alcoholicOrNot}
        </p>
      )}
      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      {(isFood) && tags.map((tag, idx) => (
        <div
          key={ `${idx}-tag` }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          {tag}
        </div>
      ))}
      <button
        type="button"
        onClick={ () => handleShareClick(id) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="Compartilhar"
        />
        Compartilhar
      </button>
      {(copied) && <span>Link copiado!</span>}
    </div>
  );
}

export default DoneCard;

DoneCard.propTypes = {
  recipe: PropTypes.shape({
    alcoholicOrNot: PropTypes.string.isRequired,
    area: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    doneDate: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
