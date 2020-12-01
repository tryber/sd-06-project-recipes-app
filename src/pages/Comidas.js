import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MealsCard from '../components/MealsCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ReceitasContext from '../context/ReceitasContext';
import FoodFilters from '../components/FoodFilters';
import { foodAPI, foodCategoryApi } from '../services/foodAPI';
import logo from '../images/myfood.png';
import '../style/Loading.css';

const Comidas = (history) => {
  const {
    searchBox, meals, setMeals, setFiltersData, selectedFilter,
  } = useContext(ReceitasContext);
  const [isFetching, setFetching] = useState(true);

  const location = useLocation();
  const doze = 12;

  useEffect(() => {
    setFetching(true);

    async function fetchFood() {
      const data = await foodCategoryApi();
      const responseFoodsAPI = await foodAPI('name', selectedFilter);

      setFiltersData(data);
      setMeals(responseFoodsAPI);
      setFetching(false);
    }

    fetchFood();
  }, [selectedFilter]);

  return isFetching ? (
    <div>
      <img src={ logo } alt="teste" className="loading" />
    </div>
  ) : (
    <section>
      <Header title="Comidas" searchBtn />
      {searchBox && <SearchBar history={ history } />}
      <div className="my-4 py-2">
        <FoodFilters />
        <div className="row">
          {meals.length && meals
            .filter((x, index) => index < doze)
            .map((food, i) => <MealsCard key={ i } food={ food } index={ i } />)}
        </div>
      </div>
      {location.pathname === '/comidas' && <Footer />}
    </section>
  );
};

export default Comidas;
