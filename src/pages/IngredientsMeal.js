import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import IngredientCard from '../components/ingredientCard';
import Context from '../context/Context';

function IngredientsMeal() {
  const FALSE = false;
  const { ingredients, ingredientToRender } = useContext(Context);

  useEffect(() => {
    ingredientToRender('meal');
  }, []);
  return (
    <div>
      <Header title="Explorar Ingredientes" search={ FALSE } />
      <div className="recipes-cards">
        {
          ingredients.map((ingredient, index) => (
            <IngredientCard
              key={ ingredient.strIngredient }
              info={ ingredient }
              recipe="ingredientsMeals"
              index={ index }
            />
          ))
        }
      </div>
      <Footer />
    </div>
  );
}

export default IngredientsMeal;
