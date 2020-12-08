import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import RecipeFoodDetails from '../pages/RecipeFoodDetails';
import RecipeDrinkDetails from '../pages/RecipeDrinkDetails';
import RecipeFoodProcess from '../pages/RecipeFoodProcess';
import RecipeDrinkProcess from '../pages/RecipeDrinkProcess';
import Explore from '../pages/Explore';
import ExploreMealsOrDrinks from '../pages/ExploreMealsOrDrinks';
import ExploreIngredients from '../pages/ExploreIngredients';
import ExploreFoodSourcePlace from '../pages/ExploreFoodSourcePlace';
import Profile from '../pages/Profile';
import RecipesMade from '../pages/RecipesMade';
import FavoriteRecipes from '../pages/FavoriteRecipes';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />
      <Route path="/comidas" exact render={ () => <Home title="Comidas" /> } />
      <Route path="/bebidas" exact render={ () => <Home title="Bebidas" /> } />
      <Route
        path="/comidas/:id"
        exact
        render={ (props) => <RecipeFoodDetails { ...props } title="comidas" /> }
      />
      <Route
        path="/bebidas/:id"
        exact
        render={ (props) => <RecipeDrinkDetails { ...props } title="bebidas" /> }
      />
      <Route
        path="/comidas/:id/in-progress"
        exact
        render={ (props) => <RecipeFoodProcess { ...props } title="comidas" /> }
      />
      <Route
        path="/bebidas/:id/in-progress"
        exact
        render={ (props) => <RecipeDrinkProcess { ...props } title="bebidas" /> }
      />
      <Route path="/explorar" exact component={ Explore } />
      <Route
        path="/explorar/comidas"
        exact
        render={ () => <ExploreMealsOrDrinks type="comidas" /> }
      />
      <Route
        path="/explorar/bebidas"
        exact
        render={ () => <ExploreMealsOrDrinks type="bebidas" /> }
      />
      <Route
        path="/explorar/comidas/ingredientes"
        exact
        render={ () => <ExploreIngredients type="comidas" /> }
      />
      <Route
        path="/explorar/bebidas/ingredientes"
        exact
        render={ () => <ExploreIngredients type="bebidas" /> }
      />
      <Route path="/explorar/comidas/area" exact component={ ExploreFoodSourcePlace } />
      <Route path="/perfil" exact component={ Profile } />
      <Route path="/receitas-feitas" exact component={ RecipesMade } />
      <Route path="/receitas-favoritas" exact component={ FavoriteRecipes } />
    </Switch>
  );
}

export default Routes;
