import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import Explore from '../pages/Explore';

describe('Test Explore Page', () => {
  it('Test Header in Explore page', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const profileIcon = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Test if profile icon redirect to profile page', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);
    const profileIcon = getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('Test if have footer', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const footer = getByTestId('footer');
    const exploreFooterButton = getByTestId('explore-bottom-btn');
    const drinkFooterButton = getByTestId('drinks-bottom-btn');
    const foodFooterButton = getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
    expect(exploreFooterButton).toBeInTheDocument();
    expect(drinkFooterButton).toBeInTheDocument();
    expect(foodFooterButton).toBeInTheDocument();
  });

  it('Test button in Explore Page', () => {
    const { getByTestId } = renderWithRouter(<Explore />);
    const exploreFoodButton = getByTestId('explore-food');
    const exploreDrinkButton = getByTestId('explore-drinks');
    expect(exploreFoodButton).toBeInTheDocument();
    expect(exploreDrinkButton).toBeInTheDocument();
  });

  it('Test button in Explore Page', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);
    const exploreFoodButton = getByTestId('explore-food');
    userEvent.click(exploreFoodButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Test button in Explore Page', () => {
    const { getByTestId, history } = renderWithRouter(<Explore />);
    const exploreDrinkButton = getByTestId('explore-drinks');
    userEvent.click(exploreDrinkButton);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });
});
