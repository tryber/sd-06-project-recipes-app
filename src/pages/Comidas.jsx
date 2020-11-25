import React, { useContext, useEffect, useState } from 'react';
import Header from '../Components/Header';
import Context from '../context/Context';
import Lupa from '../Components/Lupa';
import SearchBar from '../Components/SearchBar';
import Footer from '../Components/Footer';
import FoodCard from '../Components/FoodCard';
import * as api from '../services/Api';

export default function Comidas() {
  const { titulo, setTitulo, setLoading, loading, meals, mealsByIngredients } = useContext(Context);
  const [hidden, setHidden] = useState(true);
  const [initMeals, setInitMeals] = useState([]);

  const onClick = () => {
    setHidden(!hidden);
  };

  // const fetchFoods = async () => {
  //   setLoading(true);
  //   const imeals = await api.fetchFoodByName('');
  //   setInitMeals(imeals);
  //   setLoading(false);
  // };

  useEffect(() => {
    setTitulo('Comidas');
    // fetchFoods();
  }, []);

  // const renderMeals = () => {
  //   const zero = 0;
  //   const inicial = initMeals.length === zero;
  //   const search = meals.lenght === zero ;
  //   const ingreds = mealsByIngredients.length === zero;
  //   if(inicial && !search)
  // };

  return (
    <div>
      <Header titulo={ titulo } />
      <Lupa onClick={ onClick } />
      {hidden ? '' : <SearchBar />}
      <h1>{ titulo }</h1>
      {loading ? <p>Loading</p>
        : meals.map((meal) => <FoodCard key={ meal.idMeal } food={ meal } />)}
      {/* {loading ? <p>Loading</p>
        : mealsByIngredients
          .map((meal) => <FoodCard key={ meal.idMeal } food={ meal } />)} */}
      <Footer />
    </div>
  );
}
