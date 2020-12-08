import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter/renderWithRouter';
import App from '../../App';

beforeEach(() => {
  // According to the documentation: "values stored in tests will also be available in other tests unless you run"
  localStorage.clear();
});

describe('33 - Implemente os elementos da tela de detalhes '
  + 'de uma receita de COMIDAS respeitando os atributos descritos no protótipo', () => {
  it('A tela de comida possui todos os atributos data-testid', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const recipePhoto = await findByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
  });

  it('O título deve possuir o atributo data-testid="recipe-title"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const recipeTitle = await findByTestId('recipe-title');

    expect(recipeTitle).toBeInTheDocument();
    // console.log(recipeTitle.outerHTML);
  });

  it('O botão de compartilhar deve possuir '
    + 'o atributo data-testid="share-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const shareButton = await findByTestId('share-btn');

    expect(shareButton).toBeInTheDocument();
  });

  it('O botão de favoritar deve possuir o '
    + 'atributo data-testid="favorite-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const favoriteButton = await findByTestId('favorite-btn');

    expect(favoriteButton).toBeInTheDocument();
  });

  it('O texto da categoria deve possuir '
    + 'o atributo data-testid="recipe-category"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const recipeCategory = await findByTestId('recipe-category');

    expect(recipeCategory).toBeInTheDocument();
  });

  it('Os ingredientes devem possuir o atributo '
    + 'data-testid="index-ingredient-name-and-measure"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const ingredientNameAndMeasure1 = await findByTestId('1-ingredient-name-and-measure');
    const ingredientNameAndMeasure2 = await findByTestId('2-ingredient-name-and-measure');
    const ingredientNameAndMeasure3 = await findByTestId('3-ingredient-name-and-measure');
    const ingredientNameAndMeasure4 = await findByTestId('4-ingredient-name-and-measure');
    const ingredientNameAndMeasure5 = await findByTestId('5-ingredient-name-and-measure');
    const ingredientNameAndMeasure6 = await findByTestId('6-ingredient-name-and-measure');

    expect(ingredientNameAndMeasure1).toBeInTheDocument();
    expect(ingredientNameAndMeasure2).toBeInTheDocument();
    expect(ingredientNameAndMeasure3).toBeInTheDocument();
    expect(ingredientNameAndMeasure4).toBeInTheDocument();
    expect(ingredientNameAndMeasure5).toBeInTheDocument();
    expect(ingredientNameAndMeasure6).toBeInTheDocument();
  });

  it('O texto de instruções deve possuir o '
    + 'atributo data-testid="instructions"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52968');

    expect(history.location.pathname).toBe('/comidas/52968');
    const instructions = await findByTestId('instructions');

    expect(instructions).toBeInTheDocument();
  });

  it('O vídeo, presente somente na tela de comidas, '
    + 'deve possuir o atributo data-testid="video"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    expect(history.location.pathname).toBe('/comidas/53026');
    const video = await findByTestId('video');

    expect(video).toBeInTheDocument();
  });

  it('O card de receitas recomendadas deve possuir o '
    + 'atributo data-testid="index-recomendation-card"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    expect(history.location.pathname).toBe('/comidas/53026');
    const recomendationCard0 = await findByTestId('0-recomendation-card');
    const recomendationCard1 = await findByTestId('1-recomendation-card');

    expect(recomendationCard0).toBeInTheDocument();
    expect(recomendationCard1).toBeInTheDocument();
  });

  it('O botão de iniciar receita deve possuir o '
    + 'atributo data-testid="start-recipe-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    expect(history.location.pathname).toBe('/comidas/53026');
    const startRecipeButton = await findByTestId('start-recipe-btn');

    expect(startRecipeButton).toBeInTheDocument();
  });
});

