const drinkCategories = {
  drinks: [
    { strCategory: 'Ordinary Drink' },
    { strCategory: 'Cocktail' },
    { strCategory: 'Milk \/ Float \/ Shake' },
    { strCategory: 'Other\/Unknown' },
    { strCategory: 'Cocoa' },
    { strCategory: 'Shot' },
    { strCategory: 'Coffee \/ Tea' },
    { strCategory: 'Homemade Liqueur' },
    { strCategory: 'Punch \/ Party Drink' },
    { strCategory: 'Beer' },
    { strCategory: 'Soft Drink \/ Soda' }
  ],
};

export const categoriesToRender = (
  drinkCategories
    .drinks
    .map(c => c.strCategory)
    .filter((_, index) => index < 5)
)

export default drinkCategories;
