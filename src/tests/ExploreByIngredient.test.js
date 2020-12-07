import React from 'react';
import { fireEvent, screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('favorite and done page tests', () => {
  it('explora ingredientes de comidas', async () => {
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
    fireEvent.click(screen.getByTestId('explore-by-ingredient'));
    path = history.location.pathname;
    await expect(path).toBe('/explorar/comidas/ingredientes');
    await expect(screen.getByTestId('page-title').innerHTML)
      .toBe('Explorar Ingredientes');
    const firstIngredient = await waitForElement(() => screen.getByTestId('0-card-name'));
    await expect(firstIngredient.innerHTML).toBe('Chicken');
    const secIngredient = await waitForElement(() => screen.getByTestId('1-card-name'));
    await expect(secIngredient.innerHTML).toBe('Salmon');
  });

  it('explora ingredientes de bebidas', async () => {
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
    fireEvent.click(screen.getByTestId('explore-drinks'));
    path = history.location.pathname;
    await expect(path).toBe('/explorar/bebidas');
    fireEvent.click(screen.getByTestId('explore-by-ingredient'));
    path = history.location.pathname;
    await expect(path).toBe('/explorar/bebidas/ingredientes');
    await expect(screen.getByTestId('page-title').innerHTML)
      .toBe('Explorar Ingredientes');
    const firstIngredient = await waitForElement(() => screen.getByTestId('0-card-name'));
    await expect(firstIngredient.innerHTML).toBe('Light rum');
    const secIngredient = await waitForElement(() => screen.getByTestId('1-card-name'));
    await expect(secIngredient.innerHTML).toBe('Applejack');
  });

  it('no more than 12 recipes', async () => {
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
    fireEvent.click(screen.getByTestId('explore-drinks'));
    path = history.location.pathname;
    await expect(path).toBe('/explorar/bebidas');
    fireEvent.click(screen.getByTestId('explore-by-ingredient'));
    path = history.location.pathname;
    await expect(path).toBe('/explorar/bebidas/ingredientes');
    await expect(screen.getByTestId('page-title').innerHTML)
      .toBe('Explorar Ingredientes');
    await expect(await screen.findByTestId('12-card-name').innerHTML).toBe(undefined);
  });
});
