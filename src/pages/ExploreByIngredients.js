import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/IngredientCard';
import { requestByIngredients } from '../services/requestsAPI';

function ExploreByIngredientsFoods() {
  const [ingredients, setIngredients] = useState([]);
  const zero = 0;
  const twelve = 12;

  useEffect(() => {
    async function fetchData() {
      const fetchResult = await requestByIngredients();
      setIngredients(fetchResult.meals);
    }
    fetchData();
  }, []);
  console.log(ingredients);
  return (
    <div>
      <Header />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div>
        {ingredients && ingredients.slice(zero, twelve)
          .map((ingredient, index) => (<IngredientCard
            ingredient={ ingredient }
            index={ index }
            key={ ingredient.idIngredient }
          />))}
      </div>
      <Footer />
    </div>
  );
}

export default ExploreByIngredientsFoods;
