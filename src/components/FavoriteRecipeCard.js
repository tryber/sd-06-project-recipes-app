import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareBtn from './ShareBtn';
import FavoriteBtn from './FavoriteBtn';
import '../css/Cards.css';

function FavoriteRecipeCard({ recipe, index }) {
  const {
    id,
    type,
    area,
    category,
    alcoholicOrNot,
    name,
    image,
  } = recipe;

  const preTitle = () => {
    if (type === 'bebida') {
      return alcoholicOrNot;
    }
    return `${area} - ${category}`;
  };

  return (
    <div className="done-recipe-card-container">
      <div className="done-recipe-img-container">
        <Link className="Link" to={ `/${type}s/${id}` }>
          <img
            alt="prato favorito"
            src={ image }
            data-testid={ `${index}-horizontal-image` }
          />
        </Link>
      </div>
      <div className="done-recipe-info-container">
        <h3 data-testid={ `${index}-horizontal-top-text` }>{ preTitle() }</h3>
        <Link className="Link" to={ `/${type}s/${id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>{ name }</h4>
        </Link>
      </div>
      <div>
        <ShareBtn id={ id } />
        <FavoriteBtn
          id={ id }
          type={ type }
          recipe={ recipe }
        />
      </div>
    </div>
  );
}

export default FavoriteRecipeCard;

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    area: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
