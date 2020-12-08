import React from 'react';
import { waitForElement } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Comidas from '../pages/Comidas';
// import Bebidas from '../pages/Bebidas';
import DetalhesComida from '../pages/DetalhesComida';
import DetalhesBebida from '../pages/DetalhesBebida';

describe('Tela de detalhes de receitas', () => {
  it('A tela de detalhes tem os data-testids corretos', async () => {
    const { history, findByTestId } = renderWithRouter(<Comidas />);
    history.push('/comidas/52977');
    expect(history.location.pathname).toBe('/comidas/52977');

    waitForElement(async () => {
      const btnStart = await findByTestId('start-recipe-btn');
      expect(btnStart).toBeInTheDocument();
    });
  });

  it('Teste Detalhes Comida', async () => {
    const { history, findByTestId } = renderWithRouter(<DetalhesComida />);
    history.push('/comidas/52977');
    expect(history.location.pathname).toBe('/comidas/52977');

    waitForElement(async () => {
      const btnStart = await findByTestId('start-recipe-btn');
      expect(btnStart).toBeInTheDocument();
    });
  });

  it('Teste Detalhes Bebida', async () => {
    const { history, findByTestId } = renderWithRouter(<DetalhesBebida />);
    history.push('/bebidas/15997');
    expect(history.location.pathname).toBe('/bebidas/15997');

    waitForElement(async () => {
      const btnStart = await findByTestId('start-recipe-btn');
      expect(btnStart).toBeInTheDocument();
    });
  });
});
