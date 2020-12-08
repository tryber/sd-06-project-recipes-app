import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../helpers/APIRequests';
import { addRecipes, changeFilter } from '../redux/actions/searchRecipes';

function DrinkCategoriesButtons({ categories, dispatchRecipes, dispatchFilterChange }) {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoriesFilters,
    setCategoriesFilter] = useState([false, false, false, false, false, true]);
  const componentMounted = useRef(false);

  useEffect(() => {
    async function fetchData() {
      let fetchRecipesByCategoryEndPoint;
      const allDrinkRecipesEndPoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      if (selectedCategory !== 'All' && selectedCategory !== '') {
        fetchRecipesByCategoryEndPoint = (
          `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
      } else {
        fetchRecipesByCategoryEndPoint = (allDrinkRecipesEndPoint);
      }
      const apiResponse = await fetchAPI(fetchRecipesByCategoryEndPoint);
      console.log(categoriesFilters, selectedCategory);
      dispatchRecipes(apiResponse);

      setIsFetching(false);
    }
    if (isFetching) fetchData();
  }, [isFetching]);

  useEffect(() => {
    if (selectedCategory !== '' && componentMounted.current) {
      dispatchFilterChange('Bebidas', true);
      setIsFetching(true);
    } else if (componentMounted.current) {
      dispatchFilterChange('Bebidas', false);
      setIsFetching(true);
    }
    componentMounted.current = true;
  }, [selectedCategory]);

  const updateCategoriesFilter = (e, index) => {
    const updater = {
      false: () => {
        const arrayCopy = categoriesFilters.map(() => false);
        arrayCopy[index] = true;
        setCategoriesFilter(arrayCopy);
        setSelectedCategory(e.target.innerText);
      },
      true: () => {
        const arrayCopy = categoriesFilters.map(() => false);
        setCategoriesFilter(arrayCopy);
        setSelectedCategory('');
      },
    };
    const updateFilters = updater[categoriesFilters[index].toString()];
    updateFilters();
  };

  const handleClick = (e, index) => {
    updateCategoriesFilter(e, index);
  };

  const renderAllCategoriesButton = () => {
    const five = 5;
    return (
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ (e) => handleClick(e, five) }

      >
        All
      </button>
    );
  };

  const renderButtton = (category, index) => (
    <button
      type="button"
      key={ `${category.strCategory} ${index} ` }
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ (e) => handleClick(e, index) }
    >
      {category.strCategory}
    </button>
  );

  const renderCategoriesButtons = () => (
    <div>
      {categories.map((category, index) => renderButtton(category, index))}
      {renderAllCategoriesButton()}
    </div>);

  const render = () => {
    const zero = 0;
    if (categories && categories.length > zero) {
      return renderCategoriesButtons();
    }
    return <> </>;
  };
  return render();
}

const mapStateToProps = (state) => ({
  categories: state.searchRecipes.drinkCategories,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
  dispatchFilterChange: (title, active) => dispatch(changeFilter(title, active)),

});

export default connect(mapStateToProps, mapDispatchToProps)(DrinkCategoriesButtons);
