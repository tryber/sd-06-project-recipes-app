import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testar a tela de explorar', () => {
  it('existem 2 botões de explorar Comidas e Bebidas;', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    expect(screen.getByText('Explorar')).toBeInTheDocument();
    expect(getByTestId('explore-food')).toBeInTheDocument();
    expect(getByTestId('explore-drinks')).toBeInTheDocument();
    expect(screen.getByText('Explorar Comidas')).toBeInTheDocument();
    expect(screen.getByText('Explorar Bebidas')).toBeInTheDocument();
  });

  it('testa ao clicar em Explorar Comidas;', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    fireEvent.click(getByTestId('explore-food'));
    history.push('/explorar/comidas');
    expect(screen.getByText('Explorar Comidas')).toBeInTheDocument();
    expect(getByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(getByTestId('explore-by-area')).toBeInTheDocument();
    expect(getByTestId('explore-surprise')).toBeInTheDocument();
    expect(screen.getByText('Por Ingredientes')).toBeInTheDocument();
    expect(screen.getByText('Por Local de Origem')).toBeInTheDocument();
    expect(screen.getByText('Me Surpreenda!')).toBeInTheDocument();
  });

  it('testa ao clicar em Explorar Bebidas;', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');
    fireEvent.click(getByTestId('explore-drinks'));
    history.push('/explorar/bebidas');
    expect(screen.getByText('Explorar Bebidas')).toBeInTheDocument();
    expect(getByTestId('explore-by-ingredient')).toBeInTheDocument();
    expect(getByTestId('explore-surprise')).toBeInTheDocument();
    expect(screen.getByText('Por Ingredientes')).toBeInTheDocument();
    expect(screen.getByText('Me Surpreenda!')).toBeInTheDocument();
  });
});
