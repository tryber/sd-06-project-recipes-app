export function discardEmptyEntries(array) {
  const processedArray = array.filter((element) => (
    element !== '' && element !== ' ' && element !== null));
  return processedArray;
}

export function processRecipeObject(obj) {
  let { ingredients, measures } = obj;
  ingredients = discardEmptyEntries(ingredients);
  measures = discardEmptyEntries(measures);
  return { ...obj, ingredients, measures };
}
