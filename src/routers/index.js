import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login, NotFound, Comidas, Bebidas, Explorar,
  ExplorarComidas, ExplorarBebidas, ComidasPorIngrediente,
  ComidasPorLocalOrigem, BebidasPorIngrediente, DetalhesBebida,
  DetalhesComida, ProcessoBebida, ProcessoComida,
  ReceitasFavoritas, ReceitasFeitas, Profile,
} from '../pages';

export default function Routers() {
  return (
    <Switch>
      <Route path="/comidas/:id/in-progress" component={ ProcessoComida } />
      <Route path="/bebidas/:id/in-progress" component={ ProcessoBebida } />
      <Route path="/explorar/comidas/ingredientes" component={ ComidasPorIngrediente } />
      <Route path="/explorar/comidas/area" component={ ComidasPorLocalOrigem } />
      <Route path="/explorar/bebidas/ingredientes" component={ BebidasPorIngrediente } />
      <Route path="/comidas/:id" component={ DetalhesComida } />
      <Route path="/bebidas/:id" component={ DetalhesBebida } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ Explorar } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  );
}
