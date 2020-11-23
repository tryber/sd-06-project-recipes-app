import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import Comidas from './pages/Comidas';
import Provider from './hooks/Provider';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route path="/" exact component={ Home } />
          <Route path="/comidas" exact component={ Comidas } />
          <Route path="/bebidas" exact component={ App } />
          <Route path="/comidas/{id-da-receita}" exact component={ App } />
          <Route path="/bebidas/{id-da-receita}" exact component={ App } />
          <Route path="/comidas/{id-da-receita}/in-progress" exact component={ App } />
          <Route path="/bebidas/{id-da-receita}/in-progress" exact component={ App } />
          <Route path="/explorar" exact component={ App } />
          <Route path="/explorar/comidas" exact component={ App } />
          <Route path="/explorar/bebidas" exact component={ App } />
          <Route path="/explorar/comidas/ingredientes" exact component={ App } />
          <Route path="/explorar/bebidas/ingredientes" exact component={ App } />
          <Route path="/explorar/comidas/area" exact component={ App } />
          <Route path="/perfil" exact component={ App } />
          <Route path="/receitas-feitas" exact component={ App } />
          <Route path="/receitas-favoritas" exact component={ App } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
