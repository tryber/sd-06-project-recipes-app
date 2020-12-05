/* eslint-disable react/jsx-curly-spacing */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import {
  Login, MainPage, Explorar, Perfil, ReceitasFavoritas,
  ComidasIngredientes, Explorer, RecipeDetails, ExplorarOrigem,
  ReceitaProgresso, DoneRecipes,
} from './pages';
import store from './redux/store';
import './visual_identity/styles/main.scss';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/bebidas" component={ MainPage } />
          <Route exact path="/bebidas/:id" component={ RecipeDetails } />
          <Route exact path="/bebidas/:id/in-progress" component={ ReceitaProgresso } />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ComidasIngredientes }
          />
          <Route exact path="/comidas" component={ MainPage } />
          <Route exact path="/comidas/:id" component={ RecipeDetails } />
          <Route exact path="/comidas/:id/in-progress" component={ ReceitaProgresso } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ComidasIngredientes }
          />
          <Route exact path="/explorar/comidas/area" component={ ExplorarOrigem } />
          <Route exact path="/explorar/bebidas/area" component={ ExplorarOrigem } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ Explorer } />
          <Route exact path="/explorar/bebidas" component={ Explorer } />
          <Route exact path="/receitas-feitas" component={ DoneRecipes } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/perfil" component={ Perfil } />

        </Switch>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
