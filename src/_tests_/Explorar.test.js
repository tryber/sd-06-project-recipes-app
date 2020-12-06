import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('A tele de explorar deve possuir:', () => {
  it('Possui 2 botões, um para explorar comidas e outro para explorar bebidas:', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const explorarComidaBtn = getByTestId('explore-food');
    const explorarBebidaBtn = getByTestId('explore-drinks');

    expect(explorarComidaBtn).toBeInTheDocument();
    expect(explorarBebidaBtn).toBeInTheDocument();
  });

  it('Deve possuir os textos `Explorar Comidas`e `Explorar Bebidas`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const textComidas = getByText(/Explorar Comidas/i);
    const textBebidas = getByText(/Explorar Bebidas/i);

    expect(textComidas).toBeInTheDocument();
    expect(textBebidas).toBeInTheDocument();
  });

  it('Redireciona para a página de explorar comidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const explorarComidaBtn = getByTestId('explore-food');

    fireEvent.click(explorarComidaBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/comidas');
  });

  it('Redireciona para a página de explorar bebidas', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar');

    const explorarBebidaBtn = getByTestId('explore-drinks');

    fireEvent.click(explorarBebidaBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/explorar/bebidas');
  });

  it('A página de Explorar Comidas possui 3 botões', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');

    const ingredientBtn = getByTestId('explore-by-ingredient');
    const areaBtn = getByTestId('explore-by-area');
    const surpriseBtn = getByTestId('explore-surprise');

    expect(ingredientBtn).toBeInTheDocument();
    expect(areaBtn).toBeInTheDocument();
    expect(surpriseBtn).toBeInTheDocument();
  });

  it('A página de Explorar Bebidas possui 2 botões', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/explorar/bebidas');

    const ingredientBtn = getByTestId('explore-by-ingredient');
    const surpriseBtn = getByTestId('explore-surprise');

    expect(ingredientBtn).toBeInTheDocument();
    expect(surpriseBtn).toBeInTheDocument();
  });

  it('', () => {
    const { getByTestId, getByText, history } = renderWithRouter(<App />);
    history.push('/explorar/comidas');

    const ingredientComidasBtn = getByTestId('explore-by-ingredient');

    fireEvent.click(ingredientComidasBtn);

    const ingredientExplorar = getByText(/Explorar Ingredientes/i);
    expect(ingredientExplorar).toBeInTheDocument();
  });
});
