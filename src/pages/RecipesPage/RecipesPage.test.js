import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../../renderWithRouter';
import RecipesPage from './MealsPage';

describe('Test Recipes page', () => {
  it('tests if there is a Header with title "Comidas"', () => {
    const { getByRole, getByText } = renderWithRouter(<RecipesPage />);
    const heading = getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    const title = getByText(/Comidas/i);
    expect(title).toBeInTheDocument();
  });
  it('tests if there are six buttons to filter by categories', () => {
    const { getAllByRole } = renderWithRouter(<RecipesPage />);
    const buttons = getAllByRole('button');
    const six = 6;
    expect(buttons.length).toBe(six);
  });
  it('tests each button individually', () => {
    const { getByText } = renderWithRouter(<RecipesPage />);
    const allBtn = getByText(/All/i);
    expect(allBtn).toBeInTheDocument();
    fireEvent.click(allBtn);

    const beefBtn = getByText(/Beef/i);
    expect(beefBtn).toBeInTheDocument();
    fireEvent.click(beefBtn);

    const breakfastBtn = getByText(/Breakfast/i);
    expect(breakfastBtn).toBeInTheDocument();
    fireEvent.click(breakfastBtn);

    const chickenBtn = getByText(/Chicken/i);
    expect(chickenBtn).toBeInTheDocument();
    fireEvent.click(chickenBtn);

    const dessertBtn = getByText(/Dessert/i);
    expect(dessertBtn).toBeInTheDocument();
    fireEvent.click(dessertBtn);

    const goatBtn = getByText(/Goat/i);
    expect(goatBtn).toBeInTheDocument();
    fireEvent.click(goatBtn);
  });
  it('tests if twelve cards are rendered', () => {
    const { getAllByRole } = renderWithRouter(<RecipesPage />);
    const cards = getAllByRole('img');
    const cardsLength = 12;
    expect(cards).toBeInTheDocument();
    expect(cards.length).toBe(cardsLength);
  });
});
