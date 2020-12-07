import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../pages/NotFound';

describe('Profile page tests', () => {
  describe('NotFound page tests', () => {
    it('test if "Not Found" is show on the page', () => {
      renderWithRouter(<NotFound />);
      expect(screen.getAllByText('Not Found')[0]).toBeInTheDocument();
    });
  });
});
