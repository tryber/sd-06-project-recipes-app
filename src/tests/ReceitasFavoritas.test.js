import React from 'react';
import { fireEvent, waitForElement } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import Home from '../pages/Home';
import whiteHeartIcon from '../styles/images/whiteHeartIcon.svg';
import blackHeartIcon from '../styles/images/blackHeartIcon.svg';

describe('Comidas test', () => {
  it('have the heder', () => {
    const { getByTestId } = renderWithRouter(<ReceitasFavoritas />);

    expect(getByTestId('header')).toBeInTheDocument();
  });

  it('', async () => {
    const { history, getByAltText, getByText, findByText } = renderWithRouter(<Home />);

    history.push('/comidas/52977');
    expect(history.location.pathname).toEqual('/comidas/52977');

    await waitForElement(() => findByText('Corba'));

    fireEvent.click(getByAltText('img-button-fav-white'));

    history.push('/receitas-favoritas');
    expect(history.location.pathname).toEqual('/receitas-favoritas');

    expect(getByText('Corba')).toBeInTheDocument();
    // expect(getByTestId('header')).toBeInTheDocument();
  });
});
