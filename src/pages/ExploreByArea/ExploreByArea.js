import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import BtnSearchBar from '../../components/BtnSearchBar';
import Footer from '../../components/Footer';
import { fetchMeal } from '../../services/mealAPI';

function ExploreByArea() {
  /* const { areas, setAreas, mealsByArea, setMealsByArea } = useContext(recipesAppContext);
  let selectedArea = ''; */

  const [areas, setAreas] = useState({ meal: [] });
  const [mealsByArea, setMealsByArea] = useState([]);

  const fetchByArea = async () => {
    setAreas(await fetchMeal('areaList', ''));
  };

  useEffect(() => {
    fetchByArea();
  }, []);

  const areaSelect = (meal) => (
    <option
      data-testid={ `${meal}-option` }
      key={ meal.strArea }
      name={ meal.strArea }
      value={ meal.strArea }
      id={ meal.strArea }
    >
      {meal.strArea}
    </option>
  );

  const handleChange = async ({ target }) => {
    setAreas({ meals: [{ strArea: target.value }] });
    const returnedMeals = await fetchMeal('mealsByArea', target.value);
    setMealsByArea(returnedMeals.meals);
  };

  const renderMealsByArea = () => (
    mealsByArea.map((meal) => (
      <Link key={ meal.strMeal } to={ `/comidas/${meal.idMeal}` }>
        <div className="recipe-card" key={ meal.strMeal }>
          <img
            alt="Meal Thumb"
            src={ meal.strMealThumb }
            className="recipe-thumb"
            height="250"
          />
          <h2
            className="recipe-name"
          >
            {meal.strMeal}
          </h2>
        </div>
      </Link>))
  );

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Origem"
        BtnSearchBar={ BtnSearchBar }
      />
      <div className="drop-down-container">
        <select
          data-testid="explore-by-area-dropdown"
          className="area-select"
          name="area"
          value=""
          onChange={ (e) => handleChange(e) }
        >
          {
            areas.meals
              ? areas.meals.map((meal) => areaSelect(meal))
              : <option>Loading...</option>
          }
        </select>
      </div>
      { mealsByArea && renderMealsByArea() }
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default ExploreByArea;
