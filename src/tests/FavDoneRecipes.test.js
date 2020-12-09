import React from 'react';
import { cleanup, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('favorite and done page tests', () => {
  beforeAll(() => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const button = screen.getByTestId('login-submit-btn');
    userEvent.type(email, 'alguem@email.com');
    userEvent.type(senha, '1234567');
    userEvent.click(button);
  });

  beforeEach(() => {
    renderWithRouter(<App />);
    const profileBtn = screen.getAllByTestId('profile-top-btn');
    fireEvent.click(profileBtn[0]);
  });

  afterEach(() => cleanup());

  it('favorite recipes test', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    expect(screen.getAllByTestId('page-title')[0].innerHTML).toBe('Favorite recipes');
  });

  it('done recipes test', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getAllByTestId('profile-done-btn')[0]);
    expect(screen.getAllByTestId('page-title')[0].innerHTML).toBe('Done recipes');
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
    fireEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    fireEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    const recipeName = screen.getAllByTestId('0-horizontal-name')[0];
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
    fireEvent.click(screen.getAllByTestId('profile-done-btn')[0]);
    fireEvent.click(screen.getAllByTestId('profile-done-btn')[0]);
    const recipeName = screen.getAllByTestId('0-horizontal-name')[0];
    expect(recipeName.innerHTML).toBe('Timbits');
  });

  it('show message when share button clicked', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    fireEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    // const shareBtn = screen.getAllByTestId('0-horizontal-share-btn');
    // fireEvent.click(shareBtn[0]);
  });

  it('unfavorite recipe', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    fireEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    const recipeName = screen.getAllByTestId('0-horizontal-name')[0];
    expect(recipeName.innerHTML).toBe('Timbits');
    const heartButton = screen.getAllByTestId('0-horizontal-favorite-btn');
    fireEvent.click(heartButton[0]);
    fireEvent.click(heartButton[1]);
    expect(recipeName).not.toBeInTheDocument();
  });
});
