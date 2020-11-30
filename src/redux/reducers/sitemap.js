const initialState = {

  comidas: {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Comidas',
    },
    recipe: {
      type: 'meals',
    },
    category: {
      type: 'meals',
    },

  },
  bebidas: {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Bebidas',
    },
    recipe: {
      type: 'drinks',
    },
    category: {
      type: 'drinks',
    },

  },
  explorar: {

    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar',
    },
  },
  explorarBebidas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Bebidas',
    },
    recipeType: 'drinks',

  },
  explorarComidas: {
    header: {

      profileButton: true,
      searchButton: false,
      title: 'Explorar Comidas',
    },
    recipeType: 'meals',
  },
  explorarComidasIngredientes: {
    header: {

      profileButton: true,
      searchButton: false,
      title: 'Explorar Ingredientes',
    },
  },
  explorarBebidasIngredientes: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Explorar Ingredientes',
    },
  },
  explorarComidasLocalOrigem: {
    header: {
      profileButton: true,
      searchButton: true,
      title: 'Explorar Origem',
    },
  },
  perfil: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Perfil',
    },
  },
  receitasFavoritas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Receitas Favoritas',
    },
  },
  receitasFeitas: {
    header: {
      profileButton: true,
      searchButton: false,
      title: 'Receitas Feitas',
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
