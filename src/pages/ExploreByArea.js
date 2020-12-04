import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import fetchRecipes from '../services/index';
import AppContext from '../context/AppContext';

function ExploreByArea() {
  const { setHeader } = useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [areas, setAreas] = useState([]);
  const MAX_NUMBER_OF_CARDS = 12;

  const getAllRecipes = async () => {
    const recipesResponse = await fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const recipesArray = recipesResponse.meals;
    const twelveRecipes = [];
    const zero = 0;
    const twelve = 12;
    for (let index = zero; index < twelve; index += 1) {
      twelveRecipes.push(recipesArray[index]);
    }
    setRecipes(twelveRecipes);
  };

  const getRecipesByArea = async (endpoint) => {
    const recipesResponse = await fetchRecipes(endpoint);
    const recipesArray = recipesResponse.meals;
    setRecipes(recipesArray);
  };

  const getAreas = async () => {
    const areasResponse = await fetchRecipes('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    setAreas(areasResponse.meals);
  };

  const handleFetchRecipes = () => {
    const areaDropdown = document.getElementById('area-dropdown');
    const { value } = areaDropdown.options[areaDropdown.selectedIndex];
    const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    if (value === 'all') {
      getAllRecipes();
    } else {
      getRecipesByArea(endPoint);
    }
  };

  useEffect(() => {
    setHeader({ page: 'Explorar Origem', search: true });
    getAreas();
    getAllRecipes();
  }, []);

  return (
    <div>
      <Header />
      <div className="categories">
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ handleFetchRecipes }
          id="area-dropdown"
        >
          <option value="all" data-testid="All-option">All</option>
          { areas.map((foodsArea, index) => (
            <option
              key={ index }
              value={ foodsArea.strArea }
              data-testid={ `${foodsArea.strArea}-option` }
            >
              { foodsArea.strArea }
            </option>
          ))}
        </select>
      </div>
      <div className="bodier">
        {recipes
          .filter((_, index) => index < MAX_NUMBER_OF_CARDS)
          .map((meal, index) => (

            <div
              className="card"
              data-testid={ `${index}-recipe-card` }
              key={ meal.idMeal }
            >
              <Link
                to={ `/comidas/${meal.idMeal}` }
              >
                <h4
                  className="text"
                  data-testid={ `${index}-card-name` }
                >
                  {meal.strMeal}
                </h4>
                <img
                  className="picture"
                  data-testid={ `${index}-card-img` }
                  src={ meal.strMealThumb }
                  alt={ meal.strMeal }
                />
              </Link>
            </div>
          ))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreByArea;
