import React, { useContext, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Header, Cards, Footer, Categories } from '../components';
import RecipesContext from '../context/Context';
import useSearch from '../hooks/useSearch';
import '../css/Header.css';
import '../css/Footer.css';
import '../css/Cards.css';
import '../css/Drinks.css';

export default function Drinks({ location }) {
  document.title = 'Bebidas';
  const { items, setItems, filters, setFilters } = useContext(RecipesContext);
  useSearch();

  useEffect(() => {
    if (filters.category === '' && location.state === undefined) {
      setFilters({ ...filters, category: 'bebidas' });
    } if (location.state !== undefined) {
      setFilters({ searchText: location.state,
        searchType: 'ingredient',
        category: 'bebidas' });
    }

    return () => setItems(undefined);
  }, []);

  function handleAlert() {
    if (items && items.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
  }

  return (
    <div className="content-drikns">
      <Header id="bebidas" ingredient={ location.state } />
      <Categories id="bebidas" />
      <Cards id="bebidas" />
      {items ? handleAlert() : null}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.objectOf(PropTypes.any),
};

Drinks.defaultProps = {
  location: { state: '' },
};
