import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('Teste se a página Login é renderizada com dois inputs e botão login', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );
  const loginButton = getByText(/Login/i);
  const buttao = getByRole('button');
  const email = screen.getByTestId('email-input');
  const senha = screen.getByTestId('password-input');

  expect(loginButton).toBeInTheDocument();
  expect(buttao).toBeInTheDocument();
  expect(email).toBeInTheDocument();
  expect(senha).toBeInTheDocument();
});
