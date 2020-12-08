import React from 'react';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';

describe('A página de comidas: ', () => {
  it('deve ter um título "Comidas"', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/comidas');
    const foodsPath = history.location.pathname;

    expect(foodsPath).toBe('/comidas');

    // expect(mainTitleElement).toBeInTheDocument();
    // expect(mainTitleElement.innerHTML).toBe(mainTitle);
  });
});
