import React, { useContext, useEffect, useState } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiFoodListCategories,
  requestApiFoodFilterCategories,
  requestApiFoodFilterName,
} from '../services/requestFood';

function ButtonCategoriesFood() {
  const {
    categories: {
      categoriesButtonFood,
      setCategoriesButtonFood,
    },

    cards: {
      setCardFood,
    },
  } = useContext(RecipesAppContext);

  const [categorySelectPreviously, setCategorySelectPreviously] = useState('');

  const ofTheFirstParameter = 0;
  const upToParameter5 = 5;
  const arrayVoid = 0;
  useEffect(() => {
    if (categoriesButtonFood.length === arrayVoid) {
      requestApiFoodListCategories()
        .then((arrayApiList) => {
          const arrayCategoriesList5 = arrayApiList
            .slice(ofTheFirstParameter, upToParameter5)
            .map((objCategory) => objCategory.strCategory);
          const arrayListButton = ['All', ...arrayCategoriesList5];
          setCategoriesButtonFood(arrayListButton);
        });
    }
  }, []);

  const onClickCategory = async (category) => {
    if (category === 'All' || categorySelectPreviously === category) {
      const arrayApiName = await requestApiFoodFilterName();
      setCardFood(arrayApiName);
      setCategorySelectPreviously('All');
    } else {
      const arrayApiCategory = await requestApiFoodFilterCategories(category);
      setCardFood(arrayApiCategory);
      setCategorySelectPreviously(category);
    }
  };

  return (
    (categoriesButtonFood.length === arrayVoid) ? <span>Loading...</span> : (
      <div>
        {categoriesButtonFood.map((category) => (
          <button
            key={ category }
            type="button"
            data-testid={ `${category}-category-filter` }
            onClick={ () => onClickCategory(category) }
          >
            { category }
          </button>
        ))}
      </div>
    )
  );
}

export default ButtonCategoriesFood;
