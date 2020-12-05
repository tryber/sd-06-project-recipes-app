import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';

import Explore from '../../pages/Explore';
import AppProvider from '../../hooks';

let screen;

describe('explore page structure testing', () => {
  it('should have the correct header', () => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Explore />
        </AppProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Explorar');

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('should have the correct navBar', () => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Explore />
        </AppProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });

  it('should have the correct navigation links', () => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Explore />
        </AppProvider>
      </MemoryRouter>,
    );

    const exploreFoods = screen.getByTestId('explore-food');
    const exploreFoodsRef = '/explorar/comidas';
    const exploreDrinks = screen.getByTestId('explore-drinks');
    const exploreDrinksRef = '/explorar/bebidas';

    expect(exploreFoods).toBeInTheDocument();
    expect(exploreFoods).toHaveAttribute('href', exploreFoodsRef);
    expect(exploreDrinks).toBeInTheDocument();
    expect(exploreDrinks).toHaveAttribute('href', exploreDrinksRef);
  });

  it('should navigate to the explore foods page when clicked on link', () => {
    const history = createMemoryHistory();

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Explore />
        </AppProvider>
      </Router>,
    );

    const exploreFoods = screen.getByTestId('explore-food');
    fireEvent.click(exploreFoods);

    const { pathname } = history.location;
    const expectedPath = '/explorar/comidas';

    expect(pathname).toBe(expectedPath);
  });

  it('should navigate to the explore drinks page when clicked on link', () => {
    const history = createMemoryHistory();

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Explore />
        </AppProvider>
      </Router>,
    );

    const exploreDrinks = screen.getByTestId('explore-drinks');

    fireEvent.click(exploreDrinks);

    const { pathname } = history.location;
    const expectedPath = '/explorar/bebidas';

    expect(pathname).toBe(expectedPath);
  });
});
