import React, { useEffect, useState, useContext } from 'react';
import { fetchArea, fetchRecipes } from '../helpers/Helper';

import RecipesContext from '../context/Context';
import useSearch from '../hooks/useSearch';
import { Cards, Footer, Header } from '../components';

export default function RegionFoods() {
  document.title = 'Explorar Origem';
  const [area, setArea] = useState();
  const [search, setSearch] = useState('All');

  const { filters, setFilters, setItems } = useContext(RecipesContext);
  useSearch();

  useEffect(() => {
    async function fetch() {
      const response = await fetchArea();
      setArea(response);
    }
    fetch();
  }, []);

  useEffect(() => {
    async function fetch() {
      const response = await fetchRecipes(search);
      setItems(response);
    }
    if (search !== 'All') {
      fetch();
    }
    if (search === 'All') {
      setFilters({ ...filters, category: 'comidas' });
    }
  }, [search]);

  function handleDropdown() {
    if (area) {
      return (
        <select
          data-testid="explore-by-area-dropdown"
          onChange={ (e) => setSearch(e.target.value) }
        >
          <option data-testid="All-option">All</option>
          {area.map((item, index) => (
            <option
              key={ index }
              data-testid={ `${item.strArea}-option` }
            >
              {item.strArea}
            </option>
          ))}
        </select>
      );
    }
  }

  return (
    <div>
      <Header id="comidas" />
      {handleDropdown()}
      <Cards id="comidas" />
      <Footer />
    </div>
  );
}