describe('33.1 - Implemente os elementos da tela de detalhes '
  + 'de uma receita de BEBIDAS respeitando os atributos descritos no protótipo', () => {
  it('A tela de comida possui todos os atributos data-testid', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const recipePhoto = await findByTestId('recipe-photo');

    expect(recipePhoto).toBeInTheDocument();
  });

  it('O título deve possuir o atributo data-testid="recipe-title"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const recipeTitle = await findByTestId('recipe-title');

    expect(recipeTitle).toBeInTheDocument();
    // console.log(recipeTitle.outerHTML);
  });

  it('O botão de compartilhar deve possuir '
    + 'o atributo data-testid="share-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const shareButton = await findByTestId('share-btn');

    expect(shareButton).toBeInTheDocument();
  });

  it('O botão de favoritar deve possuir o '
    + 'atributo data-testid="favorite-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const favoriteButton = await findByTestId('favorite-btn');

    expect(favoriteButton).toBeInTheDocument();
  });

  it('O texto da categoria deve possuir '
    + 'o atributo data-testid="recipe-category"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const recipeCategory = await findByTestId('recipe-category');

    expect(recipeCategory).toBeInTheDocument();
  });

  it('Os ingredientes devem possuir o atributo '
    + 'data-testid="index-ingredient-name-and-measure"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const ingredientNameAndMeasure1 = await findByTestId('1-ingredient-name-and-measure');
    const ingredientNameAndMeasure2 = await findByTestId('2-ingredient-name-and-measure');

    expect(ingredientNameAndMeasure1).toBeInTheDocument();
    expect(ingredientNameAndMeasure2).toBeInTheDocument();
  });

  it('O texto de instruções deve possuir o '
    + 'atributo data-testid="instructions"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const instructions = await findByTestId('instructions');

    expect(instructions).toBeInTheDocument();
  });

  it('O card de receitas recomendadas deve possuir o '
    + 'atributo data-testid="index-recomendation-card"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const recomendationCard0 = await findByTestId('0-recomendation-card');
    const recomendationCard1 = await findByTestId('1-recomendation-card');

    expect(recomendationCard0).toBeInTheDocument();
    expect(recomendationCard1).toBeInTheDocument();
  });

  it('O botão de iniciar receita deve possuir o '
    + 'atributo data-testid="start-recipe-btn"', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    expect(history.location.pathname).toBe('/bebidas/13501');
    const startRecipeButton = await findByTestId('start-recipe-btn');

    expect(startRecipeButton).toBeInTheDocument();
  });
});

describe('41 - Redirecione a pessoa usuário caso o botão '
  + '"Iniciar Receita" seja clicado, a rota '
  + 'deve mudar para a tela de receita em processo', () => {
  it('Redireciona para tela de receita da comida em processo', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    await expect(history.location.pathname).toBe('/comidas/53026');
    const startRecipeButton = await findByTestId('start-recipe-btn');
    fireEvent.click(startRecipeButton);

    await expect(history.location.pathname).toBe('/comidas/53026/in-progress');
  });
  it('Redireciona para tela de receita da bebida em processo', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    await expect(history.location.pathname).toBe('/bebidas/13501');
    const startRecipeButton = await findByTestId('start-recipe-btn');
    fireEvent.click(startRecipeButton);

    await expect(history.location.pathname).toBe('/bebidas/13501/in-progress');
  });
});

describe('42 - Implemente um botão de compartilhar '
  + 'e um de favoritar a receita', () => {
  it('Verifica se os botões estão disponíveis '
  + 'na tela de detalhes de uma comida', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    await expect(history.location.pathname).toBe('/comidas/53026');
    const shareButton = await findByTestId('share-btn');
    const favoriteButton = await findByTestId('favorite-btn');
    // console.log(shareButton);
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });

  it('Verifica se os botões estão disponíveis na '
  + 'tela de detalhes de uma bebida.', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    await expect(history.location.pathname).toBe('/bebidas/13501');
    const shareButton = await findByTestId('share-btn');
    const favoriteButton = await findByTestId('favorite-btn');
    // console.log(shareButton);
    expect(shareButton).toBeInTheDocument();
    expect(favoriteButton).toBeInTheDocument();
  });
});

// describe.only('43 - Implemente a solução de forma que, ao clicar '
// + 'no botão de compartilhar, o link da receita '
// + 'dentro do app deve ser copiado para o clipboard '
// + 'e uma mensagem avisando que o link foi copiado deve aparecer', () => {
//   it('Verifica a mensagem "Link copiado!" e se o '
//   + 'link da receita da comida foi copiado para o clipboard', async () => {
//     const { findByTestId, history, findByText } = renderWithRouter(<App />);
//     history.push('comidas/53026');

//     await expect(history.location.pathname).toBe('/comidas/53026');
//     const shareButton = await findByTestId('share-btn');
//     fireEvent.click(shareButton);

