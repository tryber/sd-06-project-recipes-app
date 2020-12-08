import React from 'react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

describe('81 - Implemente a rota que deve ser apenas '
  + '/explorar/comidas/area', () => {
  it.only('A rota /explorar/bebidas/area não deve estar disponível, '
    + 'retornando um erro de "Not Found".'
    + 'Ao acessar a rota ela retorna um erro de "Not Found".', async () => {
    const { findByText, history } = renderWithRouter(<App />);
    history.push('explorar/bebidas/area');

    const pageNotFound = findByText(/Not Found/i);

    expect(pageNotFound).toBeTruthy();
  });
});
