import React from 'react';
import { fireEvent } from '@testing-library/react';
import Footer from './Footer';
import renderWithRouter from '../renderWithRouter';
import { drinkIcon, mealIcon, exploreIcon } from '../images';

describe('renders footer correctly', () => {
  it('expect "drinkIcon.svg, exploreIcon.svg and mealIcon.svg" in the document', () => {
    const { getAllByRole } = renderWithRouter(<Footer />);
    const footerPics = getAllByRole('img');
    const footerPicsNbr = 3;
    expect(footerPics.length).toBe(footerPicsNbr);
    expect(footerPics[0]).toHaveAttribute('src', `${drinkIcon}`);
    expect(footerPics[1]).toHaveAttribute('src', `${mealIcon}`);
    expect(footerPics[2]).toHaveAttribute('src', `${exploreIcon}`);
  });

  it('expect drink link to redirect correctly', () => {
    const { history, getByText } = renderWithRouter(<Footer />);
    const drink = getByText(/Drinks/i);
    expect(drink).toBeInTheDocument();
    fireEvent.click(drink);
    const { pathname } = history.location;
    expect(pathname).toBe('/bebidas');
  });

  it('expect meal link to redirect correctly', () => {
    const { history, getByText } = renderWithRouter(<Footer />);
    const meal = getByText(/Comidas/i);
    expect(meal).toBeInTheDocument();
    fireEvent.click(meal);
    const { pathname } = history.location;
    expect(pathname).toBe('/comidas');
  });

  it('expect meal link to redirect correctly', () => {
    const { history, getByText } = renderWithRouter(<Footer />);
    const explore = getByText(/Explore/i);
    expect(explore).toBeInTheDocument();
    fireEvent.click(explore);
    const { pathname } = history.location;
    expect(pathname).toBe('/explorar');
  });
});
