import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Deve aparecer quando usado uma rota não existente:', () => {
  it('Página não encontrada', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existente');

    const message = getByText(/Not Found/i);
    expect(message).toBeInTheDocument();
  });
});
