import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Food from './pages/Food';
import Cocktail from './pages/CockTail';
import Recipe from './pages/Recipe';
import RecipeInProgress from './pages/RecipeInProgress';
import Explore from './pages/Explore';
import ExploreFood from './pages/ExploreFood';
import ExploreDrink from './pages/ExploreDrink';
import ExploreFoodByIngredients from './pages/ExploreFoodByIngredients';
import ExploreDrinkByIngredients from './pages/ExploreDrinkByIngredients';
import ExploreFoodByArea from './pages/ExploreFoodByArea';
import Perfil from './pages/Perfil';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/receitas-feitas"
          component={ DoneRecipes }
        />
        <Route
          component={ FavoriteRecipes }
          path="/receitas-favoritas"
        />

        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodByIngredients }
        />

        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinkByIngredients }
        />

        <Route
          path="/explorar/comidas/area"
          component={ ExploreFoodByArea }
        />

        <Route exact path="/comidas/:id" component={ Recipe } />
        <Route exact path="/bebidas/:id" component={ Recipe } />
        <Route exact path="/comidas/:id/in-progress" component={ RecipeInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ RecipeInProgress } />
        <Route path="/explorar/comidas" component={ ExploreFood } />
        <Route path="/explorar/bebidas" component={ ExploreDrink } />
        <Route exact path="/comidas" component={ Food } />
        <Route exact path="/bebidas" component={ Cocktail } />
        <Route exact path="/explorar" component={ Explore } />
        <Route path="/perfil" component={ Perfil } />
        <Route exact path="/" component={ Login } />

      </Switch>
    </div>
  );
}

export default App;
