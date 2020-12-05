import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Login';
import Comidas from './Comidas';
import Bebidas from './Bebidas';
import Perfil from './Perfil';
import Explorar from './Explorar';
import DetalhesComidas from './DetalhesComidas';
import DetalhesBebidas from './DetalhesBebidas';

import ProcessoBebidas from './ProcessoBebidas';
import ProcessoComidas from './ProcessoComidas';

import ExplorarComidas from './ExplorarComidas';
import ExplorarBebidas from './ExplorarBebidas';
import ExplorarComidasIngredientes from './ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './ExplorarBebidasIngredientes';
import ExplorarComidasLocalOrigem from './ExplorarComidasLocalOrigem';

import ReceitasFavoritas from './ReceitasFavoritas';
import ReceitasFeitas from './ReceitasFeitas';

import NotFound from './NotFound';

export default function Rotas() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/comidas/:id/in-progress" component={ ProcessoComidas } />
        <Route path="/bebidas/:id/in-progress" component={ ProcessoBebidas } />
        <Route path="/comidas/:id" component={ DetalhesComidas } />
        <Route path="/bebidas/:id" component={ DetalhesBebidas } />
        <Route path="/comidas" component={ Comidas } />
        <Route path="/bebidas" component={ Bebidas } />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarBebidasIngredientes }
        />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorarComidasIngredientes }
        />
        <Route path="/explorar/comidas/area" component={ ExplorarComidasLocalOrigem } />
        <Route path="/explorar/bebidas/area" component={ NotFound } />
        <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route path="/explorar/comidas" component={ ExplorarComidas } />
        <Route path="/explorar" component={ Explorar } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      </Switch>
    </BrowserRouter>
  );
}
