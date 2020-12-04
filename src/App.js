import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Explore from './pages/Explore';
import ExploreByArea from './pages/ExploreByArea';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreDrinkIngredients from './pages/ExploreDrinkIngredients';
import ExploreFoodIngredients from './pages/ExploreFoodIngredients';
import FavoritesRecipes from './pages/FavoritesRecipes';
import FinishedRecipes from './pages/FinishedRecipes';
import Profile from './pages/Profile';
import Food from './pages/Food';
import Drink from './pages/Drink';
import DrinkDetails from './pages/DrinkDetails';
import FoodDetails from './pages/FoodDetails';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
      <Route
        exact
        path="/bebidas/:id"
        render={ (props) => <DrinkDetails { ...props } /> }
      />
      <Route
        exact
        path="/comidas/:id"
        render={ (props) => <FoodDetails { ...props } /> }
      />
      <Route exact path="/bebidas" component={ Drink } />
      <Route exact path="/comidas" component={ Food } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExploreFoodIngredients }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExploreDrinkIngredients }
      />
      <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
      <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
      <Route exact path="/explorar/comidas" component={ ExploreFoods } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
      <Route exact path="/receitas-feitas" component={ FinishedRecipes } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/explorar" component={ Explore } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
