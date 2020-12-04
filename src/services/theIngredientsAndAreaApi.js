const theIngredientsAndAreaApi = async (endPoint) => {
  // const endpoint = param;
  const ingredientsAndAreaApi = await fetch(endPoint);
  return ingredientsAndAreaApi.json();
};

export default theIngredientsAndAreaApi;
