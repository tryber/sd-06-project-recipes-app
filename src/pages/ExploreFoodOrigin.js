import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import FetchApiFood from '../services/FetchApiFood';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodOrigin() {
  const {
    areaDropdown,
    setAreaDropdown,
    fetchFood,
    setFetchFood,
  } = useContext(RecipesContext);
  const inicio = 0;
  const fim = 12;

  useEffect(() => {
    FetchApiFood('foodOrigin', setAreaDropdown);
    FetchApiFood('name', setFetchFood);
  }, []);

  useEffect(() => {
    console.log(fetchFood);
  }, [fetchFood]);

  const handleChange = (value) => {
    if (value === 'All') {
      FetchApiFood('name', setFetchFood);
    } else if (value !== 'All') {
      FetchApiFood('filterOrigin', setFetchFood, value);
    }
  };

  return (
    <div>
      <Header />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target }) => handleChange(target.value) }
      >
        <option value="All" data-testid="All-option">All</option>
        {areaDropdown.map((area, index) => (
          <option
            value={ area.strArea }
            key={ index }
            data-testid={ `${area.strArea}-option` }
          >
            { area.strArea }
          </option>
        ))}
      </select>
      <section>
        {fetchFood ? fetchFood.map((el, idx) => (
          <div
            key={ idx }
            data-testid={ `${idx}-recipe-card` }
          >
            <p data-testid={ `${idx}-card-name` }>{el.strMeal}</p>
            <a
              href={ `/comidas/${el.idMeal}` }
            >
              <img
                data-testid={ `${idx}-card-img` }
                src={ el.strMealThumb }
                alt="food-pic"
              />
            </a>
          </div>
        )).splice(inicio, fim) : null}
      </section>
      <Footer />
    </div>
  );
}

export default ExploreFoodOrigin;
