const mealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const MealsAPI = async () => {
  const APIRequest = await fetch(mealsURL);
  const APIResponse = await APIRequest.json();
  return APIResponse.meals;
};

export default MealsAPI;
