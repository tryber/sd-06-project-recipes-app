import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Bebidas from './pages/Bebidas';
import BebidasInProgress from './pages/BebidasInProgress';
import Comidas from './pages/Comidas';
import DetalhesBebida from './pages/DetalhesBebida';
import DetalhesComida from './pages/DetalhesComida';
import Explorar from './pages/Explorar';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ExplorarBebidasIng from './pages/ExplorarBebidasIng';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarComidasIng from './pages/ExplorarComidasIng';
import Login from './pages/Login';
import ExplorarComidasArea from './pages/ExplorarComidasArea';
import NotFound from './pages/NotFound';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ComidasInProgress from './pages/ComidasInProgress';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ ComidasInProgress } />
        <Route path="/comidas/:id" component={ DetalhesComida } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas/:id/in-progress" component={ BebidasInProgress } />
        <Route path="/bebidas/:id" component={ DetalhesBebida } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route exact path="/explorar/comidas/area" component={ ExplorarComidasArea } />
        <Route exact path="/explorar/bebidas/area" component={ NotFound } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIng }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIng }
        />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/perfil" component={ Perfil } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
