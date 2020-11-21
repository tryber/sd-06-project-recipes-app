import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../components/Footer';

describe('Menu inferior', () => {
  it('19 - Os botões de drinks, explorar e comida são renderizados', () => {
    const { getByTestId } = render(<Footer />);

    const drinksButton = getByTestId('drinks-bottom-btn');
    const exploreButton = getByTestId('explore-bottom-btn');
    const foodButton = getByTestId('food-bottom-btn');

    expect(drinksButton).toBeInTheDocument();
    expect(exploreButton).toBeInTheDocument();
    expect(foodButton).toBeInTheDocument();
  });
});
