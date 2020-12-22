import React from 'react';
import { Route, Switch } from 'react-router-dom';
import {
  Login, Foods, Drink, Explore, Profile, DoneRecipes,
  FavoriteRecipes, FoodsDetails, DrinksDetails,
  FoodsRecipesInProgress, DrinksRecipesInProgress,
  ExploreDrinks, ExploreFoods, ExploreFoodsByIngredient, ExploreDrinksByIngredient,
  ExploreFoodsByArea, NotFound,
} from './pages';
import './App.css';
import './Slider.scss';

function App() {
  return (
    <div className="master-container">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route
          exact
          path="/comidas/:id/in-progress"
          component={ FoodsRecipesInProgress }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          component={ DrinksRecipesInProgress }
        />
        <Route
          exact
          path="/explorar/comidas/ingredientes"
          component={ ExploreFoodsByIngredient }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreDrinksByIngredient }
        />
        <Route exact path="/explorar/comidas/area" component={ ExploreFoodsByArea } />
        <Route exact path="/explorar/comidas" component={ ExploreFoods } />
        <Route exact path="/explorar/bebidas" component={ ExploreDrinks } />
        <Route exact path="/comidas/:id" component={ FoodsDetails } />
        <Route exact path="/bebidas/:id" component={ DrinksDetails } />
        <Route exact path="/bebidas" component={ Drink } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/explorar" component={ Explore } />
        <Route exact path="/perfil" component={ Profile } />
        <Route exact path="/receitas-feitas" component={ DoneRecipes } />
        <Route exact path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route path="/*" component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
