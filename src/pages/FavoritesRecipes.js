import React, { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import Context from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoritesRecipes() {
  const { getFavoritesRecipe, fetchFavoritesRecipe } = useContext(Context);
  const [linkCopiado, setLinkCopiado] = useState(false);

  function arrFavoriteFood() {
    fetchFavoritesRecipe((JSON.parse(localStorage.getItem('favoriteRecipes')))
      .filter((item) => item.type === 'comida'));
  }

  function arrFavoriteDrink() {
    fetchFavoritesRecipe((JSON.parse(localStorage.getItem('favoriteRecipes')))
      .filter((item) => item.type === 'bebida'));
  }

  function arrFavoriteRecipe() {
    fetchFavoritesRecipe(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }

  function handleShareButton(type, id) {
    const copyText = `http://localhost:3000/${type}s/${id}`;
    window.navigator.clipboard.writeText(copyText);
    setLinkCopiado(true);
  }

  function handleUnfavoriteButton(id) {
    const currentFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes'),
    ) || [];
    const filteredItems = [];
    currentFavoriteRecipes.filter((favoriteRecipe) => (
      favoriteRecipe.id !== id
        ? filteredItems.push(favoriteRecipe) : null
    ));
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredItems));
    fetchFavoritesRecipe((JSON.parse(localStorage.getItem('favoriteRecipes'))));
  }

  useEffect(() => { arrFavoriteRecipe(); }, []);

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ arrFavoriteFood }
      >
        Comidas
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ arrFavoriteDrink }
      >
        Bebidas
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ arrFavoriteRecipe }
      >
        All
      </button>
      { getFavoritesRecipe.map((item, index) => (
        <div key={ item.id }>
          <a href={ `${item.type}s/${item.id}` }>
            <img
              src={ item.image }
              alt={ item.name }
              width="350"
              data-testid={ `${index}-horizontal-image` }
            />
            <h3 data-testid={ `${index}-horizontal-name` }>{ item.name }</h3>
          </a>
          <div data-testid={ `${index}-horizontal-top-text` }>
            {item.category !== 'Vegetarian' ? <h5>{ `${item.area}` }</h5>
              : <h5>{ `${item.area} - Vegetarian` }</h5>}
          </div>

          <div data-testid={ `${index}-horizontal-top-text` }>
            {item.alcoholicOrNot !== 'Alcoholic' ? <h5>{ `${item.area}` }</h5>
              : <h5>Alcoholic</h5>}
          </div>
          {linkCopiado ? <p>Link copiado!</p> : null}
          <input
            type="image"
            alt="sharebutton"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleShareButton(item.type, item.id) }
          />
          <input
            type="image"
            alt="favoritebutton"
            src={ blackHeartIcon }
            data-testid={ `${index}-horizontal-favorite-btn` }
            onClick={ () => handleUnfavoriteButton(item.id) }
          />
        </div>)) }
    </div>
  );
}

export default FavoritesRecipes;
