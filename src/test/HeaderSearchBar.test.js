import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Header from '../components/Header';
import Food from '../pages/Food';
import Drink from '../pages/Drink';
import NavigationMenu from '../components/NavigationMenu';

describe('testando os elementos da barra de busca', () => {
  it('existir os data-testids tanto da barra de busca quanto de todos os buttons', () => {
    const { queryByTestId } = renderWithRouter(<Header />);
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
    const { queryByTestId, findByTestId } = renderWithRouter(<Food />);
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'rice' } });
    const ingredButton = queryByTestId('ingredient-search-radio');
    fireEvent.click(ingredButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
  });
  it('se o radio selecionado for Nome, na pagina de comidas', async () => {
    const answer = { meals: [
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Yellow Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365096.jpg',
        idMeal: '59440' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const { queryByTestId, findByTestId } = renderWithRouter(<Food />);
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'chicken' } });
    const nameButton = queryByTestId('name-search-radio');
    fireEvent.click(nameButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=chicken');
  });
  it('se o radio selecionado for Primeira letra, na pagina de comidas', async () => {
    const answer = { meals: [
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'Yellow Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365096.jpg',
        idMeal: '59440' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const { queryByTestId, findByTestId } = renderWithRouter(<Food />);
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'c' } });
    const firstButton = queryByTestId('first-letter-search-radio');
    fireEvent.click(firstButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
  });
  it('se o radio selecionado for Primeira letra e escrever mais de 1 letra', () => {
    const { queryByTestId } = renderWithRouter(<Food />);
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
    const answer = { drinks: [
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Short vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565214.jpg',
        idDrink: '13996' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const { queryByTestId, findByTestId } = renderWithRouter(<Drink />);
    const four = 4;
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'vodka' } });
    const ingredButton = queryByTestId('ingredient-search-radio');
    fireEvent.click(ingredButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toHaveBeenCalledTimes(four);
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  });
  it('se o radio selecionado for Nome  na pagina de bebidas', async () => {
    const answer = { drinks: [
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Short vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565214.jpg',
        idDrink: '13996' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const { queryByTestId, findByTestId } = renderWithRouter(<Drink />);
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'vodka' } });
    const nameButton = queryByTestId('name-search-radio');
    fireEvent.click(nameButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=vodka');
  });
  it('se o radio selecionado for Primeira letra  na pagina de bebidas', async () => {
    const answer = { drinks: [
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13196' },
      { strDrink: 'Short vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565214.jpg',
        idDrink: '13996' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const { queryByTestId, findByTestId } = renderWithRouter(<Drink />);
    const search = queryByTestId('search-top-btn');
    fireEvent.click(search);
    const input = queryByTestId('search-input');
    fireEvent.change(input, { target: { value: 'v' } });
    const firstButton = queryByTestId('first-letter-search-radio');
    fireEvent.click(firstButton);
    const searchButton = queryByTestId('exec-search-btn');
    fireEvent.click(searchButton);
    await findByTestId('0-recipe-card');
    expect(global.fetch).toBeCalledWith('https://www.thecocktaildb.com/api/json/v1/1/search.php?f=v');
  });
  it('se o radio selecionado for Primeira letra e digitado mais de 1 letra', () => {
    const { queryByTestId } = renderWithRouter(<Drink />);
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
    const answer = { meals: [
      { strMeal: 'Brown Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365095.jpg',
        idMeal: '52940' },
      { strMeal: 'White Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365099.jpg',
        idMeal: '52440' },
      { strMeal: 'Yellow Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365097.jpg',
        idMeal: '52740' },
      { strMeal: 'Pink Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365098.jpg',
        idMeal: '52840' },
      { strMeal: 'Blue Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365096.jpg',
        idMeal: '52640' },
      { strMeal: 'Green Stew Chicken',
        strMealThumb: 'https:www.themealdb.comimagesmediamealssypxpx1515365094.jpg',
        idMeal: '52040' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const { queryByTestId, findByTestId } = renderWithRouter(<Food />);
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
    const answer = { drinks: [
      { strDrink: 'Long vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565211.jpg',
        idDrink: '13196' },
      { strDrink: 'Pink vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565212.jpg',
        idDrink: '13197' },
      { strDrink: 'Blue vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565213.jpg',
        idDrink: '13198' },
      { strDrink: 'Yellow vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565214.jpg',
        idDrink: '13199' },
      { strDrink: 'Green vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565215.jpg',
        idDrink: '13111' },
      { strDrink: 'Orange vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565210.jpg',
        idDrink: '13192' },
      { strDrink: 'Brown vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565216.jpg',
        idDrink: '13193' },
      { strDrink: 'White vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565217.jpg',
        idDrink: '13194' },
      { strDrink: 'Black vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565218.jpg',
        idDrink: '13195' },
      { strDrink: 'Gray vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565219.jpg',
        idDrink: '13167' },
      { strDrink: 'Red vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565222.jpg',
        idDrink: '13168' },
      { strDrink: 'Rose vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565232.jpg',
        idDrink: '13169' },
      { strDrink: 'Short vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565242.jpg',
        idDrink: '13140' },
      { strDrink: 'Medium vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565252.jpg',
        idDrink: '13145' },
      { strDrink: 'Little vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565262.jpg',
        idDrink: '13156' },
      { strDrink: 'Big vodka',
        strDrinkThumb: 'https:www.thecocktaildb.comimagesmediadrink9179i01503565272.jpg',
        idDrink: '13178' },
    ] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const { queryByTestId, findByTestId } = renderWithRouter(<Drink />);
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

describe('verificar se tem as categorias', () => {
  it('se todas as categorias aparecem na tela de comida', async () => {
    const answer = { meals: [{ strCategory: 'Beef' }, { strCategory: 'Breakfast' },
      { strCategory: 'Goat' }, { strCategory: 'Dessert' },
      { strCategory: 'Chicken' }] };
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(answer),
    }));
    const { queryByTestId, findByTestId } = renderWithRouter(
      <NavigationMenu page="Comidas" />,
    );
    await findByTestId('Beef-category-filter');
    const beef = queryByTestId('Beef-category-filter');
    const breakfast = queryByTestId('Breakfast-category-filter');
    const chicken = queryByTestId('Chicken-category-filter');
    const dessert = queryByTestId('Dessert-category-filter');
    const goat = queryByTestId('Goat-category-filter');
    const all = queryByTestId('All-category-filter');
    expect(beef).toBeInTheDocument();
    fireEvent.click(all);
    fireEvent.click(beef);
    expect(breakfast).toBeInTheDocument();
    expect(chicken).toBeInTheDocument();
    expect(dessert).toBeInTheDocument();
    expect(goat).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  });
});
