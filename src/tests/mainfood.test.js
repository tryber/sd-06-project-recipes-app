import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import MainFood from '../pages/MainFood';

describe('Test MainFood Page', () => {
  it('Test Header in MainFood page', () => {
    const { getByTestId } = renderWithRouter(<MainFood />);
    const profileIcon = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    const searchIcon = getByTestId('search-top-btn');

    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it('Test if profile icon redirect to profile page', () => {
    const { getByTestId, history } = renderWithRouter(<MainFood />);
    const profileIcon = getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('Test if have footer', () => {
    const { getByTestId } = renderWithRouter(<MainFood />);
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
