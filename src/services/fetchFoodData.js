const fetchFoodData = async (filterType, query) => {
  let endpoint;
  const url = 'https://www.themealdb.com/api/';
  if (filterType === 'name-filter') {
    endpoint = 'json/v1/1/search.php?s=';
  } else if (filterType === 'ingredient-filter') {
    endpoint = 'json/v1/1/filter.php?i=';
  } else if (filterType === 'first-letter-filter') {
    endpoint = 'json/v1/1/search.php?f=';
  } else if (filterType === 'category-filter') {
    endpoint = 'json/v1/1/filter.php?c=';
  } else if (filterType === 'area-filter') {
    endpoint = 'json/v1/1/filter.php?a=';
  } else if (filterType === 'random-filter') {
    endpoint = 'json/v1/1/random.php';
  } else if (filterType === 'id-filter') {
    endpoint = 'json/v1/1/lookup.php?i=';
  }

  const response = await fetch(`${url}${endpoint}${query}`);
  const json = await response.json();

  return json.meals;
};

export default fetchFoodData;
