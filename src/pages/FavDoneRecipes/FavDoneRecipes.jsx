import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Context from '../../context/Context';
import Header from '../../components/Header';
import FavDoneRecipeCard from '../../components/FavDoneRecipeCard';
import FavDoneRecipesFilters
  from '../../components/FavDoneRecipesFilters/FavDoneRecipesFilters';
import Footer from '../../components/Footer';

const FavDoneRecipes = (props) => {
  const { location, history } = props;
  const { pathname } = location;
  const [messageToggle, setMessageToggle] = useState(false);
  const { doneFavRecipeFilter, setCardType, pageTitle } = useContext(Context);

  useEffect(() => {
    if (pageTitle === 'Done recipes') {
      setCardType('done');
    } else {
      setCardType('favorite');
    }
  }, [pageTitle, setCardType]);

  const showMessage = () => {
    const TWO_SECONDS = 3000;
    setMessageToggle(true);
    setTimeout(() => {
      setMessageToggle(false);
    }, TWO_SECONDS);
  };

  const filterFavDoneRecipes = (recipes) => {
    switch (doneFavRecipeFilter) {
    case 'meals':
      return recipes.filter((recipe) => !recipe.alcoholicOrNot);
    case 'drinks':
      return recipes.filter((recipe) => recipe.alcoholicOrNot);
    default:
      return recipes;
    }
  };

  const getCardType = () => (
    (pageTitle === 'Done recipes') ? 'done' : 'favorite'
  );

  function renderFavDoneRecipes() {
    const recipes = JSON.parse(localStorage.getItem(`${getCardType()}Recipes`));

    if (recipes) {
      return filterFavDoneRecipes(recipes).map((recipe, index) => (
        <FavDoneRecipeCard
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
          showMessage={ showMessage }
          history={ history }
        />
      ));
    }
    return <p>no recipes</p>;
  }

  return (
    <div className="wapper">
      <Header pathname={ pathname } />
      <FavDoneRecipesFilters />
      <section className="recipes-container">
        {renderFavDoneRecipes()}
      </section>
      {messageToggle && <p>Link copied!</p>}
      <div className="container-footer">
        <Footer />
      </div>
    </div>
  );
};

export default FavDoneRecipes;

FavDoneRecipes.propTypes = {
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape().isRequired,
  pathname: PropTypes.string,
};

FavDoneRecipes.defaultProps = {
  pathname: 'comidas',
};
