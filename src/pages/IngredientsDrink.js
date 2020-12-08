import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/ingredientCard';
import Context from '../context/Context';

function IngredientsDrink() {
  const FALSE = false;
  const { ingredients, ingredientToRender } = useContext(Context);

  console.log(ingredients);
  useEffect(() => {
    ingredientToRender('drink');
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ FALSE } />
      {
        ingredients.map((ingredient, index) => (
          <IngredientCard
            key={ ingredient.strIngredient1 }
            info={ ingredient }
            recipe="ingredientDrinks"
            index={ index }
          />
        ))
      }
      <Footer />
    </div>
  );
}

export default IngredientsDrink;
