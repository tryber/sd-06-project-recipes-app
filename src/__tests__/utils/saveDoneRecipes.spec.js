import oneMeal from '../../fakes/mocks_copy/oneMeal';
import oneDrink from '../../fakes/mocks_copy/oneDrink';

import saveDoneRecipes from '../../hooks/utils/saveDoneRecipes';
import LocalStorageFake from '../../fakes/localStorage';
import previouslyDoneRecipes from '../../fakes/recipes/done';

let localStorageFake;
let localSetItem;

const mealToSave = oneMeal.meals[0];
const drinkToSave = oneDrink.drinks[0];
const fakeNow = 1606254408524;
const expectedDate = new Date(fakeNow);
const localKey = 'doneRecipes';

describe('save done recipes standard testing', () => {
  beforeEach(() => {
    localStorageFake = new LocalStorageFake();

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);
    jest.spyOn(Date, 'now').mockImplementation(() => fakeNow);

    localSetItem = jest.spyOn(localStorageFake, 'setItem');
  });

  it('should correctly save a food recipe to localStorage', () => {
    const mealType = 'comidas';
    const expectedTags = mealToSave.strTags.split(',');
    const id = mealToSave.idMeal;

    const expectedMealFormat = {
      alcoholicOrNot: '',
      area: mealToSave.strArea,
      category: mealToSave.strCategory,
      doneDate: expectedDate,
      id,
      image: mealToSave.strMealThumb,
      name: mealToSave.strMeal,
      tags: expectedTags,
      type: 'comida',
    };

    saveDoneRecipes(mealType, mealToSave);

    expect(localSetItem).toHaveBeenCalled();

    const savedRecipes = localStorageFake.store[localKey];

    const recipeWasSaved = savedRecipes.find((recipe) => recipe.id === id);

    expect(recipeWasSaved).toBeTruthy();
    expect(recipeWasSaved).toStrictEqual(expectedMealFormat);
  });

  it('should correctly save a drink recipe to localStorage', () => {
    const mealType = 'bebidas';
    const id = drinkToSave.idDrink;

    const expectedDrinkFormat = {
      alcoholicOrNot: drinkToSave.strAlcoholic,
      area: '',
      category: drinkToSave.strCategory,
      doneDate: expectedDate,
      id,
      image: drinkToSave.strDrinkThumb,
      name: drinkToSave.strDrink,
      tags: [],
      type: 'bebida',
    };

    saveDoneRecipes(mealType, drinkToSave);

    expect(localSetItem).toHaveBeenCalled();

    const savedRecipes = localStorageFake.store[localKey];

    const recipeWasSaved = savedRecipes.find((recipe) => recipe.id === id);

    expect(recipeWasSaved).toBeTruthy();
    expect(recipeWasSaved).toStrictEqual(expectedDrinkFormat);
  });
});

describe('should not delete any pre-existent data', () => {
  beforeEach(() => {
    localStorageFake = new LocalStorageFake();

    localStorageFake.setItem('doneRecipes', previouslyDoneRecipes);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);
    jest.spyOn(Date, 'now').mockImplementation(() => fakeNow);

    localSetItem = jest.spyOn(localStorageFake, 'setItem');
  });

  it('should correctly ADD a food recipe to localStorage', () => {
    const mealType = 'comidas';
    const expectedTags = mealToSave.strTags.split(',');
    const id = mealToSave.idMeal;

    const expectedMealFormat = {
      alcoholicOrNot: '',
      area: mealToSave.strArea,
      category: mealToSave.strCategory,
      doneDate: expectedDate,
      id,
      image: mealToSave.strMealThumb,
      name: mealToSave.strMeal,
      tags: expectedTags,
      type: 'comida',
    };

    saveDoneRecipes(mealType, mealToSave);

    expect(localSetItem).toHaveBeenCalled();

    const savedRecipes = localStorageFake.store[localKey];
    const previousLength = previouslyDoneRecipes.length;
    const expectedNewLength = previousLength + 1;

    expect(savedRecipes.length).toBe(expectedNewLength);

    // new recipe was saved
    const recipeWasSaved = savedRecipes.find((recipe) => recipe.id === id);
    expect(recipeWasSaved).toStrictEqual(expectedMealFormat);

    // old recipes were kept in place
    const previouslyRecipesPreserved = previouslyDoneRecipes.every((doneRecipe) => {
      const recipeStillThere = savedRecipes.find((recipe) => recipe.id === doneRecipe.id);

      return recipeStillThere;
    });

    expect(previouslyRecipesPreserved).toBeTruthy();
  });

  it('should correctly ADD a drink recipe to localStorage', () => {
    const mealType = 'bebidas';
    const id = drinkToSave.idDrink;

    const expectedDrinkFormat = {
      alcoholicOrNot: drinkToSave.strAlcoholic,
      area: '',
      category: drinkToSave.strCategory,
      doneDate: expectedDate,
      id,
      image: drinkToSave.strDrinkThumb,
      name: drinkToSave.strDrink,
      tags: [],
      type: 'bebida',
    };

    saveDoneRecipes(mealType, drinkToSave);

    expect(localSetItem).toHaveBeenCalled();

    const savedRecipes = localStorageFake.store[localKey];
    const previousLength = previouslyDoneRecipes.length;
    const expectedNewLength = previousLength + 1;

    expect(savedRecipes.length).toBe(expectedNewLength);

    // new recipe was saved
    const recipeWasSaved = savedRecipes.find((recipe) => recipe.id === id);
    expect(recipeWasSaved).toStrictEqual(expectedDrinkFormat);

    // old recipes were kept in place
    const previouslyRecipesPreserved = previouslyDoneRecipes.every((doneRecipe) => {
      const recipeStillThere = savedRecipes.find((recipe) => recipe.id === doneRecipe.id);

      return recipeStillThere;
    });

    expect(previouslyRecipesPreserved).toBeTruthy();
  });
});
