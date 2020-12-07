import React from 'react';
import { fireEvent, screen, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../components/Header';
import App from '../App';

describe('1. Barra de buscas', () => {
  it('1. Se existem os data-test-ids corretos', () => {
    const { queryByTestId } = renderWithRouter(<Header pathname="/comidas" />);
    const searchBtn = screen.queryByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const tInput = queryByTestId('search-input');
    const iButton = queryByTestId('ingredient-search-radio');
    const nButton = queryByTestId('name-search-radio');
    const fButton = queryByTestId('first-letter-search-radio');
    const btnSearch = queryByTestId('exec-search-btn');
    expect(tInput).toBeInTheDocument();
    expect(iButton).toBeInTheDocument();
    expect(nButton).toBeInTheDocument();
    expect(fButton).toBeInTheDocument();
    expect(btnSearch).toBeInTheDocument();
  });

  it('2. Fazer uma busca por ingrediente', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/comidas');

    await waitForElement(() => screen.getByTestId('search-top-btn'));
    const searchBtn = screen.getByTestId('search-top-btn');
    fireEvent.click(searchBtn);

    const tInput = screen.queryByTestId('search-input');
    userEvent.type(tInput, 'chicken');
    const iButton = screen.queryByTestId('ingredient-search-radio');
    userEvent.click(iButton);
    const btnSearch = screen.queryByTestId('exec-search-btn');
    userEvent.click(btnSearch);
    await screen.findByTestId('0-recipe-card');
    expect(screen.getByText('Brown Stew Chicken')).toBeInTheDocument();
  });
});
