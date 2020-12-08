import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/MainHeader/Header';
import MealsIngredientCard from '../../components/IngredientsCard/MealsIngredientCard';
import { fetchMeal } from '../../services/mealAPI';
import './style.css';

function MealsIngredients() {
  const [mealsIngredients, setMealsIngredients] = useState([]);
  const maxCards = 12;
  const zero = 0;

  const fetchMealsIngredients = async () => {
    const listIngredients = await fetchMeal('listIngredient', '');
    setMealsIngredients(listIngredients.meals);
  };

  useEffect(() => {
    fetchMealsIngredients();
  }, []);

  if (Object.keys(mealsIngredients).length === zero) {
    return (
      <div className="loading">
        <h2 className="loading-text">Carregando...</h2>
      </div>
    );
  }

  return (
    <div>
      <div className="ingredients-container">
        <Header
          className="header"
          pageTitle="Explorar Ingredientes"
        />
        <div className="ingredients-card-container">
          {
            mealsIngredients.slice(zero, maxCards)
              .map((ingredient, index) => (
                <MealsIngredientCard
                  id={ ingredient.idIngredient }
                  key={ index }
                  ingredient={ ingredient }
                  index={ index }
                />
              ))
          }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MealsIngredients;
