import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';

import Profile from '../../pages/Profile';
import AppProvider from '../../hooks';

import LocalStorageFake from '../../fakes/localStorage';

let screen;

const validEmail = 'fabio@email.com';

describe('profile page structure testing', () => {
  it('should have the correct header', () => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Profile />
        </AppProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();

    const pageTitle = screen.getByTestId('page-title');
    expect(pageTitle).toBeInTheDocument();
    expect(pageTitle).toHaveTextContent('Perfil');

    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('should have the correct navBar', () => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Profile />
        </AppProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('explore-bottom-btn')).toBeInTheDocument();
  });

  it('should display user email and links to done/favorite recipes', () => {
    const localStorageFake = new LocalStorageFake();

    const userData = { email: validEmail };

    localStorageFake.setItem('user', userData);

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);

    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Profile />
        </AppProvider>
      </MemoryRouter>,
    );

    const userEmail = screen.getByTestId('profile-email');
    expect(userEmail).toBeInTheDocument();
    expect(userEmail).toHaveTextContent(validEmail);

    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
  });

  it('should redirect user to login page when logged out, clearing localStorage', () => {
    const history = createMemoryHistory();

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Profile />
        </AppProvider>
      </Router>,
    );

    const localStorageFake = new LocalStorageFake();

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    const removeItem = jest.spyOn(localStorageFake, 'removeItem');

    const logOutButton = screen.getByTestId('profile-logout-btn');
    expect(logOutButton).toBeInTheDocument();

    fireEvent.click(logOutButton);

    const numberOfLocalStorageControlledItems = 6;

    expect(removeItem).toHaveBeenCalledTimes(numberOfLocalStorageControlledItems);
    expect(removeItem).toHaveBeenCalledWith('user');
    expect(removeItem).toHaveBeenCalledWith('mealsToken');
    expect(removeItem).toHaveBeenCalledWith('cocktailsToken');
    expect(removeItem).toHaveBeenCalledWith('doneRecipes');
    expect(removeItem).toHaveBeenCalledWith('favoriteRecipes');
    expect(removeItem).toHaveBeenCalledWith('inProgressRecipes');

    const { pathname } = history.location;
    const expectedPath = '/';

    expect(pathname).toBe(expectedPath);
  });
});
