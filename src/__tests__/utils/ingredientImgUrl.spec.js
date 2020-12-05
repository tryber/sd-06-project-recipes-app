import getIngredientUrl from '../../pages/ExploreIngredients/utils/ingredientImageUrl';

import mealIngredients from '../../fakes/mocks_copy/mealIngredients';
import drinkIngredients from '../../fakes/mocks_copy/drinkIngredients';

const mealIngredientNames = mealIngredients.meals.map((ing) => ing.strIngredient);
const drinkIngredientNames = drinkIngredients.drinks.map((drk) => drk.strIngredient1);

describe('getIngredientUrl function testing', () => {
  it('should correctly return meal ingredients url', () => {
    const mealType = 'comidas';

    mealIngredientNames.forEach((ingredient) => {
      const expectedMealIngUrl = `https://www.themealdb.com/images/ingredients/${ingredient}-Small.png`;

      const url = getIngredientUrl(mealType, ingredient);

      expect(url).toBe(expectedMealIngUrl);
    });
  });

  it('should correctly return drink ingredients url', () => {
    const drinkType = 'bebidas';

    drinkIngredientNames.forEach((ingredient) => {
      const expectedMealIngUrl = `https://www.thecocktaildb.com/images/ingredients/${ingredient}-Small.png`;

      const url = getIngredientUrl(drinkType, ingredient);

      expect(url).toBe(expectedMealIngUrl);
    });
  });

  it('should return null on any other type, cap-sensitive and typos included', () => {
    const typos = [
      'BEBIDAS', 'Bebidas', 'bebida', 'comida', 'COMIDAS', 'Comidas', 'wrong',
    ];

    const fakeIngredient = mealIngredientNames[0];

    typos.forEach((typo) => {
      const url = getIngredientUrl(typo, fakeIngredient);

      expect(url).toBeNull();
    });
  });
});
