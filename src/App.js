import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Comidas from './pages/Comidas';
import Bebidas from './pages/Bebidas';
import Explorar from './pages/Explorar';
import ExplorarComidas from './pages/ExplorarComidas';
import ExplorarBebidas from './pages/ExplorarBebidas';
import ComidasIngredientes from './pages/ComidasIngredientes';
import BebidasIngredientes from './pages/BebidasIngredientes';
import ComidasArea from './pages/ComidasArea';
import Perfil from './pages/Perfil';
import ReceitasFeitas from './pages/ReceitasFeitas';
import ReceitasFavoritas from './pages/ReceitasFavoritas';
import DetalhesComidas from './pages/DetalhesComida';
import DetalhesBebida from './pages/DetalhesBebida';
import ProgressoComida from './pages/ProgressoComida';
import ProgressoBebida from './pages/ProgressoBebida';
import NovaReceita from './pages/NovaReceita';
import NovasReceitasSalvas from './pages/NovasReceitasSalvas';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Comidas } />
        <Route exact path="/bebidas" component={ Bebidas } />
        <Route exact path="/explorar" component={ Explorar } />
        <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
        <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ComidasIngredientes }
        />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ BebidasIngredientes }
        />
        <Route exact path="/explorar/comidas/area" component={ ComidasArea } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/receitas-feitas" component={ ReceitasFeitas } />
        <Route exact path="/receitas-favoritas" component={ ReceitasFavoritas } />
        <Route exact path="/comidas/:idDaReceita" component={ DetalhesComidas } />
        <Route exact path="/bebidas/:idDaReceita" component={ DetalhesBebida } />
        <Route
          exact
          path="/comidas/:idDaReceita/in-progress"
          component={ ProgressoComida }
        />
        <Route
          exact
          path="/bebidas/:idDaReceita/in-progress"
          component={ ProgressoBebida }
        />
        <Route exact path="/nova-receita" component={ NovaReceita } />
        <Route exact path="/novas-receitas-salvas" component={ NovasReceitasSalvas } />
      </Switch>
    </div>
  );
}

export default App;
