import meals from './meals';
import oneMeal from './oneMeal';
import soupMeals from './soupMeals';
import beefMeals from './beefMeals';
import breakfastMeals from './breakfastMeals';
import chickenMeals from './chickenMeals';
import dessertMeals from './dessertMeals';
import goatMeals from './goatMeals';
import emptyMeals from './emptyMeals';
import mealCategories from './mealCategories';
import mealIngredients from './mealIngredients';
import mealsByIngredient from './mealsByIngredient';
import drinks from './drinks';
import oneDrink from './oneDrink';
import ginDrinks from './ginDrinks';
import ordinaryDrinks from './ordinaryDrinks';
import cocktailDrinks from './cocktailDrinks';
import milkDrinks from './milkDrinks';
import otherDrinks from './otherDrinks';
import cocoaDrinks from './cocoaDrinks';
import emptyDrinks from './emptyDrinks';
import drinkCategories from './drinkCategories';
import drinkIngredients from './drinkIngredients';
import drinksByIngredient from './drinksByIngredient';
import areas from './areas';
import japaneseMeals from './japaneseMeals';
import italianMeals from './italianMeals';
import anotherOneDrink from './anotherOneDrink';
import anotherOneMeal from './anotherOneMeal';

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(mealCategories); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(drinkCategories); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(mealIngredients); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') { return Promise.resolve(mealsByIngredient); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list') { return Promise.resolve(drinkIngredients); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Light rum') { return Promise.resolve(drinksByIngredient); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?a=list') { return Promise.resolve(areas); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Japanese') { return Promise.resolve(japaneseMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?a=Italian') { return Promise.resolve(italianMeals); }

    if (
      url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata'
      || url === 'https://www.themealdb.com/api/json/v1/1/random.php'
      || url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52771'
    ) { return Promise.resolve(oneMeal); }

    if (
      url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Aquamarine'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/random.php'
      || url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=178319'
    ) { return Promise.resolve(oneDrink); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=soup') { return Promise.resolve(soupMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Beef') { return Promise.resolve(beefMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Breakfast') { return Promise.resolve(breakfastMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken') { return Promise.resolve(chickenMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert') { return Promise.resolve(dessertMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?c=Goat') { return Promise.resolve(goatMeals); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=xablau') { return Promise.resolve(emptyMeals); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=gin') { return Promise.resolve(ginDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Ordinary Drink') { return Promise.resolve(ordinaryDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail') { return Promise.resolve(cocktailDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Milk / Float / Shake') { return Promise.resolve(milkDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Other/Unknown') { return Promise.resolve(otherDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocoa') { return Promise.resolve(cocoaDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=xablau') { return Promise.resolve(emptyDrinks); }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinks); }

    if (url === 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52929') { return Promise.resolve(anotherOneMeal) }

    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=17837') { return Promise.resolve(anotherOneDrink) }

    return Promise.resolve(meals);
  },
});

module.exports = fetch;
