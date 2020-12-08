import { fireEvent, render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { Router } from 'react-router-dom';
import RevenueContext from '../../context/RevenueContext';
import MainPage from '../../pages/MainPage';

const BUTTON_SELECT_PROFILE = 'test-profile-top-btn';

describe('11 - Redirecione a pessoa usuária para a tela de perfil'
+ 'ao clicar no botão de perfil', () => {
  it('A mudança de tela ocorre', async () => {
    const mockValue = {
      foods: [{}],
      search: 'Teste',
      searchButton: false,
      setSearchButton: jest.fn(),
      setSearch: jest.fn(),
      fetchApi: jest.fn(),
    };

    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <RevenueContext.Provider value={ mockValue }>
          <MainPage title="header" />
        </RevenueContext.Provider>
      </Router>,
      history,
    );

    expect(history.location.pathname).toEqual('/');

    fireEvent.click(screen.getByTestId(BUTTON_SELECT_PROFILE));

    expect(history.location.pathname).toEqual('/perfil');
  });
});
