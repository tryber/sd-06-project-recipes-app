import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Cards, Footer, Header, Categories } from '../components';
import RecipesContext from '../context/Context';
import useSearch from '../hooks/useSearch';
import '../css/Header.css';
import '../css/Foods.css';

export default function Foods({ location }) {
  document.title = 'Comidas';
  const { items, setItems, filters, setFilters } = useContext(RecipesContext);
  useSearch();

  useEffect(() => {
    if (filters.category === '' && location.state === undefined) {
      setFilters({ ...filters, category: 'comidas' });
    } if (location.state !== undefined) {
      setFilters({ searchText: location.state,
        searchType: 'ingredient',
        category: 'comidas' });
    }

    return () => setItems(undefined);
  }, []);

  function handleAlert() {
    if (items && items.meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div className="content-food">
      <Header id="comidas" ingredient={ location.state } />
      <Categories id="comidas" />
      <Cards id="comidas" />
      {items ? handleAlert() : null}
      <Footer />
    </div>
  );
}

Foods.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
};

Foods.defaultProps = {
  location: { state: '' },
};
