import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Comidas,
  Bebidas,
  DetalhesComidas,
  DetalhesBebidas,
  Explorar,
  ExplorarBebidas,
  ExplorarComidas,
  ExplorarOrigem,
  ExplorarIngredientes,
  ReceitasFeitas,
  ReceitasFavoritas,
  Perfil,
  EmProgresso,
  NotFound,

} from './pages';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/comidas/:id/in-progress" component={ EmProgresso } />
        <Route path="/bebidas/:id/in-progress" component={ EmProgresso } />
        <Route path="/explorar/comidas/ingredientes" component={ ExplorarIngredientes } />
        <Route path="/explorar/bebidas/ingredientes" component={ ExplorarIngredientes } />
        <Route path="/explorar/comidas/area" component={ ExplorarOrigem } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route path="/comidas/:id/" component={ DetalhesComidas } />
        <Route path="/bebidas/:id/" component={ DetalhesBebidas } />
        <Route path="/explorar/comidas/" component={ ExplorarComidas } />
        <Route path="/explorar/bebidas/" component={ ExplorarBebidas } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route path="/explorar" component={ Explorar } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
