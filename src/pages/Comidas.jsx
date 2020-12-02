import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import Context from '../context/Context';
import Lupa from '../Components/Lupa';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';
import FoodCard from '../Components/FoodCard';
import * as api from '../services/Api';

export default function Comidas({ history }) {
  const {
    titulo,
    setTitulo,
    setLoading,
    loading,
    meals,
    mealsByIngredient,
    setMeals,
    setMealsByIngredient,
    showMealsByIngredient,
    search } = useContext(Context);
  const [hidden, setHidden] = useState(true);
  const [selected] = useState(false);

  const onClick = () => {
    setHidden(!hidden);
  };

  const categories = ['Beef', 'Goat', 'Chicken', 'Breakfast', 'Dessert'];

  const fetchFoods = async () => {
    setLoading(true);
    const imeals = await api.fetchFoodByName('');
    setMeals(imeals);
    setLoading(false);
  };

  useEffect(() => {
    setTitulo('Comidas');
    fetchFoods();
  }, []);

  useEffect(() => {
    if (meals.length === 1 && search) {
      history.push(`/comidas/${meals[0].idMeal}`);
    }
  }, [meals]);

  const clickDetails = (id) => {
    history.push(`/comidas/${id}`);
  };

  const clickCategory = async ({ target }) => {
    if (target.selected === false) {
      setLoading(true);
      const cmeals = await api.fetchFoodByCategory(target.value);
      setMeals(cmeals);
      setLoading(false);
    }
    if (target.selected === true) {
      fetchFoods();
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
          onClick={ () => fetchFoods() }
          data-testid="All-category-filter"
          className="btn btn-warning flex-grow-1 m-1"
        >
          All
        </button>
        {
          categories.map((categorie) => (
            <button
              data-testid={ `${categorie}-category-filter` }
              selected={ selected }
              key={ categorie }
              type="button"
              value={ categorie }
              onClick={ clickCategory }
              className="btn btn-warning flex-grow-1 m-1"
            >
              {categorie}
            </button>
          ))
        }
        { hidden ? '' : <SearchBar /> }
      </div>
      <div className="container d-flex flex-wrap">
        {
          loading || showMealsByIngredient ? <p> Loading </p>
            : meals.filter((meal, index) => meal && index < twelve)
              .map((meal, index) => (
                <button
                  className="btn text-warning font-weight-bold flex-grow-1"
                  type="button"
                  key={ meal.idMeal }
                  onClick={ () => clickDetails(meal.idMeal) }
                >
                  <FoodCard food={ meal } index={ index } />
                </button>))
        }
        {
          !mealsByIngredient ? <p>Loading</p>
            : mealsByIngredient
              .map((meal, index) => (
                <button
                  className="btn text-warning font-weight-bold flex-grow-1"
                  type="button"
                  key={ meal.idMeal }
                  onClick={ () => clickDetails(meal.idMeal) }
                >
                  <FoodCard food={ meal } index={ index } />
                </button>))
        }
      </div>
      <br />
      <br />
      <Footer />
    </div>
  );
}

Comidas.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
