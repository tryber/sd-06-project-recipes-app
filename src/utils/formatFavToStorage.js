export default function formatFavToStorage(favRecipes) {
  const formatedFavsToStorage = favRecipes.map((favRecipe) => {
    const { id, area = '', category, isAlcoholic = '', name, image, type } = favRecipe;
    const newFormatedFav = {
      id,
      type,
      area,
      category,
      alcoholicOrNot: isAlcoholic,
      name,
      image,
    };
    return newFormatedFav;
  });
  return formatedFavsToStorage;
}
