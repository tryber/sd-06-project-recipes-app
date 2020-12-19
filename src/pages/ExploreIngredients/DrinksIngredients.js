import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import DrinksIngredientCard from '../../components/DrinksIngredientCard';
import { fetchDrink } from '../../services/cocktailAPI';

function DrinksIngredients() {
  const [drinksIngredients, setDrinksIngredients] = useState([]);
  const maxCards = 12;
  const zero = 0;

  const fetchDrinksIngredients = async () => {
    const listIngredient = await fetchDrink('listIngredient', '');
    console.log('fetch drinks', listIngredient);
    setDrinksIngredients(listIngredient.drinks);
  };

  useEffect(() => {
    fetchDrinksIngredients();
  }, []);

  return (
    <div>
      <Header
        className="header"
        pageTitle="Explorar Ingredientes"
      />
      {
        drinksIngredients.slice(zero, maxCards)
          .map((ingredient, index) => (
            <DrinksIngredientCard
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

export default DrinksIngredients;
