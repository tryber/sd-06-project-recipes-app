async function fetchMeal(filter, searchTerm = '') {
  const url = 'https://www.themealdb.com/api/json/v1/1/';

  switch (filter) {
  case 'ingredient': {
    const fetchByIngredient = await fetch(`${url}filter.php?i=${searchTerm}`);
    const ingredientResponse = await fetchByIngredient.json();
    return ingredientResponse.meals;
  }

  case 'name': {
    const fetchByName = await fetch(`${url}search.php?s=${searchTerm}`);
    const nameResponse = await fetchByName.json();
    return nameResponse.meals;
  }

  case 'category': {
    const fetchCategory = await fetch(`${url}filter.php?c=${searchTerm}`);
    const categoryResponse = await fetchCategory.json();
    return categoryResponse.meals;
  }

  case 'firstLetter': {
    const fetchByFirstLetter = await fetch(`${url}search.php?f=${searchTerm}`);
    const firstLetterResponse = await fetchByFirstLetter.json();
    return firstLetterResponse.meals;
  }

  case 'area': {
    const fetchByArea = await fetch(`${url}filter.php?a=${searchTerm}`);
    const areaResponse = await fetchByArea.json();
    return areaResponse.meals;
  }

  case 'allIngredients': {
    const fetchAllIngredients = await fetch(`${url}list.php?i=list`);
    const allIngredientsResponse = await fetchAllIngredients.json();
    return allIngredientsResponse.meals;
  }

  case 'allAreas': {
    const fetchAllAreas = await fetch(`${url}list.php?a=list`);
    const allAreasResponse = await fetchAllAreas.json();
    return allAreasResponse.meals;
  }

  case 'allCategories': {
    const fetchAllCategories = await fetch(`${url}list.php?c=list`);
    const allCategoriesResponse = await fetchAllCategories.json();
    return allCategoriesResponse.meals;
  }

  case 'details': {
    const fetchDetails = await fetch(`${url}lookup.php?i=${searchTerm}`);
    const detailsResponse = await fetchDetails.json();
    return detailsResponse.meals;
  }

  default: {
    const fetchRandomMeal = await fetch(`${url}random.php`);
    const randomMealResponse = await fetchRandomMeal.json();
    return randomMealResponse.meals;
  }
  }
}

export default fetchMeal;
