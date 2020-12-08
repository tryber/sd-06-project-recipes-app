import React from 'react';
import Header from '../../components/Header';
import RevenueContext from '../../context/RevenueContext';
import renderWithRouter2 from '../renderWithRouter/renderWithRouter2';

describe('9 - Implemente os elementos do '
  + 'header na tela principal de receitas', () => {
  it('Possui os data-testids profile-top-btn, page-title e search-top-btn', async () => {
    const mockValue = { search: 'Teste', searchButton: false };

    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValue }>
        <Header title="Título teste" />
      </RevenueContext.Provider>,
    );
    expect(getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(getByTestId('page-title')).toBeInTheDocument();
    expect(getByTestId('search-top-btn')).toBeInTheDocument();
  });
});
