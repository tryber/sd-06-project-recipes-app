import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Explore from './pages/Explore';
import ExploreMealsDrinks from './pages/ExploreMealsDrinks';
import ExploreByIngredient from './pages/ExploreByIngredient';
import Details from './pages/Details';
import InProgress from './pages/InProgress';
import FavDoneRecipes from './pages/FavDoneRecipes/FavDoneRecipes';
import ExploreByArea from './pages/ExploreByArea';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/comidas" component={ Home } />
      <Route exact path="/bebidas" component={ Home } />
      <Route exact path="/comidas/:id/in-progress" component={ InProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ InProgress } />
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
      <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
      <Route exact path="/explorar/bebidas/area" component={ NotFound } />
      <Route path="/receitas-feitas" component={ FavDoneRecipes } />
      <Route path="/receitas-favoritas" component={ FavDoneRecipes } />
      <Route path="/explorar" component={ Explore } />
      <Route path="/perfil" component={ Profile } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
