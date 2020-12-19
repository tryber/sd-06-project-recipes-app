import React, { useContext, useEffect, useState } from 'react';
import { Header, Footer, MealsRecipesCards } from '../components';
import RecipesContext from '../context/RecipesContext';

function ComidasPorLocalOrigem() {
  const [areas, setAreas] = useState([]);
  const { data, setData } = useContext(RecipesContext);

  const fetchAPI = () => {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    return fetch(URL)
      .then(((response) => response.json().then((json) => (
        response.ok ? Promise.resolve(json) : Promise.reject(json)
      ))));
  };

  const mealsArea = (area) => {
    let URL;
    if (area === 'All') {
      URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    } else {
      URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`;
    }
    return fetch(URL)
      .then(((response) => response.json().then((json) => (
        response.ok ? Promise.resolve(json) : Promise.reject(json)
      ))))
      .then((response) => setData([response, data[1]]));
  };

  useEffect(() => {
    fetchAPI().then((response) => setAreas(response.meals));
  }, []);

  return (
    <div>
      <Header title="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target: { value } }) => mealsArea(value) }
      >
        <option
          data-testid="All-option"
          value="All"
        >
          All
        </option>
        { areas.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            key={ strArea }
            value={ strArea }
          >
            { strArea }
          </option>
        )) }
      </select>
      <MealsRecipesCards categories="none" />
      <Footer />
    </div>
  );
}

export default ComidasPorLocalOrigem;