//     console.log(shareButton);
//     const copiedMessage = await findByText('Link copiado!');
//     console.log(copiedMessage);
//     expect(copiedMessage).toBeInTheDocument();
//   });

// it('Verifica a mensagem "Link copiado!" e se o '
// + 'link da receita da bebida foi copiado para o clipboard.', async () => {
//   const { findByTestId, history, findByText } = renderWithRouter(<App />);
//   history.push('bebidas/13501');

//   await expect(history.location.pathname).toBe('/bebidas/13501');
//   const shareButton = await findByTestId('share-btn');
//   fireEvent.click(shareButton);

//   const copiedMessage = await findByText('Link copiado!');
//   expect(copiedMessage).toBeInTheDocument();
// });
// });

describe('44 - Implemente o ícone do coração (favorito) de maneira '
  + 'que, deve vir preenchido caso a receita esteja favoritada '
  + 'e "despreenchido" caso contrário', () => {
  it('Verifica se a comida não favoritada vem com o coração "despreenchido"'
    + 'e depois Verifica se a comida favoritada vem '
    + 'com o coração preenchido', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/53026');

    const favoriteWhiteHeart = await findByTestId('favorite-btn');
    // console.log(favoriteWhiteHeart.src);
    expect(favoriteWhiteHeart.src).toBe('http://localhost/whiteHeartIcon.svg');

    fireEvent.click(favoriteWhiteHeart);

    const favoriteBlackHeart = await findByTestId('favorite-btn');
    // console.log(favoriteBlackHeart.src);

    expect(favoriteBlackHeart.src).toBe('http://localhost/blackHeartIcon.svg');
  });

  it('Verifica se a bebida não favoritada vem com '
    + 'o coração "despreenchido" e depois Verifica '
    + 'se a bebida favoritada vem com o coração '
    + 'preenchido', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/13501');

    const favoriteWhiteHeart = await findByTestId('favorite-btn');
    // console.log(favoriteWhiteHeart.src);
    expect(favoriteWhiteHeart.src).toBe('http://localhost/whiteHeartIcon.svg');

    fireEvent.click(favoriteWhiteHeart);

    const favoriteBlackHeart = await findByTestId('favorite-btn');
    // console.log(favoriteBlackHeart.src);

    expect(favoriteBlackHeart.src).toBe('http://localhost/blackHeartIcon.svg');
  });
});

describe('46 - Salve as receitas favoritas no localStorage '
  + 'na chave favoriteRecipes', () => {
  it('Verifica se após favoritar receita de uma comida, '
    + 'ela é salva corretamente no localStorage', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('comidas/52844');

    const favoriteWhiteHeart = await findByTestId('favorite-btn');
    // console.log(favoriteWhiteHeart.src);
    expect(favoriteWhiteHeart.src).toBe('http://localhost/whiteHeartIcon.svg');

    fireEvent.click(favoriteWhiteHeart);

    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    // console.log(favoriteRecipes);
    // console.log(favoriteRecipes.findByText('id: "52844"'));
    expect(favoriteRecipes).toBe(
      '[{"id":"52844","type":"Meal","area":"Italian","category":"Pasta","alcoholicOrNot":"","name":"Lasagne","image":"https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg","doneDate":"fullDatte","tags":""}]',
    );
  });

  it('Verifica se após favoritar receita de uma bebida, '
    + 'ela é salva corretamente no localStorage.', async () => {
    const { findByTestId, history } = renderWithRouter(<App />);
    history.push('bebidas/15288');

    const favoriteWhiteHeart = await findByTestId('favorite-btn');
    // console.log(favoriteWhiteHeart.src);
    expect(favoriteWhiteHeart.src).toBe('http://localhost/whiteHeartIcon.svg');

    fireEvent.click(favoriteWhiteHeart);

    const favoriteRecipes = localStorage.getItem('favoriteRecipes');
    // console.log(favoriteRecipes);
    expect(favoriteRecipes).toBe(
      '[{"id":"15288","type":"Drink","area":"","category":"Shot","alcoholicOrNot":"Alcoholic","name":"252","image":"https://www.thecocktaildb.com/images/media/drink/rtpxqw1468877562.jpg","doneDate":"fullDatte","tags":""}]',
    );
  });
});
