import React from 'react';
import { Switch, Route } from 'react-router-dom';

import {
  Login,
  Perfil,
  Explorar,
  ExplorerIngredientsMeals,
  ExplorerIngredientsDrinks,
  ReceitasComidas,
  ReceitasBebidas,
  Details,
  InProgress,
  RecipesDone,
  FavoriteRecipes,
  ExploreByArea,
  NotFound,
} from './pages';
import './App.css';
import GlobalStyle from './styles/global';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ InProgress } />
        <Route path="/comidas/:id" component={ Details } />
        <Route path="/comidas" component={ ReceitasComidas } />
        <Route path="/bebidas/:id/in-progress" component={ InProgress } />
        <Route path="/bebidas/:id" component={ Details } />
        <Route path="/bebidas" component={ ReceitasBebidas } />
        <Route path="/explorar/comidas/area" component={ ExploreByArea } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorerIngredientsMeals }
        />
        <Route
          path="/explorar/comidas"
          render={ (props) => <Explorar { ...props } title="Explorar Comidas" /> }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorerIngredientsDrinks }
        />
        <Route
          path="/explorar/bebidas"
          render={ (props) => <Explorar { ...props } title="Explorar Bebidas" /> }
        />
        <Route path="/explorar" component={ Explorar } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/receitas-feitas" component={ RecipesDone } />
      </Switch>
    </div>
  );
}

export default App;
