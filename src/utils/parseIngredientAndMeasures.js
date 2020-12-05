export default function parseIngredientAndMeasures(recipe) {
  const parsedIngredients = (
    Object
      .keys(recipe)
      .filter((detail) => {
        const ingredientPattern = /strIngredient\d/i;

        const detailIsIngredient = (
          ingredientPattern.test(detail)
        );

        // makes sure we only have filled ingredients
        if (detailIsIngredient) {
          return recipe[detail];
        }

        return false;
      })
      .map((ingredientKey) => {
        const everyNonDigitChar = /[^\d]/g;
        const ingredientNumber = ingredientKey.replace(everyNonDigitChar, '');

        const matchingMeasure = `strMeasure${ingredientNumber}`;

        const ingredient = recipe[ingredientKey];
        const measure = recipe[matchingMeasure];

        const displayFormat = `${ingredient} - ${measure}`;

        return displayFormat;
      })
  );

  return parsedIngredients;
}
