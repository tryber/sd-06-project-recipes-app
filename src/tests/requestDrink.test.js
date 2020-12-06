const {
  requestApiDrinkFilterIngredient,
  requestApiDrinkFilterName,
  requestApiDrinkFilterFirstLetter,
  requestApiDrinkDetails,
  requestApiDrinkListIngredients,
  urlDrink,
} = require('../services/requestDrink');

const returnApiMockDrink = (urlCall) => ({
  drinks: urlCall,
});

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((urlCall) => Promise.resolve({
      json: () => Promise.resolve(returnApiMockDrink(urlCall)),
    }));
};

const urlDrinkTests = 'https://www.thecocktaildb.com/api/json/v1/1/';

describe('Test functions requestDrink', () => {
  beforeEach(mockFetch);

  it('is the correct link ', () => {
    expect(urlDrink).toEqual(urlDrinkTests);
  });

  it(`function requestApiDrinkFilterIngredient 
  is making the request for the right url`, async () => {
    const ingredient = 'Gin';
    const urlConfirmation = await requestApiDrinkFilterIngredient(ingredient);
    expect(urlConfirmation).toEqual(`${urlDrinkTests}filter.php?i=${ingredient}`);
  });

  it(`function requestApiDrinkFilterName 
  is making the request for the right url`, async () => {
    const name = 'margarita';
    const urlConfirmation = await requestApiDrinkFilterName(name);
    expect(urlConfirmation).toEqual(`${urlDrinkTests}search.php?s=${name}`);
  });

  it(`function requestApiDrinkFilterFirstLetter 
  is making the request for the right url`, async () => {
    const firstLetter = 'm';
    const urlConfirmation = await requestApiDrinkFilterFirstLetter(firstLetter);
    expect(urlConfirmation).toEqual(`${urlDrinkTests}search.php?f=${firstLetter}`);
  });

  it(`function requestApiDrinkDetails 
  is making the request for the right url`, async () => {
    const id = '11007';
    const urlConfirmation = await requestApiDrinkDetails(id);
    expect(urlConfirmation).toEqual(`${urlDrinkTests}lookup.php?i=${id}`);
  });

  it(`function requestApiDrinkListIngredients 
  is making the request for the right url`, async () => {
    const urlConfirmation = await requestApiDrinkListIngredients();
    expect(urlConfirmation).toEqual(`${urlDrinkTests}list.php?i=list`);
  });
});
