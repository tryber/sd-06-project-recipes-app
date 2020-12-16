import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import * as API from '../services/index';
import oneMeal from '../../cypress/mocks/oneMeal';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';

jest.mock('../services/index');
const mockById = API
  .fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));
const mockRecomenDrinks = API
  .fetchRecommendedDrinks.mockImplementation(() => Promise.resolve(cocoaDrinks.drinks));

describe('Testa a tela de detalhes de comidas se redereiza os items da receita',
  () => {
    const valueLength = 2;
    const temLength = 10;
    const eigthLength = 8;
    it('Verifica se os elementos de detalhes da receita estão na tela', async () => {
      const { getAllByTestId, history } = renderWithRouter(<App />);
      history.push('/comidas/52977');
      expect(history.location.pathname).toBe('/comidas/52977');
      await (() => expect(mockById).toHaveBeenCalled());
      await (() => expect(mockRecomenDrinks).toHaveBeenCalled());
      const instructions = screen.getByTestId('instructions').textContent.split('.', 1);
      expect(...instructions).toBe('Bring a large pot of water to a boil');
      expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
      expect(document.querySelectorAll('li').length).toBe(eigthLength);
      expect(screen.getAllByText('Spicy Arrabiata Penne').length).toBe(valueLength);
      expect(getAllByTestId('recipe-photo').length).toBe(temLength);
    });
  });

describe('Testa funcionalidades da tela de detalhes',
  () => {
    it('testa se é possível copiar link da receita para o clip-Board e favorita a mesma ',
      async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/comidas/52977');
        expect(history.location.pathname).toBe('/comidas/52977');
        await (() => expect(mockById).toHaveBeenCalled());
        await (() => expect(mockRecomenDrinks).toHaveBeenCalled());
        expect(screen.getByTestId('share-btn')).toBeInTheDocument();
        const btnFvorite = screen.getByTestId('favorite-btn');
        expect(btnFvorite.src).toBe('whiteHeartIcon.svg');
        fireEvent.click(btnFvorite);
        expect(btnFvorite.src).toBe('blackHeartIcon.svg');
        const video = screen.getByTestId('video');
        expect(video.src).toBe('https://www.youtube.com/embed/1IszT_guI08');
        fireEvent.click(screen.getByText('Iniciar Receita'));
        expect(history.location.pathname).toBe('/comidas/52977/in-progress');
      });
  });
