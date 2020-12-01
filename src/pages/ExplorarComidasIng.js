import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ReceitasContext from '../context/ReceitasContext';
import { listIngredients, foodAPI } from '../services/foodAPI';

const ExplorarComidasIng = () => {
  const { setMeals, ingredientList,
    setIngredientList, setStopApi } = useContext(ReceitasContext);

  useEffect(() => {
    listIngredients().then((response) => setIngredientList(response));
    setMeals([{ a: 'b' }]);
  }, []);

  const zero = 0;
  const twelve = 12;

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      {ingredientList && ingredientList.slice(zero, twelve).map((ingred, index) => (
        <Link
          to="/comidas"
          data-testid={ `${index}-ingredient-card` }
          key={ ingred.strIngredient }
          onClick={ () => {
            foodAPI('ingredient', ingred.strIngredient)
              .then((response) => setMeals(response));
            setStopApi(true);
          } }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${ingred.strIngredient}-Small.png` }
            alt={ ingred.strIngredient }
          />
          <span data-testid={ `${index}-card-name` }>{ingred.strIngredient}</span>
        </Link>
      ))}
      <Footer />
    </div>
  );
};

export default ExplorarComidasIng;
