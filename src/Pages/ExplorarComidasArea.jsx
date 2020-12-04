import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Footer } from '../Components';
import recipeRequest from '../services/recipeRequest';

function ExplorarComidasArea() {
  const [areas, setAreas] = useState([]);
  const [foodsArea, setFoodsArea] = useState([]);
  const TEN = 12;
  const getAreas = async () => {
    const response = await recipeRequest('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const foods = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    await setAreas(response.meals);
    await setFoodsArea(foods.meals);
  };
  useEffect(() => {
    getAreas();
  }, []);

  const handleSelect = async ({ target }) => {
    if (target.id === 'All') {
      const data = await recipeRequest('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      await setFoodsArea(data.meals);
    } else {
      const data = await recipeRequest(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
      await setFoodsArea(data.meals);
    }
  };

  return (
    <div>
      <Header pageName="Explorar Origem " />
      <div style={ { marginTop: '80px' } }>
        <select
          name="areas"
          data-testid="explore-by-area-dropdown"
          onChange={ handleSelect }
        >
          <option data-testid="All-option">All</option>
          {areas
            .map(({ strArea }) => (
              <option key={ strArea } data-testid={ `${strArea}-option` }>
                {strArea}
              </option>
            ))}
        </select>
        <div>
          {foodsArea.length >= 1 && foodsArea
            .filter((_, index) => index < TEN)
            .map((food, indexs) => (
              <Link
                data-testid={ `${indexs}-recipe-card` }
                key={ indexs }
                to={ `/comidas/${food.idMeal}` }
              >
                <img
                  data-testid={ `${indexs}-card-img` }
                  width="120"
                  src={ food.strMealThumb }
                  alt={ food.strMeal }
                />
                <h3 data-testid={ `${indexs}-card-name` }>{food.strMeal}</h3>
              </Link>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ExplorarComidasArea;
