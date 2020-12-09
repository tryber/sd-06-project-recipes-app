import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Login,
  Foods, Drinks, Profile,
  FoodsDetails, DrinkDetails,
  FoodInProgress, DrinkInProgress,
  DoneRecipes, FavRecipes,
  ExploreRecipes, ExplorerFoods, ExplorerDrinks,
  IngredientsExplorer, RegionFoods } from '../pages';

export default class AppRouter extends React.Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          component={ Login }
        />
        <Route
          exact
          path="/comidas"
          component={ Foods }
        />
        <Route
          exact
          path="/bebidas"
          component={ Drinks }
        />
        <Route
          exact
          path="/comidas/:id"
          render={ (props) => <FoodsDetails { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id"
          render={ (props) => <DrinkDetails { ...props } /> }
        />
        <Route
          exact
          path="/comidas/:id/in-progress"
          render={ (props) => <FoodInProgress { ...props } /> }
        />
        <Route
          exact
          path="/bebidas/:id/in-progress"
          render={ (props) => <DrinkInProgress { ...props } /> }
        />
        <Route
          exact
          path="/explorar"
          component={ ExploreRecipes }
        />
        <Route
          exact
          path="/explorar/comidas"
          component={ ExplorerFoods }
        />
        <Route
          exact
          path="/explorar/bebidas"
          component={ ExplorerDrinks }
        />
        <Route
          exact
          path="/explorar/:id/ingredientes"
          render={ (props) => <IngredientsExplorer { ...props } /> }
        />
        <Route
          exact
          path="/explorar/comidas/area"
          component={ RegionFoods }
        />
        <Route
          exact
          path="/explorar/bebidas/area"
          render={ () => <p>Not Found</p> }
        />
        <Route
          exact
          path="/perfil"
          component={ Profile }
        />
        <Route
          exact
          path="/receitas-feitas"
          component={ DoneRecipes }
        />
        <Route
          exact
          path="/receitas-favoritas"
          component={ FavRecipes }
        />
      </Switch>
    );
  }
}
