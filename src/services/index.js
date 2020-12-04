const fetchRecipes = async (URL) => {
  const result = await fetch(URL).then((response) => response.json());
  return result;
};

export default fetchRecipes;
