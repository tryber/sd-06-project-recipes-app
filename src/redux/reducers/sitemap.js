const initialState = {

  comidas: {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Comidas',
      className: 'food__header-container',
    },
    recipe: {
      type: 'meals',
      className: 'foodRecipesList__container',
      recipeCardClassName: 'foodRecipeCard__container',
    },
    category: {
      type: 'meals',
    },
    ingredients: {
      name: 'strIngredient',
    },

  },
  bebidas: {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Bebidas',
      className: 'food__header-container',
    },
    recipe: {
      type: 'drinks',
      className: 'foodRecipesList__container',
      recipeCardClassName: 'foodRecipeCard__container',
    },
    category: {
      type: 'drinks',
    },
    ingredients: {
      name: 'strIngredient1',
    },

  },
  explorar: {

    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar',
      className: 'explorar__header-container',
    },
  },
  explorarBebidas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Bebidas',
      className: 'food__header-container',
    },
    className: 'drink',
    recipeType: 'drinks',

  },
  explorarComidas: {
    header: {

      profileButton: true,
      searchButton: false,
      title: 'Explorar Comidas',
      className: 'food__header-container',
    },
    recipeType: 'meals',
    className: 'food',
  },
  explorarComidasIngredientes: {
    header: {

      profileButton: true,
      searchButton: false,
      title: 'Explorar Ingredientes',
      className: 'food__header-container',
    },
  },
  explorarBebidasIngredientes: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Ingredientes',
      className: 'food__header-container',
    },
  },
  explorarComidasLocalOrigem: {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Explorar Origem',
      className: 'food__header-container',
    },
    recipe: {
      type: 'meals',
      className: 'foodRecipesList__container',
      recipeCardClassName: 'foodRecipeCard__container',
    },
  },
  perfil: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Perfil',
      className: 'perfil__header-container',
    },
  },
  receitasFavoritas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Receitas Favoritas',
      className: 'receitasFavoritas__header-container',
    },
  },
  receitasFeitas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Receitas Feitas',
      className: 'receitasFeitas__header-container',
    },
    doneRecipesCard: {
      meals: {
        image: true,
        name: true,
        category: true,
        area: true,
        doneDate: true,
        tags: true,
        share: true,
        alcoholicOrNot: false,
      },
      drinks: {
        image: true,
        name: true,
        category: false,
        area: false,
        doneDate: true,
        tags: false,
        share: true,
        alcoholicOrNot: true,

      },
    },
  },

};

export default function siteMapReducer(state = initialState, action) {
  switch (action.type) {
  case 'CHANGE_SITEMAP':
    return {
      ...state, [action.key]: action.value,
    };
  default:
    return state;
  }
}

/*
  * Não tem header na tela de login;
  * O header tem os ícones corretos na tela de principal de receitas de comidas;
  * O header tem os ícones corretos na tela de principal de receitas de bebidas;
  * Não tem header na tela de detalhes de uma receita de comida;
  * Não tem header na tela de detalhes de uma receita de bebida;
  * Não tem header na tela de receita em processo de comida;
  * Não tem header na tela de receita em processo de bebida;
  * O header tem os ícones corretos na tela de explorar;
  * O header tem os ícones corretos na tela de explorar comidas;
  * O header tem os ícones corretos na tela de explorar bebidas;
  * O header tem os ícones corretos na tela de explorar comidas por ingrediente;
  * O header tem os ícones corretos na tela de explorar bebidas por ingrediente;
  * O header tem os ícones corretos na tela de explorar comidas por local de origem;
  * O header tem os ícones corretos na tela de perfil;
  * O header tem os ícones corretos na tela de receitas feitas;
  * O header tem os ícones corretos na tela de receitas favoritas. */
