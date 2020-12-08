import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Provider from './Context/Provider';

import BebidasLocalOrigem from './Pages/BebidasLocalOrigem';

import {
  Login,
  Perfil,
  Comidas,
  Bebidas,
  DetalhesComidas,
  DetalhesBebidas,
  ProcessoComida,
  ProcessoBebida,
  Explorar,
  ExplorarBebidas,
  ExplorarComidas,
  BebidasPorIngrediente,
  ComidasPorIngrediente,
  ComidasLocalOrigem,
  ReceitasFeitas,
  ReceitasFavoritas,
} from './Pages';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/comidas/:id" component={ DetalhesComidas } />
        <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
        <Route path="/comidas/:id/in-progress" component={ ProcessoComida } />
        <Route path="/bebidas/:id/in-progress" component={ ProcessoBebida } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ComidasPorIngrediente }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ BebidasPorIngrediente }
        />
        <Route exact path="/explorar/comidas/area" component={ ComidasLocalOrigem } />
        <Route exact path="/explorar/bebidas/area" component={ BebidasLocalOrigem } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </Provider>
  );
}

export default App;
