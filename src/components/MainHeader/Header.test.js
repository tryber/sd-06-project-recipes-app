import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import Header from './Header';

describe('Test Header.js', () => {
  it('tests if there is a h1 with the page title', () => {
    const { getByRole, getByTestId } = renderWithRouter(<Header />);
    const heading = getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    const title = getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
  it('tests if the user is redirected when clicked in the profile picture', () => {
    const { history, getByAltText } = renderWithRouter(<Header />);
    const profileBtn = getByAltText(/Ícone de Perfil/i);
    expect(profileBtn).toBeInTheDocument();
    fireEvent.click(profileBtn);
    const { pathname } = history.location;
    expect(pathname).toBe('/perfil');
  });
});
