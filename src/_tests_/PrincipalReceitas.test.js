import React from 'react';
import { waitForElement } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';

const firstFoods = [
  { name: 'Corba', img: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg' },
  { name: 'Kumpir', img: 'https://www.themealdb.com/images/media/meals/mlchx21564916997.jpg' },
  { name: 'Tamiya', img: 'https://www.themealdb.com/images/media/meals/n3xxd91598732796.jpg' },
  { name: 'Dal fry', img: 'https://www.themealdb.com/images/media/meals/wuxrtu1483564410.jpg' },
  { name: 'Poutine', img: 'https://www.themealdb.com/images/media/meals/uuyrrx1487327597.jpg' },
  { name: 'Lasagne', img: 'https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg' },
  { name: 'Timbits', img: 'https://www.themealdb.com/images/media/meals/txsupu1511815755.jpg' },
  { name: 'Wontons', img: 'https://www.themealdb.com/images/media/meals/1525876468.jpg' },
  { name: 'Kafteji', img: 'https://www.themealdb.com/images/media/meals/1bsv1q1560459826.jpg' },
  { name: 'Big Mac', img: 'https://www.themealdb.com/images/media/meals/urzj1d1587670726.jpg' },
  { name: 'Koshari', img: 'https://www.themealdb.com/images/media/meals/4er7mj1598733193.jpg' },
  { name: 'Kapsalon', img: 'https://www.themealdb.com/images/media/meals/sxysrt1468240488.jpg' },
];

const firstDrinks = [
  { name: 'GG', img: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg' },
  { name: 'A1', img: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg' },
  { name: 'ABC', img: 'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg' },
  { name: 'Kir', img: 'https://www.thecocktaildb.com/images/media/drink/apneom1504370294.jpg' },
  { name: '747', img: 'https://www.thecocktaildb.com/images/media/drink/xxsxqy1472668106.jpg' },
  { name: '252', img: 'https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg' },
  { name: 'Ace', img: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg' },
  { name: 'Adam', img: 'https://www.thecocktaildb.com/images/media/drink/v0at4i1582478473.jpg' },
  { name: 'B-53', img: 'https://www.thecocktaildb.com/images/media/drink/rwqxrv1461866023.jpg' },
  { name: 'AT&T', img: 'https://www.thecocktaildb.com/images/media/drink/rhhwmp1493067619.jpg' },
  { name: 'ACID', img: 'https://www.thecocktaildb.com/images/media/drink/xuxpxt1479209317.jpg' },
  { name: 'B-52', img: 'https://www.thecocktaildb.com/images/media/drink/5a3vg61504372070.jpg' },
];

const categoryMeals = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
const categoryDrinks = ['Ordinary Drink', 'Cocktail',
  'Milk / Float / Shake', 'Other/Unknown', 'Cocoa'];

describe('Tela principal de receitas', () => {
  it('A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
    const { getByText, getByTestId } = renderWithRouter(<Comidas />);
    expect(getByText(/Comidas/i)).toBeInTheDocument();

    firstFoods.forEach((food, index) => {
      waitForElement(() => {
        expect(getByTestId(`${index}-recipe-cards`)).toBeInTheDocument();
        expect(getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
        const recipeName = getByTestId(`${index}-card-name`);
        const recipeImg = getByTestId(`${index}-card-img`);
        expect(recipeName.innerText).toBe(food.name);
        expect(recipeImg.src).toBe(food.img);
      });
    });
  });

  it('A tela tem os data-testids de todos os 12 cards da tela de bebidas', () => {
    const { getByText } = renderWithRouter(<Bebidas />);
    expect(getByText(/Bebidas/i)).toBeInTheDocument();

    firstDrinks.forEach((drink, index) => {
      waitForElement(() => {
        expect(getByTestId(`${index}-recipe-cards`)).toBeInTheDocument();
        expect(getByTestId(`${index}-card-img`)).toBeInTheDocument();
        expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
        const recipeName = getByTestId(`${index}-card-name`);
        const recipeImg = getByTestId(`${index}-card-img`);
        expect(recipeName.innerText).toBe(drink.name);
        expect(recipeImg.src).toBe(drink.img);
      });
    });
  });

  it(`27-Meals-Cada botão deve conter o atributo prefixado 
  data-testid={categoryName}-category-filter e devem ser exibidas
  apenas as 5 primeiras categorias retornadas da API.`, () => {
    const { getByText, getByTestId } = renderWithRouter(<Comidas />);
    expect(getByText(/Comidas/i)).toBeInTheDocument();

    categoryMeals.forEach((categoryName) => {
      waitForElement(() => {
        expect(getByTestId(`${categoryName}-category-filter`)).toBeInTheDocument();
      });
    });
  });

  it(`27-Drinks-Cada botão deve conter o atributo prefixado 
  data-testid={categoryName}-category-filter e devem ser exibidas
  apenas as 5 primeiras categorias retornadas da API.`, () => {
    const { getByText } = renderWithRouter(<Bebidas />);
    expect(getByText(/Bebidas/i)).toBeInTheDocument();

    categoryDrinks.forEach((categoryName) => {
      waitForElement(() => {
        expect(getByTestId(`${categoryName}-category-filter`)).toBeInTheDocument();
      });
    });
  });

  it('28-', () => {

  });

  it(`29- Implemente o filtro como um toggle, que se for selecionado de novo, 
  o app deve retornar as receitas sem nenhum filtro`, () => {

  });
});
