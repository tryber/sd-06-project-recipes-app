import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ExploreArea() {
  const [dropdown, setdropdown] = useState();
  const [data, setdata] = useState();

  useEffect(() => {
    const fetchAreaList = async () => {
      const dataAreas = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const jsonAreas = await dataAreas.json();
      setdropdown(jsonAreas.meals);
      const dataFood = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const jsonFood = await dataFood.json();
      setdata(jsonFood.meals);
    };
    fetchAreaList();
  }, []);

  const fetchByArea = async ({ target }) => {
    const dataAreas = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`);
    const jsonAreas = await dataAreas.json();
    setdata(jsonAreas.meals);
  };

  return (
    <div className="content-select-explore">
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ fetchByArea }
        className="select-explore-origin"
      >
        <option value="All" data-testid="All-option">All</option>
        {(dropdown) ? dropdown.map((item, index) => (
          <option
            key={ index }
            data-testid={ `${item.strArea}-option` }
            value={ item.strArea }
          >
            {item.strArea}

          </option>
        ))
          : null}
      </select>
      <div className="wrap-food">
        {(data) ? data.map((item, index) => {
          const TWELVE = 12;
          if (index < TWELVE) {
            return (
              <Link to={ `/comidas/${item.idMeal}` }>
                <div
                  key={ index }
                  data-testid={ `${index}-recipe-card` }
                  className="card-recipe-style"
                >
                  <img
                    src={ item.strMealThumb }
                    alt={ item.strMeal }
                    data-testid={ `${index}-card-img` }
                    className="img-recipe-thumb"
                  />
                  <h5 data-testid={ `${index}-card-name` } className="name-recipe-thumb">
                    {item.strMeal}
                  </h5>
                </div>
              </Link>
            );
          }
          return '';
        })
          : null}
      </div>
    </div>
  );
}
