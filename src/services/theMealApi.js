const getMeals = async (param) => {
  const endPoint = `https://www.themealdb.com/api/json/v1/1/${param}`;
  const mealsApi = await fetch(endPoint);
  return mealsApi.json();
};

export default getMeals;
