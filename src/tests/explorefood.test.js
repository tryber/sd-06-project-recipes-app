import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import ExploreFood from '../pages/ExploreFood';

describe('Test ExploreFood Page', () => {
  it('Test Header in Explore page', async () => {
    const { getByTestId } = renderWithRouter(<ExploreFood />);
    const profileIcon = getByTestId('profile-top-btn');
    const pageTitle = getByTestId('page-title');
    expect(profileIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  it('Test if profile icon redirect to profile page', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreFood />);
    const profileIcon = getByTestId('profile-top-btn');
    userEvent.click(profileIcon);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });

  it('Test if have footer', () => {
    const { getByTestId } = renderWithRouter(<ExploreFood />);
    const footer = getByTestId('footer');
    const exploreFooterButton = getByTestId('explore-bottom-btn');
    const drinkFooterButton = getByTestId('drinks-bottom-btn');
    const foodFooterButton = getByTestId('food-bottom-btn');
    expect(footer).toBeInTheDocument();
    expect(exploreFooterButton).toBeInTheDocument();
    expect(drinkFooterButton).toBeInTheDocument();
    expect(foodFooterButton).toBeInTheDocument();
  });

  it('Test button in ExploreFood', () => {
    const { getByTestId } = renderWithRouter(<ExploreFood />);
    const exploreByIngredient = getByTestId('explore-by-ingredient');
    const exploreByArea = getByTestId('explore-by-area');
    const exploreSurprise = getByTestId('explore-surprise');
    expect(exploreByIngredient).toBeInTheDocument();
    expect(exploreByArea).toBeInTheDocument();
    expect(exploreSurprise).toBeInTheDocument();
  });

  it('Test button explore by ingredients', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreFood />);
    const exploreByIngredient = getByTestId('explore-by-ingredient');
    userEvent.click(exploreByIngredient);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/ingredientes');
  });

  it('Test button in Explore Page', () => {
    const { getByTestId, history } = renderWithRouter(<ExploreFood />);
    const exploreByArea = getByTestId('explore-by-area');
    userEvent.click(exploreByArea);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas/area');
  });
});
