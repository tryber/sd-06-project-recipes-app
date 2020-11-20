import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
import Bebidas from './Pages/Bebidas';
import ComidasDetails from './Pages/ComidasDetails';
import BebidasDetails from './Pages/BebidasDetails';
import Explorar from './Pages/Explorar';
import ExplorarComidas from './Pages/ExplorarComidas';
import ExplorarBebidas from './Pages/ExplorarBebidas';
import ExplorarComidasIngredientes from './Pages/ExplorarComidasIngredientes';
import ExplorarBebidasIngredientes from './Pages/ExplorarBebidasIngredientes';
import ExplorarComidasArea from './Pages/ExplorarComidasArea';
import Perfil from './Pages/Perfil';
import ComidasInProgress from './Pages/ComidasInProgress';
import BebidasInProgress from './Pages/BebidasInProgress';
import ReceitasFeitas from './Pages/ReceitasFeitas';
import ReceitasFavoritas from './Pages/ReceitasFavoritas';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route path="/comidas/:id" render={ (props) => <ComidasDetails { ...props } /> } />
      <Route path="/bebidas/:id" render={ (props) => <BebidasDetails { ...props } /> } />
      <Route
        path="/comidas/:id/in-progress"
        render={ (props) => <ComidasInProgress { ...props } /> }
      />
      <Route
        path="/bebidas/:id/in-progress"
        render={ (props) => <BebidasInProgress { ...props } /> }
      />
      <Route path="/explorar" component={ Explorar } />
      <Route path="/explorar/comidas" component={ ExplorarComidas } />
      <Route path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route
        path="/explorar/comidas/ingredientes"
        component={ ExplorarComidasIngredientes }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarBebidasIngredientes }
      />
      <Route path="/explorar/comidas/area" component={ ExplorarComidasArea } />
      <Route path="/perfil" component={ Perfil } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
    </Switch>
  );
}

export default App;
