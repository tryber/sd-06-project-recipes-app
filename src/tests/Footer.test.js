import React from 'react';
import { fireEvent } from '@testing-library/react';
import Comidas from '../pages/Comidas';
import renderWithRouter from './RenderWithRouter';

describe('Footer test', () => {
  it('test button explore in footer.js', () => {
    const { history, getByTestId } = renderWithRouter(<Comidas />);

    const button = getByTestId('explore-bottom-link');

    fireEvent.click(button);

    expect(history.location.pathname).toEqual('/explorar');
  });
});
