import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('testa se as rotas direcionam para as paginas correspondente', () => {
  test('O caminho para pagina login deve ser: /', () => {
    const { history } = renderWithRouter(<App />);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
});
