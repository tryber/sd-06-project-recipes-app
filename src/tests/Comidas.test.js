import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import Comidas from '../pages/Comidas';

describe('Comidas test', () => {
  it('test buttons in comidas category', async () => {
    const { findByText, getByText } = renderWithRouter(<Comidas />);

    await findByText('Beef');

    expect(getByText('Goat')).toBeInTheDocument();

    const AllBtn = getByText('All');

    fireEvent.click(AllBtn);

    await findByText('Kumpir');

    const ChickenBtn = getByText('Chicken');

    fireEvent.click(ChickenBtn);

    await findByText('Brown Stew Chicken');
  });
});
