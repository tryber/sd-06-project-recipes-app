import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './pages/Login';
import Foods from './pages/Foods';
import Perfil from './pages/Perfil';
import FavoriteRecipes from './pages/FavoriteRecipes';
import RecipesMade from './pages/RecipesMade';
import Drinks from './pages/Drinks';
import RecipeDetails from './pages/RecipeDetails';
import Explore from './pages/Explore';
import ExploreRecipes from './pages/ExploreRecipes';
import ExploreByIngredients from './pages/ExploreByIngredients';
import ExploreByOrigin from './pages/ExploreByOrigin';
import RecipesInProgress from './pages/RecipesInProgress';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route exact path="/receitas-feitas" component={ RecipesMade } />
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:idRecipe" component={ RecipeDetails } />
        <Route exact path="/bebidas/:idRecipe" component={ RecipeDetails } />
        <Route exact path="/perfil" component={ Perfil } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/explorar/:id" component={ ExploreRecipes } />
        <Route path="/explorar/:id/ingredientes" component={ ExploreByIngredients } />
        <Route path="/explorar/:id/area" component={ ExploreByOrigin } />
        <Route path="/:id/:idRecipe/in-progress" component={ RecipesInProgress } />
      </Switch>
    </Provider>
  );
}

export default App;
