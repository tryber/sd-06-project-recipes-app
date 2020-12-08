import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/header';
import Footer from '../components/Footer';
import ExploreButton from '../components/explore/ExploreButton';
import { fetchRandomMealId, fetchRandomDrinkId } from '../services';
import capitalizeFirstLetter from '../libs/capitilizeFirstLetter';
import '../components/explore/Explore.css';

function ExploreMealsOrDrinks({ type }) {
  const [randomRecipeId, setRandomRecipeId] = useState();

  const getRandomRecipeId = async () => {
    const id = (type === 'comidas')
      ? await fetchRandomMealId()
      : await fetchRandomDrinkId();
    setRandomRecipeId(id);
  };

  useEffect(() => {
    getRandomRecipeId(type);
  }, []);

  return (
    <>
      <Header
        title={ `Explorar ${capitalizeFirstLetter(type)}` }
      />
      <nav className="buttons">
        <ExploreButton
          title="Por Ingredientes"
          url={ `/explorar/${type}/ingredientes` }
          testId="explore-by-ingredient"
        />
        {
          (type === 'comidas')
          && <ExploreButton
            title="Por Local de Origem"
            url={ `/explorar/${type}/area` }
            testId="explore-by-area"
          />
        }
        <ExploreButton
          title="Me Surpreenda!"
          url={ `/${type}/${randomRecipeId}` }
          testId="explore-surprise"
        />
      </nav>
      <Footer />
    </>
  );
}

ExploreMealsOrDrinks.propTypes = {
  type: PropTypes.string.isRequired,
};

export default ExploreMealsOrDrinks;
