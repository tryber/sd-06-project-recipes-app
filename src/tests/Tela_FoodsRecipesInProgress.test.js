import React from 'react';
import userEvent from '@testing-library/user-event';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import * as API from '../services/index';
import oneMeal from '../../cypress/mocks/oneMeal';

jest.mock('../services/index');
const mockFetchById = API
  .fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));

describe('Testar a página de receitas em progresso renderiza normalmente', () => {
  const eightLength = 8;
  it('Possui input e-mail que faz a validação', async () => {
    const { content, history } = renderWithRouter(<App />);
    history.push('/comidas/52771/in-progress');
    await (() => expect(mockFetchById).toHaveBeenCalled());
    expect(screen.getAllByText('Spicy Arrabiata Penne'));
    expect(screen.getAllByText('Vegetarian'));
    expect(screen.getByTestId('share-btn'));
    expect(screen.getByTestId('favorite-btn'));
    const ingredientes = document.querySelector('.ingredients').childNodes;
    expect(ingredientes.length).toBe(eightLength);
    const checkBox = document.querySelectorAll('input[type=checkbox]');
    expect(checkBox.length).toBe(eightLength);
  });
});
