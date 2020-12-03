import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  Login, Comidas, Perfil, Explorar, Bebidas, ReceitasFeitas,
  ReceitasFavoritas, ExplorarComidas, ExplorarBebidas,
  ExplorarBebidasIngredientes, ExplorarComidasIngredientes,
  ExplorarComidasPorLocalOrigem, ReceitaDetalhada } from './pages';
import NotFound from './pages/NotFound';

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
import './stylesCSS/DetalhesResponsive.css';
import './stylesCSS/RecomendedResponsive.css';
import './stylesCSS/ReceitasDoneFav.css';
import ReceitaEmProgresso from './pages/ReceitaEmProgresso';

function App() {
  return (
    <ReceitasProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/comidas/:id" component={ ReceitaDetalhada } />
        <Route exact path="/bebidas/:id" component={ ReceitaDetalhada } />
        <Route exact path="/bebidas/:id/in-progress" component={ ReceitaEmProgresso } />
        <Route exact path="/comidas/:id/in-progress" component={ ReceitaEmProgresso } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
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
        <Route
          exact
          path="/explorar/comidas/area"
          component={ ExplorarComidasPorLocalOrigem }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          component={ NotFound }
        />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explorar } />
      </Switch>
    </ReceitasProvider>
  );
}

export default App;
