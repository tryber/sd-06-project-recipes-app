import React from 'react';
import { useLocation } from 'react-router-dom';
import DrinkDetails from '../components/DrinkDetails';
import MealDetails from '../components/MealDetails';

function MenuDetails() {
  // Será usado para pegar o pathname ("comidas" ou "bebidas")
  const location = useLocation();

  return (
    <div>
      { location.pathname.includes('comidas')
        ? <MealDetails />
        : <DrinkDetails />}
    </div>
  );
}

export default MenuDetails;
