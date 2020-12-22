import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import * as API from '../services/index';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import cocoaDrinks from '../../cypress/mocks/cocoaDrinks';
import chickenMeals from '../../cypress/mocks/chickenMeals';

jest.mock('../services/index');
const mockFoodById = API
  .fetchMealsById.mockImplementation(() => Promise.resolve(oneMeal.meals));
const mockRecomenDrinks = API
  .fetchRecommendedDrinks.mockImplementation(() => Promise.resolve(cocoaDrinks.drinks));

jest.mock('../services/index');
const mockDrinkById = API
  .fetchDrinksById.mockImplementation(() => Promise.resolve(oneDrink.drinks));
const mockRecomenFoods = API
  .fetchRecommendedMeals.mockImplementation(() => Promise.resolve(chickenMeals.meals));

describe('Testa a tela de detalhes de comidas se redereiza os items da receita',
  () => {
    const valueLength = 2;
    const temLength = 10;
    const eigthLength = 8;
    it('Verifica se os elementos de detalhes da receita estão na tela', async () => {
      const { getAllByTestId, history } = renderWithRouter(<App />);
      history.push('/comidas/52977');
      expect(history.location.pathname).toBe('/comidas/52977');
      await (() => expect(mockFoodById).toHaveBeenCalled());
      await (() => expect(mockRecomenDrinks).toHaveBeenCalled());
      const instructions = screen.getByTestId('instructions').textContent.split('.', 1);
      expect(...instructions).toBe('Bring a large pot of water to a boil');
      expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
      expect(document.querySelectorAll('li').length).toBe(eigthLength);
      expect(screen.getAllByText('Spicy Arrabiata Penne').length).toBe(valueLength);
      expect(getAllByTestId('recipe-photo').length).toBe(temLength);
    });
  });

describe('Testa a tela de detalhes de bebidas se redereiza os items da receita',
  () => {
    const valueLength = 1;
    const temLength = 32;
    const threeLength = 3;
    it('Verifica se os elementos de detalhes da receita estão na tela', async () => {
      const { getAllByTestId, getByText, history } = renderWithRouter(<App />);
      history.push('/bebidas/178319');
      expect(history.location.pathname).toBe('/bebidas/178319');
      await (() => expect(mockDrinkById).toHaveBeenCalled());
      await (() => expect(mockRecomenFoods).toHaveBeenCalled());
      expect(getByText('Shake well in a shaker with ice. Strain in a martini glass.'))
        .toBeInTheDocument();
      expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
      expect(document.querySelectorAll('li').length).toBe(threeLength);
      expect(screen.getAllByText('Aquamarine').length).toBe(valueLength);
      expect(getAllByTestId('recipe-photo').length).toBe(temLength);
    });
  });

describe('Testa funcionalidades da tela de detalhes de comidas',
  () => {
    it('testa se é possível copiar link da receita para o clip-Board e favorita a comida',
      async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/comidas/52977');
        expect(history.location.pathname).toBe('/comidas/52977');
        await (() => expect(mockFoodById).toHaveBeenCalled());
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

describe('Testa funcionalidades da tela de detalhes de bebidas',
  () => {
    it('testa se é possível copiar link da receita para o clip-Board e favorita a bebida',
      async () => {
        const { history } = renderWithRouter(<App />);
        history.push('/bebidas/178319');
        expect(history.location.pathname).toBe('/bebidas/178319');
        await (() => expect(mockDrinkById).toHaveBeenCalled());
        await (() => expect(mockRecomenFoods).toHaveBeenCalled());
        expect(screen.getByTestId('share-btn')).toBeInTheDocument();
        const btnFvorite = screen.getByTestId('favorite-btn');
        expect(btnFvorite.src).toBe('whiteHeartIcon.svg');
        fireEvent.click(btnFvorite);
        expect(btnFvorite.src).toBe('blackHeartIcon.svg');
        const video = screen.getByTestId('video');
        expect(video).toBeInTheDocument();
        fireEvent.click(screen.getByText('Iniciar Receita'));
        expect(history.location.pathname).toBe('/bebidas/178319/in-progress');
      });
  });
