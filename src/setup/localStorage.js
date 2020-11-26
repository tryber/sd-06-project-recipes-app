// const localStorageTemplate = {
//   mealTokens: 'number',
//   cocktailsToken: 'number',
//   user: {
//     email: 'string',
//   },
//   doneRecipes: [{
//     id: 'id-da-receita',
//     type: 'comida-ou-bebida',
//     area: 'area-da-receita-ou-texto-vazio',
//     category: 'categoria-da-receita-ou-texto-vazio',
//     alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
//     name: 'nome-da-receita',
//     image: 'imagem-da-receita',
//     doneDate: 'quando-a-receita-foi-concluida',
//     tags: 'array-de-tags-da-receita-ou-array-vazio',
//   }],
//   favoriteRecipes: [{
//     id: 'id-da-receita',
//     type: 'comida-ou-bebida',
//     area: 'area-da-receita-ou-texto-vazio',
//     category: 'categoria-da-receita-ou-texto-vazio',
//     alcoholicOrNot: 'alcoholic-ou-non-alcoholic-ou-texto-vazio',
//     name: 'nome-da-receita',
//     image: 'imagem-da-receita',
//   }],
//   inProgressRecipes: {
//     cocktails: {
//       'id-da-bebida': ['lista-de-ingredientes-utilizados'],
//       'id-da-bebida 2': ['lista-de-ingredientes-utilizados'],
//     },
//     meals: {
//       'id-da-comida': ['lista-de-ingredientes-utilizados'],
//       'id-da-comida 2': ['lista-de-ingredientes-utilizados'],
//     },
//   },
// };
function setMockedLocalStorage() {
  const mockedDoneRecipes = [
    {
      id: '52771',
    },
  ];

  const favoriteRecipes = [
    {
      id: '15997',
    },
    {
      id: '17203',
    },
  ];
  const mockedRecipesInprogress = {
    cocktails: {
      17222: [],
    },
    meals: {
      52771: [],
    },
  };
  localStorage.setItem('doneRecipes', JSON.stringify(mockedDoneRecipes));
  localStorage.setItem('inProgressRecipes', JSON.stringify(mockedRecipesInprogress));
  localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
}

export default setMockedLocalStorage;

// OBS: id-da-bebida e id-da-comida representam o ID de uma bebida e comida
// respectivamente, e cada item da lista de ingredientes da respectiva
// receita deve ser representado apenas pelo número do ingrediente no formato numérico.
