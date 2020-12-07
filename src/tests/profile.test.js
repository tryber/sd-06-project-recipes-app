import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import MainDrink from '../pages/MainDrink';

describe('Test Profile Page', () => {
  it('Test Header in Profile page', () => {
    const { getByTestId } = renderWithRouter(<MainDrink />);
    const profileIcon = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Test if profile icon redirect to profile page', () => {
    const { getByTestId, history } = renderWithRouter(<MainDrink />);
    const profileIcon = getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('Test if have footer', () => {
    const { getByTestId } = renderWithRouter(<MainDrink />);
    const footer = getByTestId('footer');
    const exploreFooterButton = getByTestId('explore-bottom-btn');
    const drinkFooterButton = getByTestId('drinks-bottom-btn');
    const foodFooterButton = getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
    expect(exploreFooterButton).toBeInTheDocument();
    expect(drinkFooterButton).toBeInTheDocument();
    expect(foodFooterButton).toBeInTheDocument();
  });
});
