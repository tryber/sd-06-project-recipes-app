import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import AppContext from '../context/AppContext';
import fetchRecipes from '../services';

function ExploreDrinkIngredients() {
  const history = useHistory();
  const { setHeader, setOptions } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);

  const getIngredients = async () => {
    const response = await fetchRecipes('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    const ingredientsResponse = response.drinks;
    const twelveIngredients = [];
    const zero = 0;
    const twelve = 12;
    for (let index = zero; index < twelve; index += 1) {
      twelveIngredients.push(ingredientsResponse[index]);
    }
    setIngredients(twelveIngredients);
  };

  useEffect(() => {
    setHeader({ page: 'Explorar Ingredientes', search: false });
    getIngredients();
  }, []);

  const handleIngredientExplore = (index) => {
    const ingredient = ingredients[index].strIngredient1;
    setOptions({ text: ingredient, option: 'Ingrediente', category: '' });
    history.push('/bebidas');
  };

  return (
    <div>
      <Header />
      <div className="bodier">
        {ingredients.map((ingredient, index) => (
          <div
            data-testid={ `${index}-ingredient-card` }
            role="button"
            className="card"
            tabIndex={ index }
            key={ index }
            onClick={ () => handleIngredientExplore(index) }
            onKeyPress={ () => handleIngredientExplore(index) }
          >
            <h4 className="text" data-testid={ `${index}-card-name` }>
              { ingredient.strIngredient1 }
            </h4>
            <img
              className="picture"
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt={ ingredient[`strIngredient${index}`] }
            />
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default ExploreDrinkIngredients;
