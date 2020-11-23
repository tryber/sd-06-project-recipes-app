import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import AppProvider from '../provider/AppProvider';
import Header from '../components/Header';
import BodyResponseFood from '../components/BodyResponseFood';
import BodyResponseDrink from '../components/BodyResponseDrink';

describe.only('testando os elementos da barra de busca', () => {
  it('existir os data-testids tanto da barra de busca quanto de todos os buttons', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <Header />
      </AppProvider>,
    );
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    const ingredButton = queryByTestId('ingredient-search-radio');
    const nameButton = queryByTestId('name-search-radio');
    const firstButton = queryByTestId('first-letter-search-radio');
    const searchButton = queryByTestId('exec-search-btn');
    expect(input).toBeInTheDocument();
    expect(ingredButton).toBeInTheDocument();
    expect(searchButton).toBeInTheDocument();
    expect(nameButton).toBeInTheDocument();
    expect(firstButton).toBeInTheDocument();
  });
});

describe('testando a barra de busca logo abaixo do header', () => {
  it('Se o radio selecionado for Ingrediente, na pagina de comidas', async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseFood />
      </AppProvider>,
    );
    const answer = { meals: [
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'chicken' } });
    const ingredButton = queryByTestId('ingredient-search-radio');
    fireEvent.click(ingredButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });
  it('se o radio selecionado for Nome, na pagina de comidas', async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseFood />
      </AppProvider>,
    );
    const answer = { meals: [
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'chicken' } });
    const nameButton = queryByTestId('name-search-radio');
    fireEvent.click(nameButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
  });
  it('se o radio selecionado for Primeira letra, na pagina de comidas', async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseFood />
      </AppProvider>,
    );
    const answer = { meals: [
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'c' } });
    const firstButton = queryByTestId('first-letter-search-radio');
    fireEvent.click(firstButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
  });
  it('se o radio selecionado for Primeira letra e escrever mais de 1 letra', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseFood />
      </AppProvider>,
    );
    global.alert = jest.fn();
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'ch' } });
    const firstButton = queryByTestId('first-letter-search-radio');
    fireEvent.click(firstButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toBeCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });
});

describe('testando a barra de busca logo abaixo do header', () => {
  it('Se o radio selecionado for Ingrediente na pagina de bebidas', async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseDrink />
      </AppProvider>,
    );
    const answer = { drinks: [
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'vodka' } });
    const ingredButton = queryByTestId('ingredient-search-radio');
    fireEvent.click(ingredButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=vodka');
  });
  it('se o radio selecionado for Nome  na pagina de bebidas', async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseDrink />
      </AppProvider>,
    );
    const answer = { drinks: [
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'vodka' } });
    const nameButton = queryByTestId('name-search-radio');
    fireEvent.click(nameButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka');
  });
  it('se o radio selecionado for Primeira letra  na pagina de bebidas', async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseDrink />
      </AppProvider>,
    );
    const answer = { drinks: [
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'v' } });
    const firstButton = queryByTestId('first-letter-search-radio');
    fireEvent.click(firstButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v');
  });
  it('se o radio selecionado for Primeira letra e digitado mais de 1 letra', () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseDrink />
      </AppProvider>,
    );
    global.alert = jest.fn();
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'vo' } });
    const firstButton = queryByTestId('first-letter-search-radio');
    fireEvent.click(firstButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    expect(global.alert).toHaveBeenCalledTimes(1);
    expect(global.alert).toBeCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });
});
describe('Mostre as receitas em cards caso mais de uma receita seja encontrada', () => {
  it('se mais de uma comida seja encontrada, mostrar as 12 primeiras', async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseFood />
      </AppProvider>,
    );
    const answer = { meals: [
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'chicken' } });
    const ingredButton = queryByTestId('ingredient-search-radio');
    fireEvent.click(ingredButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    const zero = 0;
    for (let i = zero; i < answer.lenght; i += 1) {
      const card = queryByTestId(`${i}-recipe-card`);
      expect(card).toBeInTheDocument();
    }
    const lastCard = queryByTestId(`${answer.lenght}-recipe-card`);
    expect(lastCard).not.toBeInTheDocument();
  });
  it('se mais de uma bebida seja encontrada, mostrar as 12 primeiras', async () => {
    const { queryByTestId, findByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseDrink />
      </AppProvider>,
    );
    const answer = { drinks: [
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'vodka' } });
    const nameButton = queryByTestId('name-search-radio');
    fireEvent.click(nameButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    const zero = 0;
    const maximum = 12;
    for (let i = zero; i < maximum; i += 1) {
      const card = queryByTestId(`${i}-recipe-card`);
      expect(card).toBeInTheDocument();
    }
    const lastCard = queryByTestId(`${maximum}-recipe-card`);
    expect(lastCard).not.toBeInTheDocument();
  });
});
describe('testando um alert caso nenhuma receita seja encontrada', () => {
  it('Caso nenhuma comida seja encontrada o alert deve ser exibido;', async () => {
    const { queryByTestId } = renderWithRouter(
      <AppProvider>
        <BodyResponseFood />
      </AppProvider>,
    );
    const answer = { meals: null };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'xablau' } });
    const ingredButton = queryByTestId('ingredient-search-radio');
    fireEvent.click(ingredButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    const card = queryByTestId('0-recipe-card');
    expect(card).not.toBeInTheDocument();
  });
});
