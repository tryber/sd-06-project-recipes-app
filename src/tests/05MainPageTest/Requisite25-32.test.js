import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../../App';
import RevenueContext from '../../context/RevenueContext';
import MainPage from '../../pages/MainPage';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import renderWithRouter2 from '../renderWithRouter/renderWithRouter2';

const mockValueMeal = {
  foods: [{
    idMeal: 1,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 2,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 3,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 4,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 5,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 6,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 7,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 8,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 9,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 10,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 11,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  },
  {
    idMeal: 12,
    strMeal: 'Teste',
    strMealThumb: 'https://www.teste.com/',
  }],
  searchButton: true,
  searchParam: 'Meal',
  setSearchParam: jest.fn(),
  fetchCategories: jest.fn(),
  fetchApi: jest.fn(),
  setSearchButton: jest.fn(),
  setSearch: jest.fn(),
  strCategory: jest.fn(),
  CategoryButton: jest.fn(),
  setSelectedButton: jest.fn(),
};

const mockValueDrink = {
  foods: [{
    idDrink: 1,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 2,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 3,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 4,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 5,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 6,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 7,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 8,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 9,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 10,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 11,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  },
  {
    idDrink: 12,
    strDrink: 'Teste',
    strDrinkThumb: 'https://www.teste.com/',
  }],
  searchButton: jest.fn(),
  searchParam: 'Drink',
  setSearchParam: jest.fn(),
  fetchCategories: jest.fn(),
  fetchApi: jest.fn(),
  setSearchButton: jest.fn(),
  setSearch: jest.fn(),
  linkCategoriesAPI: jest.fn(),
  setSelectedButton: jest.fn(),
};

const ZERO = 0;
const TWELVE = 12;
const TWO = 2;
const EIGHT = 8;

describe('25 - Implemente os elementos da tela principal de receitas'
+ 'respeitando os atributos descritos no protótipo', () => {
  it('A tela tem os data-testids de todos os 12 cards da tela de comidas', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValueMeal }>
        <MainPage title="Comidas" />
      </RevenueContext.Provider>,
    );

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });

  it('A tela tem os data-testids de todos os 12 cards da tela de bebidas', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValueDrink }>
        <MainPage title="Bebidas" />
      </RevenueContext.Provider>,
    );

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
});

describe('26 - Carregue as 12 primeiras receitas de comidas ou bebidas'
+ 'uma em cada card', () => {
  it('Caso as receitas sejam de comida, deve-se carregar as 12 primeiras'
  + 'receitas obtidas através do endpoint', () => {
    renderWithRouter2(
      <RevenueContext.Provider value={ mockValueMeal }>
        <MainPage title="Comidas" />
      </RevenueContext.Provider>,
    );
    expect(mockValueMeal.fetchApi).toHaveBeenCalledTimes(TWO);
  });
  it('Caso as receitas sejam de bebida, deve-se carregar as 12 primeiras'
   + 'receitas obtidas através do endpoint', () => {
    renderWithRouter2(
      <RevenueContext.Provider value={ mockValueDrink }>
        <MainPage title="Bebidas" />
      </RevenueContext.Provider>,
    );
    expect(mockValueDrink.fetchApi).toHaveBeenCalledTimes(TWO);
  });

  it('O Card de receita deve conter sua foto strMealThumb e seu nome strMeal', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValueMeal }>
        <MainPage title="Comidas" />
      </RevenueContext.Provider>,
    );

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
      expect(getByTestId(`${index}-card-img`)).toBeInTheDocument();
    }
  });

  it('O Card de receita deve conter sua foto strDrinkThumb e seu nome strDrink', () => {
    const { getByTestId } = renderWithRouter2(
      <RevenueContext.Provider value={ mockValueDrink }>
        <MainPage title="Bebidas" />
      </RevenueContext.Provider>,
    );

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
      expect(getByTestId(`${index}-card-img`)).toBeInTheDocument();
    }
  });
});

