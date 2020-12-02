import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Header from '../Components/Header';
import Lupa from '../Components/Lupa';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';
import DrinkCard from '../Components/DrinkCard';
import * as api from '../services/Api';

export default function Bebidas({ history }) {
  const {
    titulo,
    setTitulo,
    loading,
    setLoading,
    drinks,
    drinksByIngredient,
    setDrinks,
    showDrinksByIngredient } = useContext(Context);
  const [hidden, setHidden] = useState(true);
  const [selected] = useState(false);

  const onClick = () => {
    setHidden(!hidden);
  };

  const categories = [
    'Ordinary Drink',
    'Cocktail',
    'Milk / Float / Shake',
    'Other/Unknown',
    'Cocoa'];

  const fetchDrinks = async () => {
    setLoading(true);
    const idrinks = await api.fetchDrinkByName('');
    setDrinks(idrinks);
    // setSelected(false);
    setLoading(false);
  };

  useEffect(() => {
    setTitulo('Bebidas');
    fetchDrinks();
  }, []);

  useEffect(() => {
    if (drinks.length === 1) {
      history.push(`/bebidas/${drinks[0].idDrink}`);
    }
  }, [drinks]);

  const clickDetails = (id) => {
    history.push(`/bebidas/${id}`);
  };

  const clickCategory = async ({ target }) => {
    if (target.selected === false) {
      setLoading(true);
      const cdrinks = await api.fetchDrinkByCategory(target.value);
      setDrinks(cdrinks);
      setLoading(false);
    }
    if (target.selected === true) {
      fetchDrinks();
    }
    // setSelected(!selected);
  };

  const twelve = 12;

  return (
    <div>
      <Header titulo={ titulo } />
      <Lupa onClick={ onClick } />
      <div className="container d-flex flex-wrap justify-content-around mb-1">
        <button
          type="button"
          onClick={ () => fetchDrinks() }
          data-testid="All-category-filter"
          className="btn btn-warning flex-grow-1 m-1"
        >
          All
        </button>
        {categories.map((categorie) => (
          <button
            data-testid={ `${categorie}-category-filter` }
            selected={ selected }
            key={ categorie }
            type="button"
            value={ categorie }
            onClick={ clickCategory }
            className="btn btn-warning flex-grow-1 m-1 mb-0"
          >
            {categorie}
          </button>
        ))}
        {hidden ? '' : <SearchBar />}
      </div>
      <div className="container d-flex flex-wrap">
        {loading || showDrinksByIngredient ? <p> </p>
          : drinks.filter((drink, index) => drink && index < twelve)
            .map((drink, index) => (
              <button
                className="btn text-warning font-weight-bold flex-grow-1"
                type="button"
                key={ drink.idDrink }
                onClick={ () => clickDetails(drink.idDrink) }
              >
                <DrinkCard drink={ drink } index={ index } />
              </button>))}
        {!drinksByIngredient ? <p>Loading</p>
          : drinksByIngredient
            .filter((drink, index) => drink && index < twelve)
            .map((drink, index) => (
              <button
                className="btn text-warning font-weight-bold flex-grow-1"
                type="button"
                key={ drink.idDrink }
                onClick={ () => clickDetails(drink.idDrink) }
              >
                <DrinkCard drink={ drink } key={ drink.idDrink } index={ index } />
              </button>))}
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

Bebidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
