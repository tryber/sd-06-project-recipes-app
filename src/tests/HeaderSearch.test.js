import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, fireEvent } from '@testing-library/react';
import Comidas from '../pages/Comidas';
import renderWithRouter from './RenderWithRouter';
import Bebidas from '../pages/Bebidas';

describe('HeaderSearch test', () => {
  it('test search for first lettter of meal in HeaderSearch.js', () => {
    const { getByTestId } = renderWithRouter(<Comidas />);

    const buttonSearch = getByTestId('search-top-btn');

    fireEvent.click(buttonSearch);

    const radio = getByTestId('first-letter-search-radio');

    fireEvent.click(radio);

    const imput = getByTestId('search-input');

    userEvent.type(imput, 'a');

    const buttonBuscar = getByTestId('exec-search-btn');

    fireEvent.click(buttonBuscar);

    const doisSec = 2000;

    setTimeout(() => {
      const apple = screen.getByText(/Apple/i);

      expect(apple).toBeInTheDocument();
    }, doisSec);
  });
  it(
    'test search for first lettter of mealin HeaderSearch.js with a 2 letters string',
    () => {
      const { getByTestId } = renderWithRouter(<Comidas />);

      const buttonSearch = getByTestId('search-top-btn');

      fireEvent.click(buttonSearch);

      const radio = getByTestId('first-letter-search-radio');

      fireEvent.click(radio);

      const imput = getByTestId('search-input');

      userEvent.type(imput, 'aa');

      const buttonBuscar = getByTestId('exec-search-btn');

      fireEvent.click(buttonBuscar);

      const doisSec = 2000;

      setTimeout(() => {
        const apple = screen.getByText(/Apple/i);

        expect(apple).toBeInTheDocument();
      }, doisSec);
    },
  );

  it('test search for first lettter of drink in HeaderSearch.js', () => {
    const { getByTestId } = renderWithRouter(<Bebidas />);

    const buttonSearch = getByTestId('search-top-btn');

    fireEvent.click(buttonSearch);

    const radio = getByTestId('first-letter-search-radio');

    fireEvent.click(radio);

    const imput = getByTestId('search-input');

    userEvent.type(imput, 'a');

    const buttonBuscar = getByTestId('exec-search-btn');

    fireEvent.click(buttonBuscar);

    const doisSec = 2000;

    setTimeout(() => {
      const apple = screen.getByText(/Ace/i);

      expect(apple).toBeInTheDocument();
    }, doisSec);
  });
  it('test search for first lettter of a drink that does not exists', () => {
    const { getByTestId } = renderWithRouter(<Bebidas />);

    const buttonSearch = getByTestId('search-top-btn');

    fireEvent.click(buttonSearch);

    const radio = getByTestId('first-letter-search-radio');

    fireEvent.click(radio);

    const imput = getByTestId('search-input');

    userEvent.type(imput, 'azxxx');

    const buttonBuscar = getByTestId('exec-search-btn');

    fireEvent.click(buttonBuscar);

    const doisSec = 2000;

    setTimeout(() => {
      const apple = screen.getByText(/Ace/i);

      expect(apple).toBeInTheDocument();
    }, doisSec);
  });
  it('test search for first lettter of none', () => {
    const { getByTestId } = renderWithRouter(<Bebidas />);

    const buttonSearch = getByTestId('search-top-btn');

    fireEvent.click(buttonSearch);

    const radio = getByTestId('first-letter-search-radio');

    fireEvent.click(radio);

    const imput = getByTestId('search-input');

    userEvent.type(imput, '');

    const buttonBuscar = getByTestId('exec-search-btn');

    fireEvent.click(buttonBuscar);
  });
  it('test search for name in drinks', () => {
    const { getByTestId } = renderWithRouter(<Bebidas />);

    const buttonSearch = getByTestId('search-top-btn');

    fireEvent.click(buttonSearch);

    const radio = getByTestId('name-search-radio');

    fireEvent.click(radio);

    const imput = getByTestId('search-input');

    userEvent.type(imput, 'Ace');

    const buttonBuscar = getByTestId('exec-search-btn');

    fireEvent.click(buttonBuscar);

    const doisSec = 2000;

    setTimeout(() => {
      const apple = screen.getByText(/Ace/i);

      expect(apple).toBeInTheDocument();
    }, doisSec);
  });
  it('test search for ingredient in drinks', () => {
    const { getByTestId } = renderWithRouter(<Bebidas />);

    const buttonSearch = getByTestId('search-top-btn');

    fireEvent.click(buttonSearch);

    const radio = getByTestId('ingredient-search-radio');

    fireEvent.click(radio);

    const imput = getByTestId('search-input');

    userEvent.type(imput, 'a');

    const buttonBuscar = getByTestId('exec-search-btn');

    fireEvent.click(buttonBuscar);

    const doisSec = 2000;

    setTimeout(() => {
      const apple = screen.getByText(/Ace/i);

      expect(apple).toBeInTheDocument();
    }, doisSec);
  });
});
