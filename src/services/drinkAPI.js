export async function drinkAPI(type, endpoint) {
  let url;

  switch (type) {
  case 'ingredient':
    url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${endpoint}`;
    break;
  case 'name':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${endpoint}`;
    break;
  case 'first-letter':
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${endpoint}`;
    break;
  default:
    url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }

  const fetchAPI = await fetch(url)
    .then((response) => response.json())
    .then((response) => response.drinks)
    .catch((error) => {
      console.log(`Deu erro: ${error.message}`);
    });

  return fetchAPI;
}

export const fetchRandomDrink = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
  .then((response) => (
    response
      .json()
      .then((json) => json.drinks[0])
      .catch((error) => error)
  ));

export const drinkCategoryApi = () => ( // requisito 27
  fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
    .then((response) => response.json())
    .then((response) => {
      const data = ['All'];
      const cinco = 5;
      const zero = 0;

      for (let i = zero; i < cinco; i += 1) {
        data.push(response.drinks[i].strCategory);
      }

      return data;
    })
);

export const drinkByCategoryApi = (category) => ( // requisito 28
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((response) => (
      response
        .json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export const listIngredients = () => fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  .then((response) => response.json())
  .then((data) => data.drinks)
  .catch((error) => console.error(error));

export const fetchDrinkAPI = (id) => fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
  .then((response) => response.json())
  .then((data) => data.drinks);
