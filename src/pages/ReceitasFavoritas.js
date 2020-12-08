import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import whiteIcon from '../images/whiteHeartIcon.svg';
import blackIcon from '../images/blackHeartIcon.svg';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import MealsContext from '../context/MealsContext';
/* import useCopyToClipboard from '../services/clipboard-copy'; */
function ReceitasFavoritas() {
  // const favoriteRecipes = JSON.parse(localStorage.favoriteRecipes);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(true);
  const { recipeMeal } = useContext(MealsContext);
  const { id } = useParams();
  /* const timeoutTextCopy = 2000;
  const [isCopied, handleCopy] = useCopyToClipboard(timeoutTextCopy); */
  useEffect(() => {
    if (!localStorage.favoriteRecipes) {
      return <p>Você ainda não tem nenhuma receita pronta.</p>;
    }
    setFavoriteRecipes(JSON.parse(localStorage.favoriteRecipes));
  }, []);
  const filterRecipes = ({ innerText }) => {
    if (innerText === 'Food') {
      const newDone = favoriteRecipes.filter((done) => (
        done.type === 'comida'
      ));
      setFavoriteRecipes(newDone);
    } else if (innerText === 'Drinks') {
      const newDone = favoriteRecipes.filter((done) => (
        done.type === 'bebida'
      ));
      setFavoriteRecipes(newDone);
    } else {
      setFavoriteRecipes(JSON.parse(localStorage.favoriteRecipes));
    }
  };
  console.log('testRecipemelas', recipeMeal);
  function FavoriteRecipeClick() {
    // eslint-disable-next-line no-shadow
    const favoriteRecipesC = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipesC !== null) {
      if (isFavorite) {
        console.log('ok', recipeMeal);
        const arrayFavoriteRecipe = favoriteRecipesC.filter((item) => item.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(false);
      } else {
        const newFavoriteRecipe = {
          id: recipeMeal.idMeal,
          type: 'comida',
          area: recipeMeal.strArea,
          category: recipeMeal.strCategory,
          alcoholicOrNot: '',
          name: recipeMeal.strMeal,
          image: recipeMeal.strMealThumb,
        };
        const arrayFavoriteRecipe = [...favoriteRecipes, newFavoriteRecipe];
        localStorage.setItem('favoriteRecipes', JSON.stringify(arrayFavoriteRecipe));
        setIsFavorite(true);
      }
    }
  }

  return (
    <>
      <Header />
      <button
        className="button-all"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        Food
      </button>
      <button
        className="button-drink"
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ ({ target }) => { filterRecipes(target); } }
      >
        Drinks
      </button>
      {favoriteRecipes.map((recipe, index) => (
        <div key={ index }>
          <Link
            to={ recipe.type === 'bebida' ? `/bebidas/${recipe.id}`
              : `/comidas/${recipe.id}` }
          >
            <p data-testid={ `${index}-horizontal-name` }>
              { recipe.name }
            </p>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'comida' ? `${recipe.area} - ${recipe.category}`
              : `${recipe.alcoholicOrNot} - ${recipe.category}` }
          </p>
          {console.log(recipe)}
          <button
            data-testid={ `${index}-horizontal-share-btn` }
            type="button"
            src={ shareIcon }
          >
            <img
              src={ shareIcon }
              alt="Compatilhar Receita"
            />
          </button>
          <button
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="button"
            onClick={ FavoriteRecipeClick }
            src={ isFavorite ? blackIcon : whiteIcon }
          >
            <img
              src={ isFavorite ? blackIcon : whiteIcon }
              alt="Desfavoritar Receita"
            />
          </button>
          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.category }
          </p>
        </div>
      ))}
    </>
  );
}

export default ReceitasFavoritas;
