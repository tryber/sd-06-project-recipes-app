import React from 'react';
import { fireEvent } from '@testing-library/react';
import Login from './Login';
import renderWithRouter from '../../renderWithRouter';

describe('Test Login page', () => {
  it('tests if there is an Email input', () => {
    const { getByLabelText } = renderWithRouter(<Login />);
    const email = getByLabelText(/Email/i);
    expect(email).toBeInTheDocument();
  });

  it('tests if there is a password Input', () => {
    const { getByLabelText } = renderWithRouter(<Login />);
    const password = getByLabelText(/Senha/i);
    expect(password).toBeInTheDocument();
  });

  it('tests if use is redirected when logged in', () => {
    const { history, getByText } = renderWithRouter(<Login />);
    const loginBtn = getByText(/Entrar/i);
    expect(loginBtn).toBeInTheDocument();
    fireEvent.click(loginBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });
});
