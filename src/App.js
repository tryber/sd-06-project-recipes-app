import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Provider from './hooks/Provider';
import {
  Login,
  Comidas,
  Bebidas,
  ComidasDetails,
  BebidasDetails,
  ComidasInProgress,
  BebidasInProgress,
  Explorar,
  ExplorarComidas,
  ExplorarBebidas,
  ExplorarComidasIngredientes,
  ExplorarBebidasIngredientes,
  ExplorarComidasArea,
  Perfil,
  ReceitasFeitas,
  ReceitasFavoritas,
} from './Pages';
import './App.css';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas" component={ Comidas } />

        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <ComidasDetails { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <BebidasDetails { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <ComidasInProgress { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <BebidasInProgress { ...props } /> }
        />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
