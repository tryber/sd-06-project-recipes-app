import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('App:', () => {
  beforeAll(() => {
    const email = 'email@email.com';
    localStorage.user = JSON.stringify({ email });
  });
  it('Renders the home page on the path "/"', () => {
    renderWithRouter(<App />);
  });
});
