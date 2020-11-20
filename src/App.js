import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Comidas from './Pages/Comidas';
import Bebidas from './Pages/Bebidas';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/comidas" component={Comidas} />
      <Route exact path="/bebidas" component={Bebidas} />
      {/*
      <Route path="/comidas/{id-da-receita}" component={} />
      <Route path="/bebidas/{id-da-receita}" component={} />
      <Route path="/comidas/{id-da-receita}/in-progress" component={} />
      <Route path="/bebidas/{id-da-receita}/in-progress" component={} />
      <Route path="/explorar" component={} />
      <Route path="/explorar/comidas" component={} />
      <Route path="/explorar/bebidas" component={} />
      <Route path="/explorar/comidas/ingredientes" component={} />
      <Route path="/explorar/bebidas/ingredientes" component={} />
      <Route path="/explorar/comidas/area" component={} />
      <Route path="/perfil" component={} />
      <Route path="/receitas-feitas" component={} />
      <Route path="/receitas-favoritas" component={} /> */}
    </Switch>
  );
}

export default App;
