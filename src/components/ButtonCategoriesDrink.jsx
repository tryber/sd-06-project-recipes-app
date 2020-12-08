import React, { useContext, useEffect, useState } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import {
  requestApiDrinkListCategories,
  requestApiDrinkFilterCategories,
  requestApiDrinkFilterName,
} from '../services/requestDrink';
import '../styles/ButtonCategoriesDrink.css';

function ButtonCategoriesDrink() {
  const {
    categories: {
      categoriesButtonDrink,
      setCategoriesButtonDrink,
    },
    cards: {
      setCardDrink,
    },
  } = useContext(RecipesAppContext);

  const [categorySelectPreviously, setCategorySelectPreviously] = useState('');

  const ofTheFirstParameter = 0;
  const upToParameter5 = 5;
  const arrayVoid = 0;
  useEffect(() => {
    if (categoriesButtonDrink.length === arrayVoid) {
      requestApiDrinkListCategories()
        .then((arrayApiList) => {
          const arrayCategoriesList5 = arrayApiList
            .slice(ofTheFirstParameter, upToParameter5)
            .map((objCategory) => objCategory.strCategory);
          const arrayListButton = ['All', ...arrayCategoriesList5];
          setCategoriesButtonDrink(arrayListButton);
        });
    }
  }, []);

  const onClickCategory = async (category) => {
    if (category === 'All' || categorySelectPreviously === category) {
      const arrayApiName = await requestApiDrinkFilterName();
      setCardDrink(arrayApiName);
      setCategorySelectPreviously('All');
    } else {
      const arrayApiCategory = await requestApiDrinkFilterCategories(category);
      setCardDrink(arrayApiCategory);
      setCategorySelectPreviously(category);
    }
  };

  return (
    (categoriesButtonDrink.length === arrayVoid) ? <span>Loading...</span> : (
      <div className="all-btns">
        {categoriesButtonDrink.map((category) => (
          <button
            className="category-food-btn"
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

export default ButtonCategoriesDrink;
