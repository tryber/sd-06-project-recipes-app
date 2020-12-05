import parseIngredientAndMeasures from '../../utils/parseIngredientAndMeasures';

import oneMeal from '../../fakes/mocks_copy/oneMeal';
import oneDrink from '../../fakes/mocks_copy/oneDrink';

const singleMeal = oneMeal.meals[0];
const singleDrink = oneDrink.drinks[0];

describe('Parse recipe ingredients testing', () => {
  it('should parse and return the correct food structure', () => {
    const expectedIngredientList = [
      `${singleMeal.strIngredient1} - ${singleMeal.strMeasure1}`,
      `${singleMeal.strIngredient2} - ${singleMeal.strMeasure2}`,
      `${singleMeal.strIngredient3} - ${singleMeal.strMeasure3}`,
      `${singleMeal.strIngredient4} - ${singleMeal.strMeasure4}`,
      `${singleMeal.strIngredient5} - ${singleMeal.strMeasure5}`,
      `${singleMeal.strIngredient6} - ${singleMeal.strMeasure6}`,
      `${singleMeal.strIngredient7} - ${singleMeal.strMeasure7}`,
      `${singleMeal.strIngredient8} - ${singleMeal.strMeasure8}`,
    ];

    const receivedList = parseIngredientAndMeasures(singleMeal);

    expect(receivedList).toStrictEqual(expectedIngredientList);
  });

  it('should parse and return the correct drink structure', () => {
    const expectedIngredientList = [
      `${singleDrink.strIngredient1} - ${singleDrink.strMeasure1}`,
      `${singleDrink.strIngredient2} - ${singleDrink.strMeasure2}`,
      `${singleDrink.strIngredient3} - ${singleDrink.strMeasure3}`,

    ];

    const receivedList = parseIngredientAndMeasures(singleDrink);

    expect(receivedList).toStrictEqual(expectedIngredientList);
  });
});
