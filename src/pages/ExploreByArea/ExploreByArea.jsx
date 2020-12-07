import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import RecipeCard from '../../components/RecipeCard';
import { getMealsAPI } from '../../services/API';
import './ExploreByArea.css';

const ExploreByArea = (props) => {
  const { location: { pathname } } = props;
  const {
    pageTitle,
    setLoading,
  } = useContext(Context);
  const [mealsByArea, setMealsByArea] = useState([]);
  const [mealsAreaList, setMealsAreaList] = useState([]);
  const [recipesShown, setRecipesShown] = useState([]);

  useEffect(() => {
    setLoading(true);
    getMealsAPI('', 'meals-areas-list').then((data) => {
      setMealsAreaList(data);
      setLoading(false);
    });
    setLoading(true);
    getMealsAPI().then((data) => {
      setMealsByArea(data);
      setRecipesShown(data);
      setLoading(false);
    });
  }, [pageTitle, setLoading]);

  function filterMealsBySelectedArea({ target: { value } }) {
    if (value !== 'All') {
      setLoading(true);
      getMealsAPI(value, 'byArea').then((data) => {
        setRecipesShown(data);
      });
      setLoading(false);
    } else {
      return setRecipesShown(mealsByArea);
    }
  }

  function renderOptions() {
    return mealsAreaList.map(({ strArea }) => (
      <option
        data-testid={ `${strArea}-option` }
        key={ strArea }
        value={ strArea }
      >
        {strArea}
      </option>
    ));
  }

  function renderAreaFilters() {
    if (mealsAreaList) {
      return (
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => filterMealsBySelectedArea(e) }
        >
          <option data-testid="All-option" value="All">All</option>
          { renderOptions() }
        </select>
      );
    }
    return undefined;
  }

  const mapRecipes = () => {
    const MAX_CARDS = 11;
    return (
      recipesShown.map((recipe, index) => {
        while (index <= MAX_CARDS) {
          return (
            <Link
              to={ pathname.replace('explorar/comidas/area', `comidas/${recipe.idMeal}`) }
              key={ recipe.idMeal }
            >
              <RecipeCard
                key={ recipe.idMeal }
                recipe={ recipe }
                index={ index }
              />
            </Link>
          );
        }
        return undefined;
      })
    );
  };

  function renderRecipes() {
    return recipesShown ? (
      mapRecipes()
    ) : undefined;
  }

  return (
    <div className="explore-by-area-content">
      <Header pathname={ pathname } />
      { mealsAreaList && renderAreaFilters() }
      { mealsByArea && renderRecipes() }
      <Footer />
    </div>
  );
};

ExploreByArea.propTypes = {
  location: PropTypes.shape().isRequired,
  pathname: PropTypes.string,
};

ExploreByArea.defaultProps = {
  pathname: '/area',
};

export default ExploreByArea;