describe('27 - Implemente os botões de categoria'
+ 'para serem utilizados como filtro', () => {
  it('Caso as receitas sejam de comida, deve-se exibir as 5 primeiras'
  + 'categorias de comida obtidas através do endpoint', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const beefCategoryFilter = await findByTestId('Beef-category-filter');
    const breakfastCategoryFilter = await findByTestId('Breakfast-category-filter');
    const chickenCategoryFilter = await findByTestId('Chicken-category-filter');
    const dessertCategoryFilter = await findByTestId('Dessert-category-filter');
    const goatCategoryFilter = await findByTestId('Goat-category-filter');

    expect(beefCategoryFilter).toBeInTheDocument();
    expect(breakfastCategoryFilter).toBeInTheDocument();
    expect(chickenCategoryFilter).toBeInTheDocument();
    expect(dessertCategoryFilter).toBeInTheDocument();
    expect(goatCategoryFilter).toBeInTheDocument();
  });

  it('Caso as receitas sejam de bebida, deve-se carregar as 12 primeiras'
  + 'receitas obtidas através do endpoint', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');
    const ordinaryCategoryFilter = await findByTestId('Ordinary Drink-category-filter');
    const cocktailCategoryFilter = await findByTestId('Cocktail-category-filter');
    const milkCategoryFilter = await findByTestId('Milk / Float / Shake-category-filter');
    const otherCategoryFilter = await findByTestId('Other/Unknown-category-filter');
    const cocoaCategoryFilter = await findByTestId('Cocoa-category-filter');

    expect(ordinaryCategoryFilter).toBeInTheDocument();
    expect(cocktailCategoryFilter).toBeInTheDocument();
    expect(milkCategoryFilter).toBeInTheDocument();
    expect(otherCategoryFilter).toBeInTheDocument();
    expect(cocoaCategoryFilter).toBeInTheDocument();
  });
});

describe('28 - Implemente o filtro das receitas através da API'
+ 'ao clicar no filtro de categoria', () => {
  it('Caso as receitas sejam de comida e a categoria seja "Beef",'
  + 'deve-se carregar as 12 primeiras receitas de "Beef"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');

    const beefButton = await findByTestId('Beef-category-filter');
    fireEvent.click(beefButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });

  it('Caso as receitas sejam de comida e a categoria seja "Breakfast",'
  + 'deve-se carregar as 12 primeiras receitas de "Breakfast"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');

    const breakfastButton = await findByTestId('Breakfast-category-filter');
    fireEvent.click(breakfastButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
  it('Caso as receitas sejam de comida e a categoria seja "Chicken",'
  + 'deve-se carregar as 12 primeiras receitas de "Chicken', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');

    const chickenfastButton = await findByTestId('Chicken-category-filter');
    fireEvent.click(chickenfastButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
  it('Caso as receitas sejam de comida e a categoria seja "Dessert",'
  + 'deve-se carregar as 12 primeiras receitas de "Dessert"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');

    const dessertfastButton = await findByTestId('Dessert-category-filter');
    fireEvent.click(dessertfastButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
  it('Caso as receitas sejam de comida e a categoria seja "Goat",'
  + 'deve-se carregar as 12 primeiras receitas de "Goat"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');

    const goatfastButton = await findByTestId('Goat-category-filter');
    fireEvent.click(goatfastButton);

    expect(getByTestId('0-recipe-card')).toBeInTheDocument();
  });

  it('Caso as receitas sejam de bebida e a categoria seja "Ordinary Drink",'
  + 'deve-se carregar as 12 primeiras receitas de "Ordinary Drink"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/bebidas');

    const ordinaryButton = await findByTestId('Ordinary Drink-category-filter');
    fireEvent.click(ordinaryButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });

  it('Caso as receitas sejam de bebida e a categoria seja "Cocktail",'
  + 'deve-se carregar as 12 primeiras receitas de "Cocktail"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/bebidas');

    const cocktailButton = await findByTestId('Cocktail-category-filter');
    fireEvent.click(cocktailButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
  it('Caso as receitas sejam de comida e a categoria seja "Milk / Float / Shake",'
  + 'deve-se carregar as 12 primeiras receitas de "Milk / Float / Shake"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/bebidas');

    const milkFloatShakeButton = await findByTestId(
      'Milk / Float / Shake-category-filter',
    );
    fireEvent.click(milkFloatShakeButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
  it('Caso as receitas sejam de comida e a categoria seja "Other/Unknown",'
  + 'deve-se carregar as 12 primeiras receitas de "Other/Unknown"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/bebidas');

    const otherUnknownButton = await findByTestId('Other/Unknown-category-filter');
    fireEvent.click(otherUnknownButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
  it('Caso as receitas sejam de comida e a categoria seja "Cocoa",'
  + 'deve-se carregar as 12 primeiras receitas de "Cocoa"', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/bebidas');

    const cocoaButton = await findByTestId('Cocoa-category-filter');
    fireEvent.click(cocoaButton);

    for (let index = ZERO; index < EIGHT; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
});

describe('31 - Desenvolva o filtro de categorias com a opção de filtrar'
+ 'por todas as categorias', () => {
  it('retornando novamente todas as receitas.'
  + 'O nome do filtro deve ser "All', async () => {
    const { history, findByTestId, getByTestId } = renderWithRouter(<App />);
    history.push('/comidas');

    const allButton = await findByTestId('All-category-filter');
    fireEvent.click(allButton);

    for (let index = ZERO; index < TWELVE; index += 1) {
      expect(getByTestId(`${index}-card-name`)).toBeInTheDocument();
    }
  });
});
