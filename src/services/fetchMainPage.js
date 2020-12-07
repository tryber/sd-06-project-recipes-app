export const fetchMainPage = (foodOrDrink) => {
  const foods = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const drinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  if (foodOrDrink === '/comidas') {
    return fetch(foods)
      .then((response) => {
        if (!response.ok) {
          throw new Error('não deu certo');
        }
        return response.json();
      })
      .catch((error) => error);
  }
  return fetch(drinks).then((response) => (response.json()));
};

export const fetchCategories = (foodOrDrink) => {
  const foodCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinkCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  if (foodOrDrink === '/comidas') {
    return fetch(foodCategories).then((response) => response.json());
  }
  return fetch(drinkCategories).then((response) => response.json());
};

export const fetchNewSelectedCategory = (category, foodOrDrink, currentCategory) => {
  const foodURL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  const drinkURL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;

  if (currentCategory === category) return fetchMainPage(foodOrDrink);
  if (category === 'All' && foodOrDrink === '/comidas') return fetchMainPage(foodOrDrink);
  if (category === 'All' && foodOrDrink === '/bebidas') return fetchMainPage(foodOrDrink);
  if (foodOrDrink === '/comidas') {
    return fetch(foodURL).then(
      (response) => (response.json()),
    );
  }

  return fetch(drinkURL).then((response) => (response.json()));
};
