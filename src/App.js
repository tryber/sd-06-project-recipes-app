import React from 'react';
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import FoodExp from './pages/FoodExp';
import DrinkExp from './pages/DrinkExp';
import IngredientsMeal from './pages/IngredientsMeal';
import IngredientsDrink from './pages/IngredientsDrink';
import IngredientsArea from './pages/IngredientsArea';
import Profile from './pages/Profile';
import DoneRecipe from './pages/DoneRecipe';
import FavRecipe from './pages/FavRecipe';
import RecipeDetails from './pages/RecipeDetails';
import Page404 from './pages/PageNotFound';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/bebidas/:id/in-progress" component={ RecipeDetails } />
        <Route exact path="/comidas/:id/in-progress" component={ RecipeDetails } />
        <Route exact path="/comidas/:id" component={ RecipeDetails } />
        <Route exact path="/bebidas/:id" component={ RecipeDetails } />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ IngredientsMeal }
        />
        <Route exact path="/explorar/comidas/area" component={ IngredientsArea } />
        <Route
          exact
          path="/explorar/bebidas/ingredientes"
          component={ IngredientsDrink }
        />
        <Route exact path="/explorar/comidas" component={ FoodExp } />
        <Route exact path="/explorar/bebidas" component={ DrinkExp } />
        <Route exact path="/comidas" component={ Meals } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipe } />
        <Route exact path="/receitas-favoritas" component={ FavRecipe } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ Page404 } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
