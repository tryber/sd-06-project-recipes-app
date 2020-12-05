import React, { useContext, useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Header from '../Components/Header';

import ShareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
// import whiteHeart from '../images/whiteHeartIcon.svg';

export default function ReceitasFavoritas({ history }) {
  const {
    titulo,
    setTitulo,
  } = useContext(Context);
  const [favoriteImg] = useState(blackHeart);
  const [favorites, setFavorites] = useState([]);
  const [shared, setShared] = useState(false);
  const [filter, setFilter] = useState('all');

  const copyToClipboard = (card) => {
    if (card.type === 'comida') {
      copy(`http://localhost:3000/comidas/${card.id}`);
      setShared(true);
    }
    if (card.type === 'bebida') {
      copy(`http://localhost:3000/bebidas/${card.id}`);
      setShared(true);
    }
  };

  const handleFilter = ({ target }) => {
    setFilter(target.value);
  };

  const removeFavorite = (card) => {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const takeOut = favoriteRecipes.filter(
      (fav) => fav.name !== card.name,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(takeOut));
    setFavorites(takeOut);
  };

  const goToDetails = (card) => {
    if (card.type === 'comida') {
      history.push(`/comidas/${card.id}`);
      setShared(true);
    }
    if (card.type === 'bebida') {
      history.push(`/bebidas/${card.id}`);
      setShared(true);
    }
  };

  const renderCard = (card, index) => {
    if (card.type === 'comida') {
      return (
        <div>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {`${card.area} - ${card.category}`}
          </p>
          <button type="button" onClick={ () => goToDetails(card) }>
            <img
              src={ card.image }
              alt={ card.name }
              height="60px"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{card.name}</p>
          </button>
          <button
            type="button"
            alt="compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ ShareIcon }
            onClick={ () => copyToClipboard(card) }
          >
            <img src={ ShareIcon } alt="compartilhar" />
          </button>
          <button
            type="button"
            src={ favoriteImg }
            alt="favoritar"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => removeFavorite(card) }
          >
            <img src={ favoriteImg } alt="favoritar" />
          </button>
        </div>
      );
    }
    if (card.type === 'bebida') {
      return (
        <div>
          <p
            data-testid={ `${index}-horizontal-top-text` }
          >
            {card.alcoholicOrNot}
          </p>
          <button type="button" onClick={ () => goToDetails(card) }>
            <img
              src={ card.image }
              alt={ card.name }
              height="60px"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-name` }>{card.name}</p>
          </button>
          <button
            type="button"
            alt="compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ ShareIcon }
            onClick={ () => copyToClipboard(card) }

          >
            <img src={ ShareIcon } alt="compartilhar" />
          </button>
          <button
            type="button"
            src={ favoriteImg }
            alt="favoritar"
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => removeFavorite(card) }

          >
            <img src={ favoriteImg } alt="favoritar" />
          </button>
        </div>
      );
    }
  };

  const favoriteTemp = {
    id: 52977,
    type: 'comida',
    area: 'Turkish',
    category: 'Side',
    alcoholicOrNot: '',
    name: 'Corba',
    image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg/preview',
  };

  const zero = 0;

  useEffect(() => {
    setTitulo('Receitas Favoritas');
    if (favorites.length === zero) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteTemp]));
    }
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(favoriteRecipes);
    setFavorites(favoriteRecipes);
    console.log(favorites);
  }, []);

  return (
    <div>
      <Header titulo={ titulo } />
      <div>
        <button
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-all-btn"
          value="all"
        >
          All
        </button>
        <button
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-food-btn"
          value="comida"
        >
          Food
        </button>
        <button
          onClick={ handleFilter }
          type="button"
          data-testid="filter-by-drink-btn"
          value="bebida"
        >
          Drinks
        </button>
      </div>
      {filter === 'all' ? favorites.map((recipe, index) => (renderCard(recipe, index)))
        : favorites.filter((recipe) => recipe.type === filter)
          .map((recipe, index) => (renderCard(recipe, index)))}
      {shared ? <p>Link copiado!</p> : ''}
    </div>
  );
}

ReceitasFavoritas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
