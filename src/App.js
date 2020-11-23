/* eslint-disable react/jsx-curly-spacing */
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import {
  Login, Bebidas, Comidas, Explorar, Perfil, ReceitasFavoritas,
  ReceitasFeitas, BebidasDetalhes, BebidasIngredientes, BebidasProgresso,
  ComidasArea, ComidasDetalhes, ComidasIngredientes, ComidasProgresso,
  ExplorarBebidas, ExplorarComidas,
} from './pages';
import store from './redux/store';
import './visual_identity/styles/main.scss';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/bebidas" component={ Bebidas } />
          <Route exact path="/bebidas/:id" component={ BebidasDetalhes } />
          <Route exact path="/bebidas/:id/in-progress" component={ BebidasProgresso } />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ BebidasIngredientes }
          />
          <Route exact path="/comidas" component={ Comidas } />
          <Route exact path="/comidas/:id" component={ ComidasDetalhes } />
          <Route exact path="/comidas/:id/in-progress" component={ ComidasProgresso } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ComidasIngredientes }
          />
          <Route exact path="/explorar/comidas/area" component={ ComidasArea } />
          <Route exact path="/explorar" component={ Explorar } />
          <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
          <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
          <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
          <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
          <Route exact path="/perfil" component={ Perfil } />

        </Switch>

      </BrowserRouter>
    </Provider>
  );
}

export default App;
