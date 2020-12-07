import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { instanceOf } from 'prop-types';
import FavButton from './FavButton';
import ShareButton from './ShareButton';

const FavoriteRecipeCard = ({ recipe, index, onClick }) => {
  const { image, name, category, area, type, id, alcoholicOrNot } = recipe;

  return (
    <div className="done-recipe-card-container">
      <div className="done-recipe-card">
        <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
          <img
            className="smallIMG"
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt="Imagem da receita"
          />
          <div className="done-recipe-card-tag">
            <p data-testid={ `${index}-horizontal-name` }>
              Nome:
              { name }
            </p>
          </div>
        </Link>
      </div>

      <div className="done-card-details">
        <h1>{type}</h1>
        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${area || alcoholicOrNot} - ${category}`}
        </p>
      </div>
      <div>
        <ShareButton
          datatestid={ `${index}-horizontal-share-btn` }
          linkToCopy={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }
        />
        <FavButton
          onClick={ onClick }
          recipe={ recipe }
          type={ type }
          datatestid={ `${index}-horizontal-` }
        />
      </div>
    </div>
  );
};

FavoriteRecipeCard.propTypes = {
  recipe: instanceOf(Object).isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default FavoriteRecipeCard;
