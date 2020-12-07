import React from 'react';
import { screen, fireEvent, waitForElement } from '@testing-library/react';
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
    fireEvent.click(screen.getByTestId('explore-bottom-btn'));
    path = history.location.pathname;
    await expect(path).toBe('/explorar');
    fireEvent.click(screen.getByTestId('explore-food'));
    path = history.location.pathname;
    await expect(path).toBe('/explorar/comidas');
    fireEvent.click(screen.getByTestId('explore-by-area'));
    path = history.location.pathname;
    await expect(path).toBe('/explorar/comidas/area');
  });

  it('test the page title', async () => {
    renderWithRouter(<App />);
    await expect(screen.getByTestId('page-title').innerHTML).toBe('Explorar Origem');
  });

  it('test the first meal', async () => {
    renderWithRouter(<App />);
    const firstMeal = await waitForElement(() => screen.findByTestId('0-card-name'));
    await expect(firstMeal.innerHTML).toBe('Corba');
  });

  it('test the dropdown menu', async () => {
    renderWithRouter(<App />);
    const dropdown = screen.getByTestId('explore-by-area-dropdown');
    await expect(dropdown).toBeInTheDocument();
    const allBtn = await screen.findByTestId('All-option');
    await expect(allBtn).toBeInTheDocument();
  });
});
