import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreMealsDrinks from './pages/ExploreMealsDrinks';
import ExploreByIngredient from './pages/ExploreByIngredient';
import Provider from './context/Provider';
import Details from './pages/Details';
import DoneRecipes from './pages/DoneRecipes/DoneRecipes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/comidas" component={ Home } />
          <Route exact path="/bebidas" component={ Home } />
          <Route exact path="/comidas/:id" component={ Details } />
          <Route exact path="/bebidas/:id" component={ Details } />
          <Route exact path="/explorar/comidas" component={ ExploreMealsDrinks } />
          <Route
            exact
            path="/explorar/comidas/ingredientes"
            component={ ExploreByIngredient }
          />
          <Route exact path="/explorar/bebidas" component={ ExploreMealsDrinks } />
          <Route
            exact
            path="/explorar/bebidas/ingredientes"
            component={ ExploreByIngredient }
          />
          <Route exact path="/explorar/comidas/area" component={ Explore } />
          <Route path="/receitas-feitas" component={ DoneRecipes } />
          <Route path="/receitas-favoritas" component={ Explore } />
          <Route path="/explorar" component={ Explore } />
          <Route path="/perfil" component={ Profile } />
          <Route exact path="/" component={ Login } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
