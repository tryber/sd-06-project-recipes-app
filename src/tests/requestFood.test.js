const {
  requestApiFoodFilterIngredient,
  requestApiFoodFilterName,
  requestApiFoodFilterFirstLetter,
  requestApiFoodFilterArea,
  requestApiFoodDetails,
  requestApiFoodListIngredients,
  requestApiFoodListArea,
  urlFood,
} = require('../services/requestFood');

const returnApiMockFood = (urlCall) => ({
  meals: urlCall,
});

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((urlCall) => Promise.resolve({
      json: () => Promise.resolve(returnApiMockFood(urlCall)),
    }));
};

const urlFoodTests = 'https://www.themealdb.com/api/json/v1/1/';

describe('Test functions requestFood', () => {
  beforeEach(mockFetch);

  it('is the correct link ', () => {
    expect(urlFood).toEqual(urlFoodTests);
  });

  it(`function requestApiFoodFilterIngredient 
  is making the request for the right url`, async () => {
    const ingredient = 'Gin';
    const urlConfirmation = await requestApiFoodFilterIngredient(ingredient);
    expect(urlConfirmation).toEqual(`${urlFoodTests}filter.php?i=${ingredient}`);
  });

  it(`function requestApiFoodFilterName 
  is making the request for the right url`, async () => {
    const name = 'margarita';
    const urlConfirmation = await requestApiFoodFilterName(name);
    expect(urlConfirmation).toEqual(`${urlFoodTests}search.php?s=${name}`);
  });

  it(`function requestApiFoodFilterFirstLetter 
  is making the request for the right url`, async () => {
    const firstLetter = 'm';
    const urlConfirmation = await requestApiFoodFilterFirstLetter(firstLetter);
    expect(urlConfirmation).toEqual(`${urlFoodTests}search.php?f=${firstLetter}`);
  });

  it(`function requestApiFoodFilterArea 
  is making the request for the right url`, async () => {
    const area = 'Canadian';
    const urlConfirmation = await requestApiFoodFilterArea(area);
    expect(urlConfirmation).toEqual(`${urlFoodTests}filter.php?a=${area}`);
  });

  it(`function requestApiFoodDetails 
  is making the request for the right url`, async () => {
    const id = '11007';
    const urlConfirmation = await requestApiFoodDetails(id);
    expect(urlConfirmation).toEqual(`${urlFoodTests}lookup.php?i=${id}`);
  });

  it(`function requestApiFoodListIngredients 
  is making the request for the right url`, async () => {
    const urlConfirmation = await requestApiFoodListIngredients();
    expect(urlConfirmation).toEqual(`${urlFoodTests}list.php?i=list`);
  });

  it(`function requestApiFoodListArea 
  is making the request for the right url`, async () => {
    const urlConfirmation = await requestApiFoodListArea();
    expect(urlConfirmation).toEqual(`${urlFoodTests}list.php?a=list`);
  });
});
