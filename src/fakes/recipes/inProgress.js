import oneMeal from '../mocks_copy/oneMeal'
import oneDrink from '../mocks_copy/oneDrink'

const mealID = oneMeal.meals[0].idMeal;
const drinkID = oneDrink.drinks[0].idDrink;

const inProgressRecipes = {
  meals: {
    [mealID]: ['0', '1', '2']
  },

  cocktails: {
    [drinkID]: ['0', '1']
  },
}

export default inProgressRecipes;
