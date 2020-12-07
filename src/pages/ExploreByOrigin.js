import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ContextRecipes from '../context/ContextRecipes';

function ExploreByOrigin() {
  const location = useLocation().pathname;
  const history = useHistory();
  const [data, setData] = useState([]);
  const { setRecipes, recipes } = useContext(ContextRecipes);
  const MAX_NUMBER_OF_CARDS = 12;

  const fetchRecipes = async (endPoint) => {
    const apiRequest = await fetch(endPoint);
    const response = await apiRequest.json();
    const recipesApi = response.meals;
    setRecipes(recipesApi);
  };

  const apiOrigin = async () => {
    if (location.includes('comidas')) {
      const apiRequest = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const response = await apiRequest.json();
      setData(response.meals);
    } else {
      history.push('/explorar/bebidas/area');
    }
  };

  useEffect(() => {
    fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    apiOrigin();
  }, []);

  const handleFetchRecipes = () => {
    const areaDropdown = document.getElementById('area-dropdown');
    const { value } = areaDropdown.options[areaDropdown.selectedIndex];
    const endPoint = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    if (value === 'all') {
      fetchRecipes('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    } else {
      fetchRecipes(endPoint);
    }
  };

  return (
    <div>
      { location.includes('comidas') ? (
        <div>
          <Header title="Explorar Origem" showSearchIcon />
          <div>
            <select
              data-testid="explore-by-area-dropdown"
              onChange={ handleFetchRecipes }
              id="area-dropdown"
              className="form-control drop-origin"
            >
              <option value="all" data-testid="All-option">All</option>
              { data.map((foodsArea, index) => (
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
          <div className="container-card">
            { recipes.map((recipe, index) => (
              <div
                key={ index }
                id={ recipe.idMeal }
                data-testid={ `${index}-recipe-card` }
                onClick={ () => history.push(`/comidas/${recipe.idMeal}`) }
                onKeyPress={ () => history.push(`/comidas/${recipe.idMeal}`) }
                role="button"
                tabIndex="0"
                className="unit-card"
              >
                <h5
                  data-testid={ `${index}-card-name` }
                  className="title-card-done"
                >
                  { recipe.strMeal }
                </h5>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ recipe.strMealThumb }
                  alt={ `${index}-food` }
                  aria-hidden="true"
                  width="100%"
                />
              </div>
            )).filter((_, index) => index < MAX_NUMBER_OF_CARDS) }
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <h1>Not Found</h1>
          <Link to="/explorar">Voltar</Link>
        </div>
      )}
    </div>
  );
}

export default ExploreByOrigin;
