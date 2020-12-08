import React from 'react';
import { fireEvent, screen, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

describe('13 - Implemente os elementos da barra de busca respeitando'
  + ' os atributos descritos no protótipo', () => {
  it('O input de busca deve possuir o atributo data-testid="search-input"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginSubmitButton);

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const searchInput = getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('O radio button de busca de ingrediente deve possuir o'
    + '  atributo data-testid="ingredient-search-radio"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginSubmitButton);

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const ingredientRadioButton = getByTestId('ingredient-search-radio');
    expect(ingredientRadioButton).toBeInTheDocument();
  });

  it('O radio button de busca por nome deve possuir o atributo'
    + '  data-testid="name-search-radio";', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginSubmitButton);

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const nameRadioButton = getByTestId('name-search-radio');
    expect(nameRadioButton).toBeInTheDocument();
  });

  it('O radio button de busca da primeira letra deve possuir o'
    + '  atributo data-testid="first-letter-search-radio"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginSubmitButton);

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const firstRadioButton = getByTestId('first-letter-search-radio');
    expect(firstRadioButton).toBeInTheDocument();
  });

  it('', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const loginSubmitButton = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'teste@teste.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    fireEvent.click(loginSubmitButton);

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);

    const executeSearchButton = getByTestId('exec-search-btn');
    expect(executeSearchButton).toBeInTheDocument();
  });
});

describe('14 - Posicione a barra logo abaixo do header e implemente'
  + '  3 radio buttons: Ingrediente, Nome e Primeira letra', () => {
  it('Se o radio selecionado for Ingrediente, a busca na API é feita corretamente'
    + '  pelo ingrediente. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}', async () => {
    const { getByTestId, findByText, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const ingredientRadioButton = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredientRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'rice' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);

    // await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));
    const firstRecipeWithRiceIngredient = await findByText(/Beef Banh Mi Bowls/i);
    expect(firstRecipeWithRiceIngredient).toBeInTheDocument();
  });

  it('Se o radio selecionado for Nome, a busca na API é feita corretamente pelo '
    + ' nome. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/search.php?s={nome}', async () => {
    const { getByTestId, findByText, history } = renderWithRouter(<App />);
    history.push('/comidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const nameRadioButton = getByTestId('name-search-radio');
    fireEvent.click(nameRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'rice' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);

    // await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));
    const firstRecipeWithRiceName = await findByText(/Japanese gohan rice/i);
    expect(firstRecipeWithRiceName).toBeInTheDocument();
  });

  it('Se o radio selecionado for Primeira letra, a busca na API é feita corretamente '
    + ' pelo primeira letra. O endpoint utilizado deve ser https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}', async () => {
    const { getByTestId, findByText, history } = renderWithRouter(<App />);
    history.push('/comidas');
    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const firstLetterRadioButton = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetterRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'r' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);

    // await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));
    const firstRecipeWithRFirstLetter = await findByText(
      /Rigatoni with fennel sausage sauce/i,
    );
    expect(firstRecipeWithRFirstLetter).toBeInTheDocument();
  });

  it('Se o radio selecionado for Primeira letra e a busca na API for feita com mais de '
    + ' uma letra, deve-se exibir um alert com a mensgem'
      + '  "Sua busca deve conter somente 1 (um) caracter".', () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');

    global.alert = jest.fn();
    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const firstLetterRadioButton = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetterRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'rice' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);

    expect(global.alert).toBeCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });
});

