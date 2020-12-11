import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import FoodExp from './pages/FoodExp';
import DrinkExp from './pages/DrinkExp';
import IngredientsMeal from './pages/IngredientsMeal';
import IngredientsDrink from './pages/IngredientsDrink';
import IngredientsOrigin from './pages/IngredientsOrigin';
import Profile from './pages/Profile';
import DoneRecipe from './pages/DoneRecipe';
import FavRecipe from './pages/FavRecipe';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientsMeal }
        />
        <Route exact path="/explorar/comidas/area" component={ IngredientsOrigin } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsDrink }
        />
        <Route exact path="/explorar/comidas" component={ FoodExp } />
        <Route exact path="/explorar/bebidas" component={ DrinkExp } />
        <Route exact path="/comidas" component={ Recipes } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipe } />
        <Route exact path="/receitas-favoritas" component={ FavRecipe } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
