import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import MealDetail from './pages/Detail/MealDetail';
import MealsPage from './pages/RecipesPage/MealsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ExplorePage from './pages/ExplorePage/ExplorePage';
import MealInProgress from './pages/InProgress/MealInProgres';
import DrinkInProgress from './pages/InProgress/DrinkInProgres';
import MainExploreFood from './pages/MainExplore/MainExploreFood';
import MainExploreDrink from './pages/MainExplore/MainExploreDrink';
import MealsIngredients from './pages/ExploreIngredients/MealsIngredients';
import DrinksIngredients from './pages/ExploreIngredients/DrinksIngredients';
import ExploreByArea from './pages/ExploreByArea/ExploreByArea';
import CompletedRecipes from './pages/CompletedRecipes/CompletedRecipes';
import FavoritesRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import DrinksPage from './pages/DrinksPage/DrinksPage';
import DrinkDetail from './pages/Detail/DrinkDetail';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/bebidas" component={ DrinksPage } />
      <Route exact path="/comidas" component={ MealsPage } />
      <Route exact path="/perfil" component={ ProfilePage } />
      <Route exact path="/comidas/:id" component={ MealDetail } />
      <Route exact path="/bebidas/:id" component={ DrinkDetail } />
      <Route exact path="/comidas/:id/in-progress" component={ MealInProgress } />
      <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
      <Route exact path="/explorar" component={ ExplorePage } />
      <Route exact path="/explorar/comidas" component={ MainExploreFood } />
      <Route exact path="/explorar/bebidas" component={ MainExploreDrink } />
      <Route path="/explorar/comidas/ingredientes" component={ MealsIngredients } />
      <Route path="/explorar/bebidas/ingredientes" component={ DrinksIngredients } />
      <Route exact path="/explorar/comidas/area" component={ ExploreByArea } />
      <Route exact path="/receitas-feitas" component={ CompletedRecipes } />
      <Route exact path="/receitas-favoritas" component={ FavoritesRecipes } />
    </Switch>
  );
}

export default Routes;
