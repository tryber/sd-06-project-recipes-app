import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShareButton from './ShareButton';
import './recipeCard.css';

const DoneRecipeCard = (props) => {
  const { index, recipe } = props;
  const { image, name, category, doneDate,
    tags, area, type, alcoholicOrNot, id } = recipe;
  const span = () => (
    <span data-testid={ `${index}-${tags[1]}-horizontal-tag` }>
      {tags[1]}
    </span>
  );
  const foodExclusives = () => (
    <div>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {`${area} - ${category}`}
      </p>
      <p>
        Tags:
        <span data-testid={ `${index}-${tags[0]}-horizontal-tag` }>
          {tags[0]}
        </span>
        { tags[0] ? span() : '' }
      </p>
    </div>
  );

  const drinkExclusive = () => (
    <div>
      <p data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</p>
    </div>
  );

  return (
    <div>
      <Link to={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }>
        <img
          className="smallIMG"
          data-testid={ `${index}-horizontal-image` }
          src={ image }
          alt="Imagem da receita"
        />
        <p data-testid={ `${index}-horizontal-name` }>
          Nome:
          { name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>
        Feito em:
        { doneDate }
      </p>
      { type === 'comida' ? foodExclusives() : drinkExclusive() }
      <ShareButton
        datatestid={ `${index}-horizontal-share-btn` }
        linkToCopy={ type === 'comida' ? `/comidas/${id}` : `/bebidas/${id}` }
      />
    </div>
  );
};

DoneRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.instanceOf(Object).isRequired,
};

export default DoneRecipeCard;
