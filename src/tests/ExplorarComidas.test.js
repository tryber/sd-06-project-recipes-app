import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import ExplorarComidas from '../pages/ExplorarComidas';

// const abc = require('../services/requestFood');
// jest.mock('../services/requestFood');
// requestApiMealSurprise()
const surpriseFood = {
  meals: [{
    idMeal: '52782',
    strMeal: 'Lamb tomato and sweet spices',
    strDrinkAlternate: null,
    strCategory: 'Lamb',
    strArea: 'Moroccan',
    strInstructions: `Use pickled vine leaves here, preserved in brine. Small delicate 
    leaves are better than the large bristly ones but, if only large leaves are to hand, 
    then trim them to roughly 12 by 12 cms so that you don't get too many layers of leaves 
    around the filling. And remove any stalks. Drain the preserved leaves, immerse them in 
    boiling water for 10 minutes and then leave to dry on a tea towel before use. 
    \r\nBasmati rice with butter and pine nuts is an ideal accompaniment. Couscous is 
    great, too. Serves...`,
    strMealThumb: 'https://www.themealdb.com/images/media/meals/qtwtss1468572261.jpg',
    strTags: '',
    strYoutube: 'https://www.youtube.com/watch?v=vaZb1MnFBgA',
    strIngredient1: 'olive oil',
    strIngredient2: 'ginger',
    strIngredient3: 'garlic',
    strIngredient4: 'tomatoes',
    strIngredient5: 'lemon juice',
    strIngredient6: 'caster sugar',
    strIngredient7: 'vine leaves',
    strIngredient8: 'fennel bulb',
    strIngredient9: 'lamb mince',
    strIngredient10: 'onion',
    strIngredient11: 'potato',
    strIngredient12: 'basmati rice',
    strIngredient13: 'chopped parsley',
    strIngredient14: 'coriander',
    strIngredient15: 'lemon juice',
    strIngredient16: 'garlic',
    strIngredient17: 'clove',
    strIngredient18: 'cinnamon',
    strIngredient19: 'tomatoes',
    strIngredient20: '',
    strMeasure1: '2 tbsp',
    strMeasure2: '4cm piece finely chopped',
    strMeasure3: '2 cloves peeled and chopped',
    strMeasure4: '800g peeled and chopped ',
    strMeasure5: '2 tbsp',
    strMeasure6: '1 tsp',
    strMeasure7: '50',
    strMeasure8: '1 large',
    strMeasure9: '400g',
    strMeasure10: '1 medium',
    strMeasure11: '1 small peeled and coarsely grated',
    strMeasure12: '2 tbsp',
    strMeasure13: '2 tbsp',
    strMeasure14: '2 tbsp chopped',
    strMeasure15: '1 tbsp',
    strMeasure16: '2 cloves',
    strMeasure17: '½ tsp ground',
    strMeasure18: '½ tsp ground ',
    strMeasure19: '2 medium',
    strMeasure20: '',
    strSource: 'http://www.ottolenghi.co.uk/recipes/meat/lamb-tomato-and-sweet-spices-shop',
    dateModified: null,
  }],
};

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation((url) => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/random.php') {
        return Promise.resolve({ json: () => Promise.resolve(surpriseFood) });
      }
    });
};

describe('Comidas test', () => {
  // beforeEach(mockFetch);
  // const requestApiMealSurprise = jest.fn(() => Promise.resolve(surpriseFood));

  it('have the heder', async () => {
    const { getByTestId } = renderWithRouter(<ExplorarComidas />);

    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('have the footer', async () => {
    const { getByTestId } = renderWithRouter(<ExplorarComidas />);

    expect(getByTestId('footer')).toBeInTheDocument();
  });

  it(`the by ingredients button should redirect 
  to the Explore Ingredients page`, async () => {
    const { getByText, history } = renderWithRouter(<ExplorarComidas />);

    fireEvent.click(getByText('Por Ingredientes'));

    expect(history.location.pathname).toEqual('/explorar/comidas/ingredientes');
  });

  it(`the By Place of Origin button should redirect 
  to the Explore Origin page`, async () => {
    const { getByText, history } = renderWithRouter(<ExplorarComidas />);

    fireEvent.click(getByText('Por Local de Origem'));

    expect(history.location.pathname).toEqual('/explorar/comidas/area');
  });

  it('the surprise me button should redirect to the details food page', async () => {
    const { getByText, history } = renderWithRouter(<ExplorarComidas />);

    fireEvent.click(getByText('Me Surpreenda!'));

    await waitForElement(() => getByText('Lamb tomato and sweet spices'));

    // await findByText('Lamb tomato and sweet spices');

    expect(history.location.pathname).toEqual('/comidas/52782');
  });
});
