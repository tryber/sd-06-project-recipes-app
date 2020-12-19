import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import MealsIngredientCard from '../../components/MealsIngredientCard';
import { fetchMeal } from '../../services/mealAPI';

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
  console.log('ingredientes api', mealsIngredients);

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Ingredientes"
      />
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default MealsIngredients;
