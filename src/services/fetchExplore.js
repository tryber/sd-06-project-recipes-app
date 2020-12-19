const fetchIngredients = (value) => (
  fetch(value).then((response) => response.json())
);

export default fetchIngredients;
