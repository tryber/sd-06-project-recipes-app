import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('favorite and done page tests', () => {
  beforeEach(async () => {
    const { history } = renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
    let path = history.location.pathname;
    await expect(path).toBe('/comidas');
    const profileBtn = screen.getByTestId('profile-top-btn');
    userEvent.click(profileBtn);
    path = history.location.pathname;
    await expect(path).toBe('/perfil');
  });

  afterEach(async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    await expect(history.location.pathname).toBe('/');
  });

  it('favorite recipes test', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    expect(screen.getByTestId('page-title').innerHTML).toBe('Receitas Favoritas');
  });

  it('done recipes test', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-done-btn'));
    expect(screen.getByTestId('page-title').innerHTML).toBe('Receitas Feitas');
  });

  it('shows favorite recipe', () => {
    const testFavRecipe = [{
      alcoholicOrNot: '',
      area: 'Canadian',
      category: 'Dessert',
      id: '52929',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      name: 'Timbits',
      type: 'comida',
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavRecipe));

    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    const recipeName = screen.getByTestId('0-horizontal-name');
    expect(recipeName.innerHTML).toBe('Timbits');
  });

  it('shows done recipe', () => {
    const testDoneRecipe = [{
      alcoholicOrNot: '',
      area: 'Canadian',
      category: 'Dessert',
      id: '52929',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      name: 'Timbits',
      type: 'comida',
    }];

    localStorage.setItem('doneRecipes', JSON.stringify(testDoneRecipe));

    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-done-btn'));
    const recipeName = screen.getByTestId('0-horizontal-name');
    expect(recipeName.innerHTML).toBe('Timbits');
  });

  it('show message when share button clicked', async () => {
    const testDoneRecipe = [{
      alcoholicOrNot: '',
      area: 'Canadian',
      category: 'Dessert',
      id: '52929',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      name: 'Timbits',
      type: 'comida',
    }];

    localStorage.setItem('doneRecipes', JSON.stringify(testDoneRecipe));

    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    await expect(shareBtn).toBeInTheDocument();
  });

  it('unfavorite recipe', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    const recipeName = screen.getByTestId('0-horizontal-name');
    expect(recipeName.innerHTML).toBe('Timbits');
    const heartButton = screen.getByTestId('0-horizontal-favorite-btn');
    fireEvent.click(heartButton);
    expect(recipeName).not.toBeInTheDocument();
  });
});
