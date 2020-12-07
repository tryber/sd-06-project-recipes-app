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

  it('shows favorite recipe data', async () => {
    const testFavRecipe = [{
      alcoholicOrNot: '',
      area: 'Canadian',
      category: 'Dessert',
      id: '52929',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      name: 'Timbits',
      type: 'comida',
      tags: ['a', 'b'],
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavRecipe));

    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    const recipeName = screen.getByTestId('0-horizontal-name');
    expect(recipeName.innerHTML).toBe('Timbits');
    const favBtn = screen.getByTestId('0-horizontal-favorite-btn');
    await expect(favBtn).toBeInTheDocument();
    const shareBtn = screen.getByTestId('0-horizontal-share-btn');
    await expect(shareBtn).toBeInTheDocument();
    const topText = screen.getByTestId('0-horizontal-top-text');
    await expect(topText.innerHTML).toBe('Canadian - Dessert');
    const image = screen.getByTestId('0-horizontal-image');
    await expect(image).toBeInTheDocument();
    const tags = screen.getByTestId('0-a-horizontal-tag');
    await expect(tags).toBeInTheDocument();
  });

  it('changes path on name click', async () => {
    const testFavRecipe = [{
      alcoholicOrNot: '',
      area: 'Canadian',
      category: 'Dessert',
      id: '52929',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      name: 'Timbits',
      type: 'comida',
      tags: ['a', 'b'],
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavRecipe));

    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    fireEvent.click(screen.getByTestId('0-horizontal-name'));
    await expect(screen.getByText('Ingredientes:')).toBeInTheDocument();
  });

  it('unfavorite recipe', async () => {
    const testFavRecipe = [{
      alcoholicOrNot: '',
      area: 'Canadian',
      category: 'Dessert',
      id: '52929',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      name: 'Timbits',
      type: 'comida',
      tags: ['a', 'b'],
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavRecipe));

    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    const recipe = screen.getByText('Timbits');
    await expect(recipe).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('0-horizontal-favorite-btn'));
    await expect(recipe).not.toBeInTheDocument();
  });

  it('changes path on image click', async () => {
    const testFavRecipe = [{
      alcoholicOrNot: '',
      area: 'Canadian',
      category: 'Dessert',
      id: '52929',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      name: 'Timbits',
      type: 'comida',
      tags: ['a', 'b'],
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavRecipe));

    renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    fireEvent.click(screen.getByTestId('0-horizontal-image'));
    await expect(screen.getByText('Ingredientes:')).toBeInTheDocument();
  });

  it('copy url to clipboard', () => {
    const testFavRecipe = [{
      alcoholicOrNot: '',
      area: 'Canadian',
      category: 'Dessert',
      id: '52929',
      image: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg',
      name: 'Timbits',
      type: 'comida',
      tags: ['a', 'b'],
    }];

    localStorage.setItem('favoriteRecipes', JSON.stringify(testFavRecipe));

    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByTestId('profile-favorite-btn'));
    history.push('/comidas/52929');
  });
});
