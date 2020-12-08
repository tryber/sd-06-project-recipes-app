export const handleIngredients = (data, setIngredients, setMeasures) => {
  if (data.length === 1) {
    const currentRecipe = data[0];
    const filteredKeys = Object.keys(currentRecipe);
    const filteredMeasurements = [];
    const filteredIngredients = [];

    filteredKeys.forEach((key) => {
      if (key.includes('strIngredient')
      && (currentRecipe[`${key}`] !== ''
      && currentRecipe[`${key}`] !== null)) {
        filteredIngredients.push(currentRecipe[`${key}`]);
      }
    });
    filteredKeys.forEach((key) => {
      if (key.includes('strMeasure')
      && (currentRecipe[`${key}`] !== ' ' || currentRecipe[`${key}`] !== null)) {
        filteredMeasurements.push(currentRecipe[`${key}`]);
      }
    });

    setIngredients(filteredIngredients);
    setMeasures(filteredMeasurements);
  }
};

export const hello = 'Oi Linter';
