import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Profile page tests', () => {
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

  it('verify the title page', async () => {
    renderWithRouter(<App />);
    await expect(screen.getByTestId('page-title').innerHTML).toBe('Perfil');
  });

  it('verify the email', async () => {
    renderWithRouter(<App />);
    const userEmail = JSON.parse(localStorage.getItem('user'));
    await expect(screen.getByTestId('profile-email').innerHTML).toBe(userEmail.email);
  });

  it('verify the done recipes button', async () => {
    renderWithRouter(<App />);
    const doneRecipesBtn = screen.getByTestId('profile-done-btn');
    await expect(doneRecipesBtn).toBeInTheDocument();
  });

  it('verify the fav recipes button', async () => {
    renderWithRouter(<App />);
    const favoriteRecipesBtn = screen.getByTestId('profile-favorite-btn');
    await expect(favoriteRecipesBtn).toBeInTheDocument();
  });

  it('verify the logout button', async () => {
    renderWithRouter(<App />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    await expect(logoutBtn).toBeInTheDocument();
  });

  it('verify if clears the local storage', async () => {
    renderWithRouter(<App />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    await expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
    const emptyLS = JSON.parse(localStorage.getItem('user'));
    await expect(emptyLS).toBe(null);
  });

  it('test the default email', async () => {
    const { history } = renderWithRouter(<App />);
    const logoutBtn = screen.getByTestId('profile-logout-btn');
    await expect(logoutBtn).toBeInTheDocument();
    fireEvent.click(logoutBtn);
    history.push('/perfil');
    await expect(screen.getByText('teste@trybe.com')).toBeInTheDocument();
  });
});
