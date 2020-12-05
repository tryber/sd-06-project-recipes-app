import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testar header da tela de Receitas Favoritas', () => {
  it('Verificar se possui o botão "Perfil" com data-testid específicos', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');

    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
  });

  it('Verificar se ao clicar no botão "Perfil" redireciona para url específico', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');

    fireEvent.click(getByTestId('profile-top-btn'));
    expect(history.location.pathname).toBe('/perfil');
  });

  it(`Verificar se existe um título na página e se o título é 
    "Receitas Favoritas"`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');

    const profileTitle = getByText(/Receitas Favoritas/i);
    expect(profileTitle).toBeInTheDocument();
  });
});

describe('Testar conteúdo da Receitas Favoritas', () => {
  it(`Verificar se possui os botões "All", "Food" e "Drink"
    com data-testid específicos`, () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/receitas-favoritas');

    expect(getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-food-btn')).toBeInTheDocument();
    expect(getByTestId('filter-by-drink-btn')).toBeInTheDocument();
  });

  it(`Verificar se ao clicar no botão "All" filtra as comidas 
    e bebidas favoritas`, () => {

  });

  it('Verificar se ao clicar no botão "Food" filtra as comidas favoritas', () => {

  });

  it('Verificar se ao clicar no botão "Drink" filtra as bebidas favoritas', () => {

  });
});
