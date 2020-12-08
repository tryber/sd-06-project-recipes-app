import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

beforeAll(() => {
  const email = 'teste@teste.com';
  localStorage.user = JSON.stringify({ email });
});

// beforeEach(() => {
//   localStorage.clear();
// });

test('83 - Implemente a solução de maneira que o '
  + 'e-mail da pessoa usuária deve estar visível', async () => {
  const { findByTestId, history } = renderWithRouter(<App />);
  history.push('perfil');

  const profileEmail = await findByTestId('profile-email');
  // console.log(profileEmail.innerHTML);
  expect(profileEmail.innerHTML).toBe('teste@teste.com');

  // fireEvent.click(favoriteWhiteHeart);

  // const favoriteRecipes = localStorage.getItem('favoriteRecipes');
  // // console.log(favoriteRecipes);
  // expect(favoriteRecipes).toBe(
});

test('87 - Redirecione a pessoa usuária que, '
  + 'ao clicar no botão de "Sair", o localStorage '
  + 'deve ser limpo e a rota deve mudar para a tela'
  + 'de login', async () => {
  const { findByTestId, history } = renderWithRouter(<App />);
  history.push('perfil');

  const profileLogoutButton = await findByTestId('profile-logout-btn');

  fireEvent.click(profileLogoutButton);

  await expect(localStorage.getItem('user')).toBeNull();
  await expect(history.location.pathname).toBe('/');
});
