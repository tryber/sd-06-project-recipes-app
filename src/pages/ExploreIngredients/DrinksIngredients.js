import React, { useState, useEffect } from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/MainHeader/Header';
import DrinksIngredientCard from '../../components/IngredientsCard/DrinksIngredientCard';
import { fetchDrink } from '../../services/cocktailAPI';
import './style.css';

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

  if (Object.keys(drinksIngredients).length === zero) {
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
            drinksIngredients.slice(zero, maxCards)
              .map((ingredient, index) => (
                <DrinksIngredientCard
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

export default DrinksIngredients;
