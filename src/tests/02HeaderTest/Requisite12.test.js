import { fireEvent } from '@testing-library/react';
import React from 'react';
import Provider from '../../context/Provider';
import RevenueContext from '../../context/RevenueContext';
import MainPage from '../../pages/MainPage';
import renderWithRouter2 from '../renderWithRouter/renderWithRouter2';

describe('12 - Desenvolva o botão de busca que, ao ser clicado,'
+ 'a barra de busca deve aparecer. O mesmo serve para escondê-la', () => {
  it('Ao clicar no botão de busca pela primeira vez a barra de busca aparece', () => {
    const { queryByTestId, getByTestId } = renderWithRouter2(
      <RevenueContext.Provider>
        <Provider>
          <MainPage title="Comidas" />
        </Provider>
      </RevenueContext.Provider>,
    );

    expect(queryByTestId('test-search-bar')).toBeNull();

    fireEvent.click(getByTestId('test-search-top-btn'));

    expect(queryByTestId('test-search-bar')).toBeInTheDocument();
  });

  it('Ao clicar no botão de busca pela segunda vez a barra de busca desaparece', () => {
    const { queryByTestId, getByTestId } = renderWithRouter2(
      <RevenueContext.Provider>
        <Provider>
          <MainPage title="Comidas" />
        </Provider>
      </RevenueContext.Provider>,
    );

    expect(queryByTestId('test-search-bar')).toBeNull();

    fireEvent.click(getByTestId('test-search-top-btn'));

    expect(queryByTestId('test-search-bar')).toBeInTheDocument();

    fireEvent.click(getByTestId('test-search-top-btn'));

    expect(queryByTestId('test-search-bar')).toBeNull();
  });
});
