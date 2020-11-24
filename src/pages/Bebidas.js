import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Footer from '../components/Footer';
import ReceitasContext from '../context/ReceitasContext';
import DrinksCard from '../components/DrinksCard';
import DrinkFilters from '../components/DrinkFilters';

import { drinkApi } from '../services/drinkAPI';

function Bebidas() {
  const {
    searchBox, drinks, setDrinks, stopApi, setStopApi,
  } = useContext(ReceitasContext);
  const location = useLocation();

  useEffect(() => {
    if (stopApi) {
      return '';
    }
    drinkApi().then((response) => {
      setDrinks(response.drinks);
    });
    return setStopApi(false);
  }, []);

  if (!drinks) return <div>Carregando...</div>;

  const doze = 12;

  return (
    <section>
      <Header title="Bebidas" searchBtn />
      {searchBox && <SearchBar />}
      <DrinkFilters />
      <div>
        {drinks
          .filter((x, index) => index < doze)
          .map((drink, i) => (
            <DrinksCard key={ drink } drink={ drink } index={ i } />
          )) }
      </div>
      {location.pathname === '/bebidas' && <Footer />}
    </section>
  );
}

export default Bebidas;
