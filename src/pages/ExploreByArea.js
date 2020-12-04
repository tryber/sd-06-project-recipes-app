import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExploreByArea() {
  const [areas, setAreas] = useState([]);
  const [ok, setOk] = useState(false);
  const [meals, setMeals] = useState([]);
  const [filterMeals, setFilterMeals] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');

  const urlArea = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlMealsArea = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`;
  console.log(urlMealsArea);

  useEffect(() => {
    const fetchAreas = async () => {
      const APIAreasRequest = await fetch(urlArea);
      const APIAreasResponse = await APIAreasRequest.json();
      if (APIAreasResponse !== null) {
        setAreas(APIAreasResponse.meals);
      }
    };
    fetchAreas();
    const fetchMeals = async () => {
      const APIMealsRequest = await fetch(urlMeals);
      const APIMealsResponse = await APIMealsRequest.json();
      if (APIMealsResponse !== null) {
        setMeals(APIMealsResponse.meals);
      }
    };

    fetchMeals();
  }, []);

  useEffect(() => {
    setOk(true);
    const fetchFilterMeals = async () => {
      const APIFilterMealsRequest = await fetch(urlMealsArea);
      const APIFilterMealsResponse = await APIFilterMealsRequest.json();
      console.log(APIFilterMealsResponse);
      if (APIFilterMealsResponse !== null) {
        setFilterMeals(APIFilterMealsResponse.meals);
      }
    };
    if (ok) {
      fetchFilterMeals();
    }
  }, [selectedArea]);

  const inicial = 0;
  const final = 12;

  const handleClickArea = ({ target: { value } }) => {
    setSelectedArea(value);
  };

  const renderMeals = () => {
    if (selectedArea === '' || selectedArea === 'All') {
      return meals.slice(inicial, final).map((meal, id) => (
        <Link to={ `/comidas/${meal.idMeal}` } key={ id }>
          <div
            key={ id }
            className="recipe-card"
            data-testid={ `${id}-recipe-card` }
            value={ meal.strCategory }
          >
            <img
              className="card-img"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${id}-card-img` }
            />
            <h3 data-testid={ `${id}-card-name` }>{meal.strMeal}</h3>
          </div>
        </Link>
      ));
    }
    if (selectedArea !== '') {
      return filterMeals.slice(inicial, final).map((meal, id) => (
        <Link to={ `/comidas/${meal.idMeal}` } key={ id }>
          <div
            key={ id }
            className="recipe-card"
            data-testid={ `${id}-recipe-card` }
          >
            <img
              className="card-img"
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              data-testid={ `${id}-card-img` }
            />
            <h3 data-testid={ `${id}-card-name` }>{meal.strMeal}</h3>
          </div>
        </Link>
      ));
    }
  };

  return (
    <>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ handleClickArea }
      >
        <option
          key="All"
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        {
          areas.map((area, id) => (
            <option
              key={ id }
              data-testid={ `${area.strArea}-option` }
              value={ area.strArea }
            >
              {area.strArea}

            </option>
          ))
        }
      </select>
      {
        renderMeals()
      }
      <Footer />
    </>
  );
}

export default ExploreByArea;
