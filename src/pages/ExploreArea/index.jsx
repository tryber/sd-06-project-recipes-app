import React, {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useExplore } from '../../hooks/explore';
import { useRecipes } from '../../hooks/recipes';
import { useSearch } from '../../hooks/search';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import './styles.css';

const noFilterOption = {
  option: 'name',
  value: '',
  token: '1',
};

function ExploreArea({ pageType }) {
  const [areaSelected, setAreaSelected] = useState('All');

  const {
    loadAreas, loadingAreas, foodAreas, loadingFoodsByArea, loadFoodsByArea,
  } = useExplore();
  const { currentRecipes } = useRecipes();
  const { appSearch } = useSearch();

  useEffect(() => {
    loadAreas();
  }, []);

  useEffect(() => {
    if (!loadingAreas) {
      if (areaSelected === 'All') {
        appSearch(pageType, noFilterOption);
      } else {
        loadFoodsByArea(areaSelected);
      }
    }
  }, [areaSelected, loadingAreas, pageType, loadFoodsByArea, appSearch]);

  const handleAreaChange = useCallback(({ target }) => {
    const { value: area } = target;

    setAreaSelected(area);
  }, []);

  const currentRecipesByArea = useMemo(() => {
    const foodsByArea = currentRecipes[pageType];

    return foodsByArea;
  }, [currentRecipes, pageType]);

  // if (loadingAreas) {
  //   return (
  //     <p>Loading...</p>
  //   );
  // }

  return (
    <div className="explore-ingredients-area-page">
      <Header pageName="Explorar Origem" showSearch />
      <Navbar />

      <div className="area-select-container">
        <select
          name="area"
          id="area"
          value={ areaSelected }
          onChange={ handleAreaChange }
          data-testid="explore-by-area-dropdown"
        >
          <option value="All" data-testid="All-option">All</option>

          {foodAreas.map((area) => (
            <option
              key={ area }
              value={ area }
              data-testid={ `${area}-option` }
            >
              {area}

            </option>
          ))}
        </select>
      </div>

      {loadingFoodsByArea
        ? (
          <p>Loading...</p>
        ) : (
          <div className="recipes-container">
            {currentRecipesByArea.map((meal, index) => (
              <Link
                to={ `/${pageType}/${meal.idMeal}` }
                className="recipe-card"
                data-testid={ `${index}-recipe-card` }
                key={ meal.idMeal }
              >
                <img
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                  data-testid={ `${index}-card-img` }
                />
                <strong data-testid={ `${index}-card-name` }>{meal.strMeal}</strong>
              </Link>
            ))}
          </div>
        )}

    </div>
  );
}

ExploreArea.propTypes = {
  pageType: PropTypes.string.isRequired,
};

export default ExploreArea;