describe('15 - Busque na API de comidas caso a pessoa esteja na página '
  + ' de comidas e na de bebidas caso esteja na de bebidas', () => {
  it('Na tela de bebidas, se o radio selecionado for Ingrediente, a busca na'
    + '  API é feita corretamente pelo ingrediente. O endpoint utilizado deve ser '
      + ' https://www.thecocktaildb.com/api/json/v1/1/filter.php?i={ingrediente}', async () => {
    const { getByTestId, findByText, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const ingredientRadioButton = getByTestId('ingredient-search-radio');
    fireEvent.click(ingredientRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'rum' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);
    // await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const firstRecipeWithRumIngredient = await findByText(/Adam Bomb/i);
    expect(firstRecipeWithRumIngredient).toBeInTheDocument();
  });

  it('Na tela de bebidas, se o radio selecionado for Nome, a busca na API é feita'
    + '  corretamente pelo nome. O endpoint utilizado deve ser '
      + ' https://www.thecocktaildb.com/api/json/v1/1/search.php?s={nome}', async () => {
    const { getByTestId, findByText, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const nameRadioButton = getByTestId('name-search-radio');
    fireEvent.click(nameRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'rum' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);
    // await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const firstRecipeWithRumName = await findByText(/Rum Sour/i);
    expect(firstRecipeWithRumName).toBeInTheDocument();
  });

  it('Na tela de bebidas, se o radio selecionado for Primeira letra, a busca na API '
    + ' é feita corretamente pelo primeira letra. O endpoint utilizado deve ser '
      + ' https://www.thecocktaildb.com/api/json/v1/1/search.php?f={primeira-letra}', async () => {
    const { getByTestId, findByText, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const firstLetterRadioButton = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetterRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'r' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);
    // await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const firstRecipeWithRFirstLetter = await findByText(/Rose/i);
    expect(firstRecipeWithRFirstLetter).toBeInTheDocument();
  });

  it('Na tela de bebidas, se o radio selecionado for Primeira letra e a busca na API '
    + ' for feita com mais de uma letra, deve-se exibir um alert com a mensgem '
      + ' "Sua busca deve conter somente 1 (um) caracter', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    global.alert = jest.fn();
    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const firstLetterRadioButton = getByTestId('first-letter-search-radio');
    fireEvent.click(firstLetterRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'rum' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);

    expect(global.alert).toBeCalledWith('Sua busca deve conter somente 1 (um) caracter');
  });
});

describe('16 - Redirecione para a tela de detalhes da receita caso apenas'
  + ' uma receita seja encontrada, com o ID da mesma na URL', () => {
  it('Caso apenas uma comida seja encontrada, deve-se ir para'
    + ' sua rota de detalhes (/comidas/{id-da-receita})', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const nameRadioButton = getByTestId('name-search-radio');
    fireEvent.click(nameRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'goat' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);
    await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const oneRecipeFoundRoute = history.location.pathname;
    expect(oneRecipeFoundRoute).toBe('/comidas/52968');
  });

  it('Caso apenas uma bebida seja encontrada, deve-se ir '
    + ' para sua rota de detalhes (/bebidas/{id-da-receita})', async () => {
    const { getByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');

    const searchButton = getByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const nameRadioButton = getByTestId('name-search-radio');
    fireEvent.click(nameRadioButton);
    const searchInput = getByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'A1' } });
    const executeSearchButton = getByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);
    await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    const oneRecipeFoundRoute = history.location.pathname;
    expect(oneRecipeFoundRoute).toBe('/bebidas/17222');
  });
});

describe('17 - Mostre as receitas em cards caso mais'
  + '  de uma receita seja encontrada', () => {
  it('Caso mais de uma comida seja encontrada, mostrar as '
    + ' 12 primeiras (ou menos, se não hoverem 12);', async () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));
    const minCards = 0;
    const maxCards = 12;

    const firstCard = queryByTestId(`${minCards}-recipe-card`);
    expect(firstCard).toBeInTheDocument();

    const lastCard = queryByTestId(`${maxCards}-recipe-card`);
    expect(lastCard).not.toBeInTheDocument();
  });

  it('Caso mais de uma bebida seja encontrada, mostrar '
    + ' as 12 primeiras (ou menos, se não hoverem 12)', async () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');
    await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));
    const minCards = 0;
    const maxCards = 12;

    const firstCard = queryByTestId(`${minCards}-recipe-card`);
    expect(firstCard).toBeInTheDocument();

    const lastCard = queryByTestId(`${maxCards}-recipe-card`);
    expect(lastCard).not.toBeInTheDocument();
  });
});

describe('18 - Exiba um alert caso nenhuma receita seja encontrada', () => {
  it('Caso nenhuma comida seja encontrada o alert deve ser exibido;', async () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/comidas');
    await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    global.alert = jest.fn();
    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const ingredientRadioButton = queryByTestId('ingredient-search-radio');
    fireEvent.click(ingredientRadioButton);
    const searchInput = queryByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'willnotfound' } });
    const executeSearchButton = queryByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);

    await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    expect(global.alert)
      .toBeCalledWith('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  });

  it('Caso nenhuma bebida seja encontrada o alert deve ser exibido.', async () => {
    const { queryByTestId, history } = renderWithRouter(<App />);
    history.push('/bebidas');
    global.alert = jest.fn();
    const drinksBottomButton = queryByTestId('drinks-bottom-btn');
    fireEvent.click(drinksBottomButton);
    const searchButton = queryByTestId('search-top-btn');
    fireEvent.click(searchButton);
    const nameRadioButton = queryByTestId('name-search-radio');
    fireEvent.click(nameRadioButton);
    const searchInput = queryByTestId('search-input');
    fireEvent.change(searchInput, { target: { value: 'willnotfound' } });
    const executeSearchButton = queryByTestId('exec-search-btn');
    fireEvent.click(executeSearchButton);

    await waitForElementToBeRemoved(() => screen.queryAllByText(/Loading.../i));

    expect(global.alert)
      .toBeCalledWith('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  });
});
