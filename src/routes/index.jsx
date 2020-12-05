import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Recipes from '../pages/Recipes';
import RecipeDetails from '../pages/RecipeDetails';
import RecipeInProgress from '../pages/RecipeInProgress';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import Explore from '../pages/Explore';
import Favorites from '../pages/Favorites';
import ExploreRecipes from '../pages/ExploreRecipes';
import ExploreIngredients from '../pages/ExploreIngredients';
import ExploreArea from '../pages/ExploreArea';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={ Login } />

      <Route path="/register" exact component={ Register } />

      <Route path="/comidas" exact render={ () => <Recipes pageType="comidas" /> } />

      <Route
        path="/comidas/:id"
        exact
        render={ () => <RecipeDetails pageType="comidas" /> }
      />

      <Route
        path="/comidas/:id/in-progress"
        render={ () => <RecipeInProgress pageType="comidas" /> }
      />

      <Route
        path="/bebidas"
        sensitive
        exact
        render={ () => <Recipes pageType="bebidas" /> }
      />

      <Route
        path="/bebidas/:id"
        exact
        render={ () => <RecipeDetails pageType="bebidas" /> }
      />

      <Route
        path="/bebidas/:id/in-progress"
        exact
        render={ () => <RecipeInProgress pageType="bebidas" /> }
      />

      <Route path="/receitas-feitas" exact component={ DoneRecipes } />

      <Route path="/perfil" exact component={ Profile } />

      <Route path="/receitas-favoritas" exact component={ Favorites } />

      <Route path="/explorar" exact component={ Explore } />

      <Route
        path="/explorar/bebidas"
        exact
        render={ () => <ExploreRecipes pageType="bebidas" /> }
      />

      <Route
        path="/explorar/comidas"
        exact
        render={ () => <ExploreRecipes pageType="comidas" /> }
      />

      <Route
        path="/explorar/comidas/area"
        exact
        render={ () => <ExploreArea pageType="comidas" /> }
      />

      <Route
        path="/explorar/comidas/ingredientes"
        exact
        render={ () => <ExploreIngredients pageType="comidas" /> }
      />

      <Route
        path="/explorar/bebidas/ingredientes"
        exact
        render={ () => <ExploreIngredients pageType="bebidas" /> }
      />

      <Route component={ NotFound } />
    </Switch>
  );
}

export default Routes;
