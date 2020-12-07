export default function formatDoneRecipe(recipe, type) {
  const letterToRemove = 0;
  const initialPosition = -1;
  const formattedType = type.slice(letterToRemove, initialPosition);

  const date = new Date();

  const formattedRecipe = {
    id: recipe.id,
    type: formattedType,
    area: recipe.area,
    category: recipe.category,
    alcoholicOrNot: recipe.isAlcoholic || '',
    name: recipe.name,
    image: recipe.image,
    doneDate: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`,
    tags: recipe.tags || [],
  };

  return formattedRecipe;
}
