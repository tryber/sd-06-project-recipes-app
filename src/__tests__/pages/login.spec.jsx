import React from 'react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, fireEvent } from '@testing-library/react';

import Login from '../../pages/Login';
import AppProvider from '../../hooks';

import LocalStorageFake from '../../fakes/localStorage';

let screen;

const validEmail = 'fabio@email.com';
const validPw = 'fabio123456';

describe('Login page structure testing', () => {
  beforeEach(() => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Login />
        </AppProvider>
      </MemoryRouter>,
    );
  });

  it('should have a form with email, password and submit button', () => {
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  it('should have the login button disabled until valid email/password is input', () => {
    expect(screen.getByTestId('login-submit-btn')).toBeDisabled();

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    const invalidEmail = 'fabio@fabio';
    const invalidEmail2 = '@fabio.com';
    const invalidEmail3 = 'fabio.com';
    const invalidEmail4 = 'fabiosenracorrea';
    const invalidEmailOptions = [
      invalidEmail, invalidEmail2, invalidEmail3, invalidEmail4,
    ];

    const invalidPw = '123456';
    const invalidPw2 = 'fabio';
    const invalidPwOptions = [invalidPw, invalidPw2];

    invalidEmailOptions.forEach((invalidE) => {
      invalidPwOptions.forEach((invalidP) => {
        fireEvent.change(emailInput, { target: { value: invalidE } });
        fireEvent.change(passwordInput, { target: { value: invalidP } });

        expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
      });
    });

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPw } });

    expect(screen.getByTestId('login-submit-btn')).toBeEnabled();
  });
});

describe('Login page logic testing', () => {
  it('should correctly save user email and tokens into local storage', () => {
    screen = render(
      <MemoryRouter>
        <AppProvider>
          <Login />
        </AppProvider>
      </MemoryRouter>,
    );

    const localStorageFake = new LocalStorageFake();

    Object.defineProperty(global, 'localStorage', {
      value: localStorageFake,
      writable: true,
    });

    jest.spyOn(JSON, 'parse').mockImplementation((value) => value);
    jest.spyOn(JSON, 'stringify').mockImplementation((value) => value);
    const localSetItem = jest.spyOn(localStorageFake, 'setItem');

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPw } });

    const loginBtn = screen.getByTestId('login-submit-btn');

    fireEvent.click(loginBtn);

    const numberOfLocalStorageInteractions = 3;
    expect(localSetItem).toHaveBeenCalledTimes(numberOfLocalStorageInteractions);

    const expectedMealsKey = 'mealsToken';
    const expectedCocktailsKey = 'cocktailsToken';
    const expectedUserKey = 'user';

    const expectedToken = '1';
    const expectedUserData = { email: validEmail };

    const mockedLocalStorageValues = localStorageFake.store;

    expect(mockedLocalStorageValues[expectedUserKey]).toStrictEqual(expectedUserData);
    expect(mockedLocalStorageValues[expectedMealsKey]).toStrictEqual(expectedToken);
    expect(mockedLocalStorageValues[expectedCocktailsKey]).toStrictEqual(expectedToken);
  });

  it('should redirect user to the main foods page after successfully logged in', () => {
    const history = createMemoryHistory();

    screen = render(
      <Router history={ history }>
        <AppProvider>
          <Login />
        </AppProvider>
      </Router>,
    );

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');

    fireEvent.change(emailInput, { target: { value: validEmail } });
    fireEvent.change(passwordInput, { target: { value: validPw } });

    const loginBtn = screen.getByTestId('login-submit-btn');

    fireEvent.click(loginBtn);

    const { pathname } = history.location;
    const expectedPath = '/comidas';

    expect(pathname).toBe(expectedPath);
  });
});
