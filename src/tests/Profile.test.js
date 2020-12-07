import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Profile page tests', () => {
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

  it('verify the title page', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId('page-title')[0].innerHTML).toBe('Perfil');
  });

  it('verify the email', () => {
    renderWithRouter(<App />);
    const userEmail = JSON.parse(localStorage.getItem('user'));
    expect(screen.getAllByTestId('profile-email')[0].innerHTML).toBe(userEmail.email);
  });

  it('verify the done recipes button', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getAllByTestId('profile-done-btn')[0]);
    userEvent.click(screen.getAllByTestId('profile-done-btn')[0]);
    expect(screen.getAllByTestId('page-title')[0].innerHTML).toBe('Receitas Feitas');
  });

  it('verify the fav recipes button', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    userEvent.click(screen.getAllByTestId('profile-favorite-btn')[0]);
    expect(screen.getAllByTestId('page-title')[0].innerHTML).toBe('Receitas Favoritas');
  });

  it('verify the logout button', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getAllByTestId('profile-logout-btn')[0]);
    userEvent.click(screen.getAllByTestId('profile-logout-btn')[0]);
    expect(screen.getAllByTestId('login-submit-btn')[0]).toBeInTheDocument();
  });
});
