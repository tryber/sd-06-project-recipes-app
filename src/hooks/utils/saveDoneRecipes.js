function extractRecipeInfo(type, recipe) {
  if (type === 'comidas') {
    const {
      idMeal: id,
      strArea: area,
      strMeal: name,
      strCategory: category,
      strMealThumb: image,
      strTags: stringTags,
    } = recipe;

    const alcoholicOrNot = '';

    const tags = (stringTags
      ? stringTags.split(',')
      : []
    );

    return {
      id,
      area: (area || ''),
      name,
      category: (category || ''),
      image,
      tags,
      alcoholicOrNot,
      type: 'comida',
    };
  }

  const {
    idDrink: id,
    strDrink: name,
    strCategory: category,
    strDrinkThumb: image,
    strTags: stringTags,
    strAlcoholic: alcoholicOrNot,
  } = recipe;

  const area = '';

  const tags = (stringTags
    ? stringTags.split(',')
    : []
  );

  return {
    id,
    area,
    name,
    category: (category || ''),
    image,
    tags,
    alcoholicOrNot,
    type: 'bebida',
  };
}

export default function saveDoneRecipe(type, recipe) {
  const previouslyDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];

  const newRecipeInfoParsed = extractRecipeInfo(type, recipe);
  const doneDate = new Date(Date.now());

  const recipeToAdd = { ...newRecipeInfoParsed, doneDate };

  const newDoneRecipes = [...previouslyDoneRecipes, recipeToAdd];

  localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));

  return newDoneRecipes;
}
