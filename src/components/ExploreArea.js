import React, { useContext, useEffect, useState } from 'react';
import RecipesContext from '../context/RecipesContext';
import FoodCard from './FoodCard';

function ExploreArea() {
  const [selectedArea, setSelectedArea] = useState(null);

  const {
    getFoodAPI,
    foodData,
    getFoodList,
    filteredList,
  } = useContext(RecipesContext);

  useEffect(() => {
    getFoodAPI('name-filter', '');
  }, []);

  useEffect(() => {
    getFoodList('area-list');
  }, []);

  useEffect(() => {
    if (selectedArea !== 'All' && selectedArea) {
      getFoodAPI('area-filter', selectedArea);
    }

    if (selectedArea === 'All') {
      getFoodAPI('name-filter', '');
    }
  }, [selectedArea]);

  const onChange = (value) => {
    setSelectedArea(value);
  };

  const handleCards = () => {
    const maxSize = 12;
    const startIndex = 0;

    if (foodData.length > maxSize) {
      return foodData.slice(startIndex, maxSize).map((item, index) => (
        <FoodCard
          testid={ index }
          key={ `recipe${index}` }
          recipe={ item }
          idMeal={ item.idMeal }
        />
      ));
    }
    return foodData.slice(startIndex, maxSize).map((item, index) => (
      <FoodCard
        testid={ index }
        key={ `recipe${index}` }
        recipe={ item }
        idMeal={ item.idMeal }
      />
    ));
  };

  const handleDropDown = () => {
    if (filteredList !== null) {
      const optionsList = ['', 'All', ...filteredList];

      return (
        <div className="options-container">
          <select
            onChange={ ({ target }) => onChange(target.value) }
            data-testid="explore-by-area-dropdown"
          >
            {optionsList.map((area) => (
              <option
                data-testid={ `${area}-option` }
                key={ `area-${area}` }
                value={ area }
              >
                { area }
              </option>
            ))}
          </select>
        </div>
      );
    }
  };

  return (
    <div className="explore-ingredients-container">
      { handleDropDown() }
      { handleCards() }
    </div>
  );
}

export default ExploreArea;
