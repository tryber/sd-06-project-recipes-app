import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipeContext from '../context/RecipeContext';

function ExploreDrinkIngredient() {
  const [drinkIngredients, setDrinkIngredients] = useState([]);
  const { setDrinkCategories, setCurrentDrinkExplore } = useContext(RecipeContext);

  const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

  useEffect(() => {
    const fecthDrinks = async () => {
      const APIRequest = await fetch(url);
      const APIResponse = await APIRequest.json();
      if (APIResponse !== null) {
        setDrinkIngredients(APIResponse.drinks);
      }
    };
    fecthDrinks();
  }, []);

  const incial = 0;
  const final = 12;

  const handleClickSetCategories = ({ target }) => {
    setDrinkCategories(target.value);
    setCurrentDrinkExplore(true);
  };

  return (
    <>
      <Header title="Explorar Ingredientes" />
      {
        drinkIngredients.slice(incial, final)
          .map((ingredient, index) => (
            <>
              <h3
                data-testid={ `${index}-card-name` }
                value={ ingredient.strIngredient1 }
              >
                {ingredient.strIngredient1}
              </h3>
              <img
                src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
                alt="ingredient"
                data-testid={ `${index}-card-img` }
                value={ ingredient.strIngredient1 }
              />
              <Link
                to="/bebidas"
                key={ index }
                data-testid={ `${index}-ingredient-card` }
                value={ ingredient.strIngredient1 }
                onClick={ handleClickSetCategories }
              >
                <button
                  type="button"
                  value={ ingredient.strIngredient1 }
                  onClick={ handleClickSetCategories }
                >
                  explorar
                </button>
              </Link>
            </>
          ))
      }
      <Footer />
    </>
  );
}

export default ExploreDrinkIngredient;
