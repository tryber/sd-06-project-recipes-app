export const fetchAPIRecipes = async (selectedRadio, endPoint) => {
  let apiResponse = '';

  if (selectedRadio === 'ingredient') {
    const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${endPoint}`);
    apiResponse = await apiRequest.json();
  } else if (selectedRadio === 'name') {
    const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${endPoint}`);
    apiResponse = await apiRequest.json();
  } else {
    if (endPoint.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const apiRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${endPoint}`);
    apiResponse = await apiRequest.json();
  }
  return (apiResponse.meals);
};

export const fetchAPIDrinks = async (selectedRadio, endPoint) => {
  let apiResponse = '';

  if (selectedRadio === 'ingredient') {
    const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${endPoint}`);
    apiResponse = await apiRequest.json();
  } else if (selectedRadio === 'name') {
    const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endPoint}`);
    apiResponse = await apiRequest.json();
  } else {
    if (endPoint.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    const apiRequest = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${endPoint}`);
    apiResponse = await apiRequest.json();
  }
  return (apiResponse.drinks);
};
