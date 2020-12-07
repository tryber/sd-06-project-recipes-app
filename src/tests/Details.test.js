import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('details page tests', () => {
  it('enter details page upon click', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    let path = history.location.pathname;
    await expect(path).toBe('/comidas');
    userEvent.click(await screen.findByTestId('0-card-name'));
    path = history.location.pathname;
    await expect(path).toBe('/comidas/52977');
    const recoRecipe = await screen.findByTestId('0-recomendation-card');
    await expect(recoRecipe).toBeInTheDocument();
    const startRecipeBtn = await screen.findByTestId('start-recipe-btn');
    await expect(startRecipeBtn).toBeInTheDocument();
    const favBtn = await screen.findByTestId('favorite-btn');
    userEvent.click(favBtn);
    await expect(favBtn.firstChild).toHaveAttribute('src');
    let favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favRecipes[0].name).toBe('Corba');
    userEvent.click(favBtn);
    favRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(favRecipes).toStrictEqual([]);
    await expect(screen.getByTestId('instructions')).toBeInTheDocument();
  });

  it('enter drink details page upon click', async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    let path = history.location.pathname;
    await expect(path).toBe('/comidas');
    userEvent.click(await screen.findByTestId('drinks-bottom-btn'));
    path = history.location.pathname;
    await expect(path).toBe('/bebidas');
    userEvent.click(await screen.findByTestId('0-card-name'));
    path = history.location.pathname;
    await expect(path).toBe('/bebidas/15997');
  });
});
