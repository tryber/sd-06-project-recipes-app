import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchAPI } from '../helpers/APIRequests';
import { addRecipes, changeFilter } from '../redux/actions/searchRecipes';

function FoodCategoriesButtons({ categories,
  dispatchRecipes, dispatchFilterChange }) {
  const [isFetching, setIsFetching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categoriesFilters,
    setCategoriesFilter] = useState([false, false, false, false, false, true]);
  const componentMounted = useRef(false);

  useEffect(() => {
    async function fetchData() {
      let fetchRecipesByCategoryEndPoint;
      const allFoodRecipesEndPoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      if (selectedCategory !== 'All' && selectedCategory !== '') {
        fetchRecipesByCategoryEndPoint = (
          `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`
        );
      } else {
        fetchRecipesByCategoryEndPoint = (allFoodRecipesEndPoint);
      }
      const apiResponse = await fetchAPI(fetchRecipesByCategoryEndPoint);
      console.log(categoriesFilters, selectedCategory);
      dispatchRecipes(apiResponse);
      console.log(isFetching, 'isFetching');
      setIsFetching(false);
    }
    if (isFetching) fetchData();
  }, [isFetching]);

  useEffect(() => {
    if (selectedCategory !== '' && componentMounted.current) {
      dispatchFilterChange('Comidas', true);
      setIsFetching(true);
    } else if (componentMounted.current) {
      dispatchFilterChange('Comidas', false);
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
  categories: state.searchRecipes.foodCategories,

});

const mapDispatchToProps = (dispatch) => ({
  dispatchRecipes: (recipes) => dispatch(addRecipes(recipes)),
  dispatchFilterChange: (title, active) => dispatch(changeFilter(title, active)),

});

export default connect(mapStateToProps, mapDispatchToProps)(FoodCategoriesButtons);
