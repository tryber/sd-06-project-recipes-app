const getCockTail = async (param) => {
  const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/${param}`;
  const cockTailApi = await fetch(endpoint);
  return cockTailApi.json();
};

export default getCockTail;
