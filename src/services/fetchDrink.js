async function fetchDrink(filter, searchTerm = '') {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/';
  switch (filter) {
  case 'ingredient': {
    const fetchByIngredient = await fetch(`${url}filter.php?i=${searchTerm}`);
    try {
      const ingredientResponse = await fetchByIngredient.json();
      return ingredientResponse.drinks;
    } catch (error) {
      return null;
    }
  }

  case 'name': {
    const fetchByName = await fetch(`${url}search.php?s=${searchTerm}`);
    const nameResponse = await fetchByName.json();
    return nameResponse.drinks;
  }

  case 'category': {
    const fetchByCategory = await fetch(`${url}filter.php?c=${searchTerm}`);
    const categoryResponse = await fetchByCategory.json();
    return categoryResponse.drinks;
  }

  case 'firstLetter': {
    const fetchByFirstLetter = await fetch(`${url}search.php?f=${searchTerm}`);
    const firstLetterResponse = await fetchByFirstLetter.json();
    return firstLetterResponse.drinks;
  }

  case 'allIngredients': {
    const fetchAllIngredients = await fetch(`${url}list.php?i=list`);
    const allIngredientsResponse = await fetchAllIngredients.json();
    return allIngredientsResponse.drinks;
  }

  case 'details': {
    const fetchDetails = await fetch(`${url}lookup.php?i=${searchTerm}`);
    const detailsResponse = await fetchDetails.json();
    return detailsResponse.drinks;
  }

  case 'allCategories': {
    const fetchAllCategories = await fetch(`${url}list.php?c=list`);
    const allCategoriesResponse = await fetchAllCategories.json();
    return allCategoriesResponse.drinks;
  }

  default: {
    const fetchRandomDrink = await fetch(`${url}random.php`);
    const randomDrinkResponse = await fetchRandomDrink.json();
    return randomDrinkResponse.drinks;
  }
  }
}

export default fetchDrink;
