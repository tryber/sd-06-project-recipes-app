import React from 'react';
import renderWithRouter from './services/renderWithRouter';
import App from './App';

test('Farewell, front-end', () => {
  const { history } = renderWithRouter(<App />);
  const routeInitial = history.location.pathname;
  expect(routeInitial).toBe('/');
});
