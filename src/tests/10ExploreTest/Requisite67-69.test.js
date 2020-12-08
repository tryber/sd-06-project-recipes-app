import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

describe('67 - Implemente os elementos da tela de explorar '
  + 'respeitando os atributos descritos no protótipo', () => {
  it('Tem os data-testids explore-food e explore-drinks.', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar');

    const exploreFoodsButton = await findByTestId('explore-food');
    const exploreDrinksButton = await findByTestId('explore-drinks');

    expect(exploreFoodsButton).toBeInTheDocument();
    expect(exploreDrinksButton).toBeInTheDocument();
  });
});

describe('68 - Desenvolva a tela de maneira que tenha 2 botões: '
  + 'um para explorar comidas e o outro para explorar '
  + 'bebidas', () => {
  it('O nomes dos botões devem ser "Explorar Comidas" '
    + 'e "Explorar Bebidas".', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar');

    const exploreFoodsButton = await findByTestId('explore-food');
    const exploreDrinksButton = await findByTestId('explore-drinks');

    expect(exploreFoodsButton.innerHTML).toBe('Explorar Comidas');
    expect(exploreDrinksButton.innerHTML).toBe('Explorar Bebidas');
  });
});

describe('69 - Redirecione a pessoa usuária ao clicar em um dos botões, '
  + 'a rota deve mudar para a página de explorar comidas ou de explorar '
  + 'bebidas', () => {
  it('Ao clicar no botão "Explorar Comidas" a rota muda para a página '
  + 'de explorar comidas', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar');

    const exploreFoodsButton = await findByTestId('explore-food');

    fireEvent.click(exploreFoodsButton);

    expect(history.location.pathname).toBe('/explorar/comidas');
  });

  it('Ao clicar no botão "Explorar Bebidas" a rota muda para a '
    + 'página de explorar bebidas', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('explorar');

    const exploreDrinksButton = await findByTestId('explore-drinks');

    fireEvent.click(exploreDrinksButton);

    expect(history.location.pathname).toBe('/explorar/bebidas');
  });
});
