import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login, Perfil, Explorar, Receitas, ReceitasB, ReceitasFeitas,
  ReceitasFavoritas, ExplorarReceitas, ReceitaEmProgresso,
  ExplorarReceitasPorIngredientes, ExplorarComidasPorLocalOrigem,
  ReceitaDetalhada, NotFound } from './pages';

import ReceitasProvider from './context/ReceitasProvider';
import './App.css';
import './stylesCSS/Card.css';
import './stylesCSS/Login.css';
import './stylesCSS/Profile.css';
import './stylesCSS/Recomended.css';
import './stylesCSS/InitialPages.css';
import './stylesCSS/PageDetalhada.css';
import './stylesCSS/ExplorarPages.css';
import './stylesCSS/ResponsiveApp.css';
import './stylesCSS/ReceitasDoneFav.css';
import './stylesCSS/DetalhesResponsive.css';
import './stylesCSS/RecomendedResponsive.css';

function App() {
  return (
    <ReceitasProvider>
      <Switch>
        <Route
          path="/bebidas/:id/in-progress"
          component={ ReceitaEmProgresso }
        />
        <Route
          path="/comidas/:id/in-progress"
          component={ ReceitaEmProgresso }
        />
        <Route path="/comidas/:id" component={ ReceitaDetalhada } />
        <Route path="/bebidas/:id" component={ ReceitaDetalhada } />
        <Route path="/comidas" component={ Receitas } />
        <Route path="/bebidas" component={ ReceitasB } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExplorarReceitasPorIngredientes }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExplorarReceitasPorIngredientes }
        />
        <Route
          path="/explorar/comidas/area"
          component={ ExplorarComidasPorLocalOrigem }
        />
        <Route
          path="/explorar/bebidas/area"
          component={ NotFound }
        />
        <Route path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route path="/perfil" component={ Perfil } />
        <Route path="/explorar/comidas" component={ ExplorarReceitas } />
        <Route path="/explorar/bebidas" component={ ExplorarReceitas } />
        <Route path="/explorar" component={ Explorar } />
        <Route exact path="/" component={ Login } />
        <Route component={ NotFound } />
      </Switch>
    </ReceitasProvider>
  );
}

export default App;
